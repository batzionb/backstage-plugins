/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  '/v2/workflows/overview': {
    /** @description Get a list of workflow overviews */
    get: operations['getWorkflowsOverview'];
  };
  '/v2/workflows/{workflowId}/overview': {
    /** @description Get a workflow overview by ID */
    get: operations['getWorkflowOverviewById'];
  };
  '/v2/workflows/{workflowId}': {
    /** @description Get a workflow by ID */
    get: operations['getWorkflowById'];
  };
  '/v2/workflows/{workflowId}/source': {
    /** @description Get a workflow source by ID */
    get: operations['getWorkflowSourceById'];
  };
  '/v2/workflows/instances': {
    /**
     * Get instances
     * @description Retrieve an array of instances
     */
    get: operations['getInstances'];
  };
  '/v2/workflows/instances/{instanceId}': {
    /** Get Workflow Instance by ID */
    get: operations['getInstanceById'];
  };
  '/v2/workflows/instances/{instanceId}/results': {
    /** Get workflow results */
    get: operations['getWorkflowResults'];
  };
  '/v2/workflows/instances/statuses': {
    /**
     * Get workflow status list
     * @description Retrieve an array of workflow statuses
     */
    get: operations['getWorkflowStatuses'];
  };
  '/v2/workflows/{workflowId}/execute': {
    /** Execute a workflow */
    post: operations['executeWorkflow'];
  };
  '/v2/instances/{instanceId}/abort': {
    /**
     * Abort a workflow instance
     * @description Aborts a workflow instance identified by the provided instanceId.
     */
    delete: operations['abortWorkflow'];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    /** @description The ErrorResponse object represents a common structure for handling errors in API responses. It includes essential information about the error, such as the error message and additional optional details. */
    ErrorResponse: {
      /**
       * @description A string providing a concise and human-readable description of the encountered error. This field is required in the ErrorResponse object.
       * @default internal server error
       */
      message: string;
      /** @description An optional field that can contain additional information or context about the error. It provides flexibility for including extra details based on specific error scenarios. */
      additionalInfo?: string;
    };
    WorkflowOverviewListResultDTO: {
      overviews?: components['schemas']['WorkflowOverviewDTO'][];
      paginationInfo?: components['schemas']['PaginationInfoDTO'];
    };
    WorkflowOverviewDTO: {
      /** @description Workflow unique identifier */
      workflowId?: string;
      /** @description Workflow name */
      name?: string;
      format?: components['schemas']['WorkflowFormatDTO'];
      lastRunId?: string;
      lastTriggeredMs?: number;
      lastRunStatus?: string;
      category?: components['schemas']['WorkflowCategoryDTO'];
      avgDurationMs?: number;
      description?: string;
    };
    PaginationInfoDTO: {
      pageSize?: number;
      page?: number;
      totalCount?: number;
    };
    /**
     * @description Format of the workflow definition
     * @enum {string}
     */
    WorkflowFormatDTO: 'yaml' | 'json';
    /**
     * @description Category of the workflow
     * @enum {string}
     */
    WorkflowCategoryDTO: 'assessment' | 'infrastructure';
    WorkflowListResultDTO: {
      items: components['schemas']['WorkflowDTO'][];
      paginationInfo: components['schemas']['PaginationInfoDTO'];
    };
    WorkflowDTO: {
      /** @description Workflow unique identifier */
      id: string;
      /** @description Workflow name */
      name?: string;
      format: components['schemas']['WorkflowFormatDTO'];
      category: components['schemas']['WorkflowCategoryDTO'];
      /** @description Description of the workflow */
      description?: string;
      annotations?: string[];
    };
    ProcessInstanceListResultDTO: {
      items?: components['schemas']['ProcessInstanceDTO'][];
      paginationInfo?: components['schemas']['PaginationInfoDTO'];
    };
    AssessedProcessInstanceDTO: {
      instance: components['schemas']['ProcessInstanceDTO'];
      assessedBy?: components['schemas']['ProcessInstanceDTO'];
    };
    ProcessInstanceDTO: {
      id?: string;
      name?: string;
      workflow?: string;
      status?: components['schemas']['ProcessInstanceStatusDTO'];
      start?: string;
      end?: string;
      duration?: string;
      category?: components['schemas']['WorkflowCategoryDTO'];
      description?: string;
      workflowdata?: components['schemas']['WorkflowDataDTO'];
    };
    WorkflowDataDTO: {
      workflowoptions?: components['schemas']['WorkflowOptionsDTO'][];
      [key: string]: unknown;
    };
    WorkflowOptionsDTO: components['schemas']['WorkflowSuggestionDTO'][];
    WorkflowSuggestionDTO: {
      id?: string;
      name?: string;
    };
    /**
     * @description Status of the workflow run
     * @enum {string}
     */
    ProcessInstanceStatusDTO:
      | 'Running'
      | 'Error'
      | 'Completed'
      | 'Aborted'
      | 'Suspended'
      | 'Pending';
    WorkflowRunStatusDTO: {
      key?: string;
      value?: string;
    };
    ExecuteWorkflowRequestDTO: {
      inputData: {
        [key: string]: string;
      };
    };
    ExecuteWorkflowResponseDTO: {
      id?: string;
    };
    WorkflowProgressDTO: components['schemas']['NodeInstanceDTO'] & {
      status?: components['schemas']['ProcessInstanceStatusDTO'];
      error?: components['schemas']['ProcessInstanceErrorDTO'];
    };
    NodeInstanceDTO: {
      /**
       * @description Type name
       * @default NodeInstance
       */
      __typename?: string;
      /** @description Node instance ID */
      id?: string;
      /** @description Node name */
      name?: string;
      /** @description Node type */
      type?: string;
      /** @description Date when the node was entered */
      enter?: string;
      /** @description Date when the node was exited (optional) */
      exit?: string;
      /** @description Definition ID */
      definitionId?: string;
      /** @description Node ID */
      nodeId?: string;
    };
    ProcessInstanceErrorDTO: {
      /**
       * @description Type name
       * @default ProcessInstanceError
       */
      __typename?: string;
      /** @description Node definition ID */
      nodeDefinitionId?: string;
      /** @description Error message (optional) */
      message?: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {
  /** @description Get a list of workflow overviews */
  getWorkflowsOverview: {
    parameters: {
      query?: {
        /** @description page number */
        page?: number;
        /** @description page size */
        pageSize?: number;
        /** @description field name to order the data */
        orderBy?: string;
        /** @description ascending or descending */
        orderDirection?: string;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          'application/json': components['schemas']['WorkflowOverviewListResultDTO'];
        };
      };
      /** @description Error fetching workflow overviews */
      500: {
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  /** @description Get a workflow overview by ID */
  getWorkflowOverviewById: {
    parameters: {
      path: {
        /** @description Unique identifier of the workflow */
        workflowId: string;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          'application/json': components['schemas']['WorkflowOverviewDTO'];
        };
      };
      /** @description Error fetching workflow overview */
      500: {
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  /** @description Get a workflow by ID */
  getWorkflowById: {
    parameters: {
      path: {
        /** @description ID of the workflow to fetch */
        workflowId: string;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          'application/json': components['schemas']['WorkflowDTO'];
        };
      };
      /** @description Error fetching workflow by id */
      500: {
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  /** @description Get a workflow source by ID */
  getWorkflowSourceById: {
    parameters: {
      path: {
        /** @description ID of the workflow to fetch */
        workflowId: string;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          'text/plain': string;
        };
      };
      /** @description Error fetching workflow source by id */
      500: {
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  /**
   * Get instances
   * @description Retrieve an array of instances
   */
  getInstances: {
    parameters: {
      query?: {
        /** @description page number */
        page?: number;
        /** @description page size */
        pageSize?: number;
        /** @description field name to order the data */
        orderBy?: string;
        /** @description ascending or descending */
        orderDirection?: string;
      };
    };
    responses: {
      /** @description Success */
      200: {
        content: {
          'application/json': components['schemas']['ProcessInstanceListResultDTO'];
        };
      };
      /** @description Error fetching instances */
      500: {
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  /** Get Workflow Instance by ID */
  getInstanceById: {
    parameters: {
      path: {
        /** @description ID of the workflow instance */
        instanceId: string;
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        content: {
          'application/json': components['schemas']['ProcessInstanceDTO'];
        };
      };
      /** @description Error fetching instance */
      500: {
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  /** Get workflow results */
  getWorkflowResults: {
    parameters: {
      path: {
        /** @description ID of the workflow instance */
        instanceId: string;
      };
    };
    responses: {
      /** @description Successful response */
      200: {
        content: {
          'application/json': components['schemas']['WorkflowDataDTO'];
        };
      };
      /** @description Error getting workflow results */
      500: {
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  /**
   * Get workflow status list
   * @description Retrieve an array of workflow statuses
   */
  getWorkflowStatuses: {
    responses: {
      /** @description Success */
      200: {
        content: {
          'application/json': components['schemas']['WorkflowRunStatusDTO'][];
        };
      };
      /** @description Error fetching workflow statuses */
      500: {
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  /** Execute a workflow */
  executeWorkflow: {
    parameters: {
      path: {
        /** @description ID of the workflow to execute */
        workflowId: string;
      };
    };
    requestBody: {
      content: {
        'application/json': components['schemas']['ExecuteWorkflowRequestDTO'];
      };
    };
    responses: {
      /** @description Successful execution */
      200: {
        content: {
          'application/json': components['schemas']['ExecuteWorkflowResponseDTO'];
        };
      };
      /** @description Internal Server Error */
      500: {
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
  /**
   * Abort a workflow instance
   * @description Aborts a workflow instance identified by the provided instanceId.
   */
  abortWorkflow: {
    parameters: {
      path: {
        /** @description The identifier of the workflow instance to abort. */
        instanceId: string;
      };
    };
    responses: {
      /** @description Successful operation */
      200: {
        content: {
          'text/plain': string;
        };
      };
      /** @description Error aborting workflow */
      500: {
        content: {
          'application/json': components['schemas']['ErrorResponse'];
        };
      };
    };
  };
}
