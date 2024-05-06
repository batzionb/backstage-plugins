import { DiscoveryApi, ConfigApi, IdentityApi} from '@backstage/core-plugin-api';
import { ResponseError } from '@backstage/errors';
import { JsonObject } from '@backstage/types';

import {
  AssessedProcessInstance,
  ProcessInstance,
  QUERY_PARAM_ASSESSMENT_INSTANCE_ID,
  QUERY_PARAM_BUSINESS_KEY,
  QUERY_PARAM_INCLUDE_ASSESSMENT,
  QUERY_PARAM_INSTANCE_ID,
  WorkflowDefinition,
  WorkflowExecutionResponse,
  WorkflowInputSchemaResponse,
  WorkflowOverview,
  WorkflowOverviewListResult,
} from '@janus-idp/backstage-plugin-orchestrator-common';

import { buildUrl } from '../utils/UrlUtils';
import { OrchestratorApi } from './api';

export interface OrchestratorClientOptions {
  discoveryApi: DiscoveryApi;
  configApi: ConfigApi;
  identityApi: IdentityApi;
}
export class OrchestratorClient implements OrchestratorApi {
  private readonly discoveryApi: DiscoveryApi;
  private readonly configApi: ConfigApi;
  private readonly identityApi: IdentityApi;
  private baseUrl: string | null = null;
  constructor(options: OrchestratorClientOptions) {
    this.discoveryApi = options.discoveryApi;
    this.configApi = options.configApi;
    this.identityApi = options.identityApi;
    console.log("initialiing orchestrator client")
  }

  private async getBaseUrl(): Promise<string> {
    if (!this.baseUrl) {
      this.baseUrl = await this.discoveryApi.getBaseUrl('orchestrator');
    }

    return this.baseUrl;
  }

  async executeWorkflow(args: {
    workflowId: string;
    parameters: JsonObject;
    businessKey?: string;
  }): Promise<WorkflowExecutionResponse> {
    const baseUrl = await this.getBaseUrl();
    const endpoint = `${baseUrl}/workflows/${args.workflowId}/execute`;
    const urlToFetch = buildUrl(endpoint, {
      [QUERY_PARAM_BUSINESS_KEY]: args.businessKey,
    });
    const res = await fetch(urlToFetch, {
      method: 'POST',
      body: JSON.stringify(args.parameters),
      headers: { 'content-type': 'application/json' },
    });
    if (!res.ok) {
      throw await ResponseError.fromResponse(res);
    }
    return await res.json();
  }

  async abortWorkflowInstance(instanceId: string): Promise<void> {
    const baseUrl = await this.getBaseUrl();
    const response = await fetch(`${baseUrl}/instances/${instanceId}/abort`, {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
    });

    if (!response.ok) {
      throw await ResponseError.fromResponse(response);
    }
  }

  async getWorkflowDefinition(workflowId: string): Promise<WorkflowDefinition> {
    const baseUrl = await this.getBaseUrl();
    const res = await fetch(`${baseUrl}/workflows/${workflowId}`);
    if (!res.ok) {
      throw await ResponseError.fromResponse(res);
    }
    return await res.json();
  }

  async getWorkflowSource(workflowId: string): Promise<string> {
    const baseUrl = await this.getBaseUrl();
    const res = await fetch(`${baseUrl}/workflows/${workflowId}/source`);
    if (!res.ok) {
      throw await ResponseError.fromResponse(res);
    }
    return await res.text();
  }

  async listWorkflowOverviews(): Promise<WorkflowOverviewListResult> {
    const baseUrl = await this.getBaseUrl();
    const { token: idToken } = await this.identityApi.getCredentials();
    console.log("list workflow overviews");
    console.log("idToken", idToken);
    const res = await fetch(`${baseUrl}/workflows/overview`, {
      headers: {'Content-Type': 'application/json', 
      ...(idToken && { Authorization: `Bearer ${idToken}` })
      }
    });    
    if (!res.ok) {
      throw await ResponseError.fromResponse(res);
    }
    return res.json();
  }

  private async clusterApiFetchCall(params?: string): Promise<any> {
    const { token: idToken } = await this.identityApi.getCredentials();
    const backendUrl = this.configApi.getString('backend.baseUrl');
    const jsonResponse = await fetch(
      `${backendUrl}/api/ocm/status${params || ''}`,
      {
        headers: {
          'Content-Type': 'application/json',
          ...(idToken && { Authorization: `Bearer ${idToken}` }),
        },
      },
    );
    return jsonResponse.json();
  }


  async listInstances(): Promise<ProcessInstance[]> {
    const baseUrl = await this.getBaseUrl();
    const { token: idToken } = await this.identityApi.getCredentials();
    const res = await fetch(`${baseUrl}/instances`, {headers: {...(idToken && { Authorization: `Bearer ${idToken}` })}});
    if (!res.ok) {
      throw await ResponseError.fromResponse(res);
    }
    return await res.json();
  }

  async getInstance(
    instanceId: string,
    includeAssessment = false,
  ): Promise<AssessedProcessInstance> {
    const baseUrl = await this.getBaseUrl();
    const endpoint = `${baseUrl}/instances/${instanceId}`;
    const urlToFetch = buildUrl(endpoint, {
      [QUERY_PARAM_INCLUDE_ASSESSMENT]: includeAssessment,
    });
    const res = await fetch(urlToFetch);
    if (!res.ok) {
      throw await ResponseError.fromResponse(res);
    }
    return await res.json();
  }

  async getWorkflowDataInputSchema(args: {
    workflowId: string;
    instanceId?: string;
    assessmentInstanceId?: string;
  }): Promise<WorkflowInputSchemaResponse> {
    const baseUrl = await this.getBaseUrl();
    const endpoint = `${baseUrl}/workflows/${args.workflowId}/inputSchema`;
    const urlToFetch = buildUrl(endpoint, {
      [QUERY_PARAM_INSTANCE_ID]: args.instanceId,
      [QUERY_PARAM_ASSESSMENT_INSTANCE_ID]: args.assessmentInstanceId,
    });
    const res = await fetch(urlToFetch);
    if (!res.ok) {
      throw await ResponseError.fromResponse(res);
    }
    return await res.json();
  }

  async getWorkflowOverview(workflowId: string): Promise<WorkflowOverview> {
    const baseUrl = await this.getBaseUrl();
    const res = await fetch(`${baseUrl}/workflows/${workflowId}/overview`);
    if (!res.ok) {
      throw await ResponseError.fromResponse(res);
    }
    return res.json();
  }

  async retriggerInstanceInError(args: {
    instanceId: string;
    inputData: JsonObject;
  }): Promise<WorkflowExecutionResponse> {
    const baseUrl = await this.getBaseUrl();
    const urlToFetch = `${baseUrl}/instances/${args.instanceId}/retrigger`;
    const response = await fetch(urlToFetch, {
      method: 'POST',
      body: JSON.stringify(args.inputData),
      headers: { 'content-type': 'application/json' },
    });
    if (!response.ok) {
      throw await ResponseError.fromResponse(response);
    }
    return response.json();
  }
}
