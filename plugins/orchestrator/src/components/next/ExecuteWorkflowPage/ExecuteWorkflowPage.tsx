import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAsync } from 'react-use';

import {
  InfoCard,
  Progress,
  ResponseErrorPanel,
} from '@backstage/core-components';
import {
  useApi,
  useRouteRef,
  useRouteRefParams,
} from '@backstage/core-plugin-api';
import { JsonObject, JsonValue } from '@backstage/types';

import { Grid } from '@material-ui/core';

import { WorkflowDataInputSchemaResponse } from '@janus-idp/backstage-plugin-orchestrator-common';

import { orchestratorApiRef } from '../../../api';
import {
  executeWorkflowRouteRef,
  workflowInstanceRouteRef,
} from '../../../routes';
import { BaseOrchestratorPage } from '../BaseOrchestratorPage';
import StepperForm from './StepperForm';

const isError = (err: unknown): err is Error => {
  return !!err && !!(err as Error).message;
};

const getErrorObject = (err: unknown): Error => {
  if (isError(err)) {
    return err;
  }
  if (typeof err === 'string') {
    return new Error(err);
  }
  return new Error('Unexpected error');
};

export interface ExecuteWorkflowPageProps {
  initialState?: Record<string, JsonValue>;
}

export const ExecuteWorkflowPage = () => {
  const orchestratorApi = useApi(orchestratorApiRef);
  const { workflowId } = useRouteRefParams(executeWorkflowRouteRef);
  const [isExecuting, setIsExecuting] = useState(false);
  const [updateError, setUpdateError] = React.useState<unknown>();
  const navigate = useNavigate();
  const instanceLink = useRouteRef(workflowInstanceRouteRef);

  let {
    value: schemaResponse,
    loading,
    error,
  } = useAsync(async (): Promise<WorkflowDataInputSchemaResponse> => {
    const response =
      await orchestratorApi.getWorkflowDataInputSchema(workflowId);
    return response;
  }, [orchestratorApi, workflowId]);

  const handleExecute = useCallback(
    async (formData: JsonObject) => {
      if (!schemaResponse) {
        return;
      }

      setIsExecuting(true);
      try {
        const response = await orchestratorApi.executeWorkflow({
          workflowId,
          parameters: formData as unknown as Record<string, string>,
        });
        navigate(instanceLink({ instanceId: response.id }));
      } catch (err) {
        setUpdateError(getErrorObject(err));
      } finally {
        setIsExecuting(false);
      }
    },
    [schemaResponse, orchestratorApi, workflowId, navigate, instanceLink],
  );

  if (!error && !loading && !schemaResponse) {
    error = new Error('Request for data input schema returned no response');
  }

  let pageContent = null;
  if (loading) {
    pageContent = <Progress />;
  } else if (error) {
    pageContent = <ResponseErrorPanel error={error} />;
  } else if (!schemaResponse) {
    pageContent = (
      <ResponseErrorPanel
        error={
          new Error('Request for data input schema returned an empty response')
        }
      />
    );
  } else {
    pageContent = (
      <Grid container spacing={2} direction="column" wrap="nowrap">
        {updateError && (
          <Grid item>
            <ResponseErrorPanel error={updateError as Error} />
          </Grid>
        )}
        <Grid item>
          <InfoCard title={schemaResponse.workflowItem.definition.name}>
            <StepperForm
              refSchemas={schemaResponse.schemas}
              handleExecute={handleExecute}
              isExecuting={isExecuting}
            />
          </InfoCard>
        </Grid>
      </Grid>
    );
  }

  return (
    <BaseOrchestratorPage title="Workflow Orchestrator">
      {pageContent}
    </BaseOrchestratorPage>
  );
};
