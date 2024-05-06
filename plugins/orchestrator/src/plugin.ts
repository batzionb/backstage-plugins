import {
  createApiFactory,
  createPlugin,
  createRoutableExtension,
  discoveryApiRef,
  configApiRef,
  identityApiRef
} from '@backstage/core-plugin-api';

import { orchestratorApiRef, OrchestratorClient } from './api';
import { orchestratorRootRouteRef } from './routes';

export const orchestratorPlugin = createPlugin({
  id: 'orchestrator',
  apis: [
    createApiFactory({
      api: orchestratorApiRef,
      deps: { discoveryApi: discoveryApiRef, configApi: configApiRef, identityApi: identityApiRef},
      factory({ discoveryApi, configApi, identityApi }) {
        return new OrchestratorClient({ discoveryApi, configApi, identityApi });
      },
    }),
  ],
  routes: {
    root: orchestratorRootRouteRef,
  },
});

export const OrchestratorPage = orchestratorPlugin.provide(
  createRoutableExtension({
    name: 'OrchestratorPage',
    component: () => import('./components/Router').then(m => m.Router),
    mountPoint: orchestratorRootRouteRef,
  }),
);
