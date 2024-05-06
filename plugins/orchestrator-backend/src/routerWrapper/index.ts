import { ServerTokenManager, SingleHostDiscovery, UrlReader } from '@backstage/backend-common';
import { PluginTaskScheduler } from '@backstage/backend-tasks';
import { CatalogApi } from '@backstage/catalog-client';
import { Config } from '@backstage/config';
import { DiscoveryApi } from '@backstage/core-plugin-api';
import {
  coreServices,
  createBackendPlugin,
  HttpAuthService,
  IdentityService,
  PermissionsService,
} from '@backstage/backend-plugin-api';
import { IdentityApi } from '@backstage/plugin-auth-node';

import express from 'express';
import { config, Logger } from 'winston';

import { DevModeService } from '../service/DevModeService';
import { createBackendRouter } from '../service/router';
import {ServerPermissionClient } from '@backstage/plugin-permission-node'
import { HostDiscovery, tokenManagerServiceFactory } from '@backstage/backend-app-api';
import { DiscoveryService } from '@backstage/backend-plugin-api';
import { createLegacyAuthAdapters } from '@backstage/backend-common';
import {DefaultIdentityClient } from '@backstage/plugin-auth-node';
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
  const tokenManager = ServerTokenManager.fromConfig(args.config, {logger: args.logger});
  const permissions = ServerPermissionClient.fromConfig(args.config, {discovery: args.discovery, tokenManager});
  const { httpAuth }  =  createLegacyAuthAdapters({httpAuth: args.httpAuth, discovery: args.discovery, tokenManager: tokenManager, });
  console.log("########## permission            - " + permissions);
  console.log("########## coreServices.httpAuth - " + coreServices.httpAuth);
  console.log("########## httpAuth              - " + httpAuth);
  console.log("########## args.discovery        - " + args.discovery);
  console.log("########## tokenManager          - " + tokenManager);
  const identity1 = DefaultIdentityClient.create({
      discovery: args.discovery,
      issuer: await args.discovery.getExternalBaseUrl('auth'),
    });
  console.log("########## identity1             - " + identity1);

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
