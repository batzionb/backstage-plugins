import { createServiceBuilder, ServerTokenManager, UrlReader } from '@backstage/backend-common';
import { PluginTaskScheduler } from '@backstage/backend-tasks';
import { CatalogApi } from '@backstage/catalog-client';
import { Config } from '@backstage/config';
import { DiscoveryApi } from '@backstage/core-plugin-api';
import { EventBroker } from '@backstage/plugin-events-node';

import { Logger } from 'winston';

import { Server } from 'http';

import { createRouter } from '../src/routerWrapper';
import { coreServices } from '@backstage/backend-plugin-api';
import { ServerPermissionClient } from '@backstage/plugin-permission-node';
export interface ServerOptions {
  port: number;
  enableCors: boolean;
  logger: Logger;
  eventBroker: EventBroker;
  config: Config;
  discovery: DiscoveryApi;
  catalogApi: CatalogApi;
  urlReader: UrlReader;
  scheduler: PluginTaskScheduler;
}

export async function startStandaloneServer(
  options: ServerOptions,
): Promise<Server> {
  const logger = options.logger.child({ service: 'orchestrator-backend' });
  logger.debug('Starting application server...');

  const permissions = ServerPermissionClient.fromConfig(options.config, {discovery: options.discovery, tokenManager: ServerTokenManager.noop() });

  console.log("########## permissions " + permissions);
  console.log("########## httpAuth" + coreServices.httpAuth);
  const router = await createRouter({
    logger: logger,
    config: options.config,
    discovery: options.discovery,
    catalogApi: options.catalogApi,
    urlReader: options.urlReader,
    scheduler: options.scheduler,
    permissions: permissions,
    httpAuth: coreServices.httpAuth,
  });

  let service = createServiceBuilder(module)
    .setPort(options.port)
    .addRouter('/orchestrator', router);
  if (options.enableCors) {
    service = service.enableCors({ origin: 'http://localhost:3000' });
  }

  return await service.start().catch(err => {
    logger.error(err);
    process.exit(1);
  });
}

module.hot?.accept();
