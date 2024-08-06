import { createApiRef } from '@backstage/core-plugin-api';
import { JsonObject } from '@backstage/types';

import { RegistryWidgetsType } from '@rjsf/utils';

import {
  AssessedProcessInstance,
  ProcessInstance,
  WorkflowDefinition,
  WorkflowExecutionResponse,
  WorkflowInputSchemaResponse,
  WorkflowOverview,
  WorkflowOverviewListResult,
} from '@janus-idp/backstage-plugin-orchestrator-common';

export interface OrchestratorApi {
  abortWorkflowInstance(instanceId: string): Promise<void>;

  executeWorkflow(args: {
    workflowId: string;
    parameters: JsonObject;
    businessKey?: string;
  }): Promise<WorkflowExecutionResponse>;

  retriggerInstanceInError(args: {
    instanceId: string;
    inputData: JsonObject;
  }): Promise<WorkflowExecutionResponse>;

  getWorkflowDefinition(workflowId: string): Promise<WorkflowDefinition>;

  getWorkflowSource(workflowId: string): Promise<string>;

  getInstance(
    instanceId: string,
    includeAssessment: boolean,
  ): Promise<AssessedProcessInstance>;

  getWorkflowDataInputSchema(args: {
    workflowId: string;
    instanceId?: string;
    assessmentInstanceId?: string;
  }): Promise<WorkflowInputSchemaResponse>;

  getWorkflowOverview(workflowId: string): Promise<WorkflowOverview>;

  listWorkflowOverviews(): Promise<WorkflowOverviewListResult>;

  listInstances(): Promise<ProcessInstance[]>;
}

export const orchestratorApiRef = createApiRef<OrchestratorApi>({
  id: 'plugin.orchestrator.api',
});

export interface TestApi {
  test(): void;
  getCustomWidgets(): RegistryWidgetsType<any, any, any>;
}

class DefaultTestAPi implements TestApi {
  test() {
    console.log('no override for plugin');
  }
  getCustomWidgets(): RegistryWidgetsType<any, any, any> {
    return {};
  }
}

export const defaultTestApi = new DefaultTestAPi();

export const testApiRef = createApiRef<TestApi>({
  id: 'plugin.orchestrator.test',
});
