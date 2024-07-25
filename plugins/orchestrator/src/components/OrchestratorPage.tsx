import React from 'react';

import { TabbedLayout } from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';

import { orchestratorApiRef } from '../api';
import { workflowInstancesRouteRef } from '../routes';
import { BaseOrchestratorPage } from './BaseOrchestratorPage';
import { WorkflowRunsTabContent } from './WorkflowRunsTabContent';
import { WorkflowsTabContent } from './WorkflowsTabContent';

export const OrchestratorPage = () => {
  const orchestratorApi = useApi(orchestratorApiRef);
  React.useEffect(() => {
    const res = orchestratorApi.validateDynamic({
      validatePluginId: 'validation',
      inputData: {
        value: 'test',
        key: 'test',
      },
    });
    console.log(res);
  });
  return (
    <BaseOrchestratorPage title="Workflow Orchestrator" noPadding>
      <TabbedLayout>
        <TabbedLayout.Route path="/" title="Workflows">
          <WorkflowsTabContent />
        </TabbedLayout.Route>
        <TabbedLayout.Route
          path={workflowInstancesRouteRef.path}
          title="Workflow runs"
        >
          <WorkflowRunsTabContent />
        </TabbedLayout.Route>
      </TabbedLayout>
    </BaseOrchestratorPage>
  );
};
