import {
  HostDiscovery,
  tokenManagerServiceFactory,
} from '@backstage/backend-app-api';
import {
  createLegacyAuthAdapters,
  ServerTokenManager,
  SingleHostDiscovery,
  UrlReader,
} from '@backstage/backend-common';
import {
  coreServices,
  createBackendPlugin,
  DiscoveryService,
  HttpAuthService,
  IdentityService,
  PermissionsService,
} from '@backstage/backend-plugin-api';
import { PluginTaskScheduler } from '@backstage/backend-tasks';
import { CatalogApi } from '@backstage/catalog-client';
import { Config } from '@backstage/config';
import { DiscoveryApi } from '@backstage/core-plugin-api';
import {
  DefaultIdentityClient,
  IdentityApi,
} from '@backstage/plugin-auth-node';
import { ServerPermissionClient } from '@backstage/plugin-permission-node';

import express from 'express';
import { config, Logger } from 'winston';

import { DevModeService } from '../service/DevModeService';
import { createBackendRouter } from '../service/router';

export interface RouterArgs {
  config: Config;
  logger: Logger;
  discovery: DiscoveryService;
  catalogApi: CatalogApi;
  urlReader: UrlReader;
  scheduler: PluginTaskScheduler;
  permissions: PermissionsService;
  httpAuth?: HttpAuthService;
  identity: IdentityApi;
}

export async function createRouter(args: RouterArgs): Promise<express.Router> {
  const autoStartDevMode =
    args.config.getOptionalBoolean(
      'orchestrator.sonataFlowService.autoStart',
    ) ?? false;

  if (autoStartDevMode) {
    const devModeService = new DevModeService(args.config, args.logger);

    const isSonataFlowUp = await devModeService.launchDevMode();

    if (!isSonataFlowUp) {
      args.logger.error('SonataFlow is not up. Check your configuration.');
    }
  }
  const tokenManager = ServerTokenManager.fromConfig(args.config, {
    logger: args.logger,
  });
  const permissions = ServerPermissionClient.fromConfig(args.config, {
    discovery: args.discovery,
    tokenManager,
  });
  const { httpAuth } = createLegacyAuthAdapters({
    httpAuth: args.httpAuth,
    discovery: args.discovery,
    tokenManager: tokenManager,
  });
  const identity1 = DefaultIdentityClient.create({
    discovery: args.discovery,
    issuer: await args.discovery.getExternalBaseUrl('auth'),
  });

  return await createBackendRouter({
    config: args.config,
    logger: args.logger,
    discovery: args.discovery,
    catalogApi: args.catalogApi,
    urlReader: args.urlReader,
    scheduler: args.scheduler,
    permissions: permissions,
    httpAuth: httpAuth,
    identity: identity1,
  });
}
