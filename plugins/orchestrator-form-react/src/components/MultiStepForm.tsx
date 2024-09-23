import React from 'react';

import { useApiHolder } from '@backstage/core-plugin-api';
import { JsonObject } from '@backstage/types';

import { makeStyles } from '@material-ui/core';
import { JSONSchema7 } from 'json-schema';

import { WorkflowInputSchemaStep } from '@janus-idp/backstage-plugin-orchestrator-common';
import { orchestratorFormApiRef } from '@janus-idp/backstage-plugin-orchestrator-form-api';

import { defaultFormExtensionsApi } from '../DefaultFormApi';
import ReviewStep from './ReviewStep';

const useStyles = makeStyles(_theme => ({
  // Hotfix: this should be fixed in the theme
  step: {
    '& form': {
      '& .field-array > div > div': {
        outline: 'inherit !important',
        padding: 'inherit !important',
        backgroundColor: 'inherit !important',

        '& div > div > div > div': {
          // unfortunately there are no better CSS selectors
          backgroundColor: 'inherit !important',
        },
      },
    },
  },
}));

const MultiStepOrchestratorForm = ({
  schema,
  handleExecute,
  isExecuting,
  onReset,
}: {
  schema: JSONSchema7;
  steps: WorkflowInputSchemaStep[];
  handleExecute: (getParameters: () => JsonObject) => Promise<void>;
  isExecuting: boolean;
  onReset: () => void;
}) => {
  const styles = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const formApi =
    useApiHolder().get(orchestratorFormApiRef) || defaultFormExtensionsApi;
  const withFormExtensions = formApi.getFormDecorator();

  return (
    <>
      <ReviewStep
        handleBack={formContext.handleBack}
        handleReset={() => {
          onReset();
          setActiveStep(0);
        }}
        handleExecute={handleExecute}
        busy={isExecuting}
      />
    </>
  );
};
