import { JsonValue } from '@backstage/types';

import {
  Job,
  ProcessInstance,
  ProcessInstanceState,
  WorkflowDataInputSchemaResponse,
  WorkflowExecutionResponse,
  WorkflowItem,
  WorkflowListResult,
  WorkflowOverview,
  WorkflowSpecFile,
} from '@janus-idp/backstage-plugin-orchestrator-common';

import { OrchestratorApi } from '../api/api';

export const mockWorkflowItem: WorkflowItem = {
  definition: {
    id: '1234',
    version: '1.0.0',
    specVersion: '1.0.1',
    name: '2b-or-not-2b-workflow',
    states: [{}],
  },
  uri: 'wf-uri.sw.json',
};

export const mockOrchestratorApi: OrchestratorApi = {
  createWorkflowDefinition(
    _uri: string,
    _content?: string,
  ): Promise<WorkflowItem> {
    return Promise.resolve(mockWorkflowItem);
  },
  deleteWorkflowDefinition(_workflowId: string): Promise<any> {
    return Promise.resolve(undefined);
  },
  executeWorkflow(_args: {
    workflowId: string;
    parameters: Record<string, JsonValue>;
  }): Promise<WorkflowExecutionResponse> {
    return Promise.resolve({ id: '42' });
  },
  getInstance(_instanceId: string): Promise<ProcessInstance> {
    return Promise.resolve({
      id: '43',
      processId: '5',
      nodes: [],
      state: ProcessInstanceState.Active,
      endpoint: 'foo.swf.com',
      start: new Date(Date.now()),
      lastUpdate: new Date(Date.now()),
    });
  },
  getInstanceJobs(_instanceId: string): Promise<Job[]> {
    return Promise.resolve([]);
  },
  getInstances(): Promise<ProcessInstance[]> {
    return Promise.resolve([]);
  },
  getSpecs(): Promise<WorkflowSpecFile[]> {
    return Promise.resolve([]);
  },
  getWorkflow(_workflowId: string): Promise<WorkflowItem> {
    return Promise.resolve(mockWorkflowItem);
  },
  getWorkflowDataInputSchema(
    _workflowId: string,
  ): Promise<WorkflowDataInputSchemaResponse> {
    return Promise.resolve({
      schema: undefined,
      workflowItem: mockWorkflowItem,
    });
  },
  listWorkflows(): Promise<WorkflowListResult> {
    return Promise.resolve({
      items: [mockWorkflowItem],
      totalCount: 1,
      offset: 2,
      limit: 3,
    });
  },
  getWorkflowOverview(_workflowId: string): Promise<WorkflowOverview> {
    return Promise.resolve({
      id: mockWorkflowItem.definition.id,
      name: mockWorkflowItem.definition.name,
      lastTriggered: '2023-11-20T08:23:59.115Z',
      lastRunStatus: 'COMPLETED',
      type: 'Infrastructure',
      avgDurationMs: 300004,
      description: 'JSON based hello world workflow',
    });
  },
};
