import React, { useCallback, useMemo, useState } from 'react';

import { JsonObject, JsonValue } from '@backstage/types';

import { FormProps, withTheme } from '@rjsf/core-v5';
import validator from '@rjsf/validator-ajv8';
import { JSONSchema7 } from 'json-schema';

import ObjectFieldTemplate from './ObjectFieldTemplate';
import { ExecutionFormContext } from './stepperFormTypes';

const WrappedForm = withTheme<JsonObject, JSONSchema7, ExecutionFormContext>(
  require('@rjsf/material-ui-v5').Theme,
);

export const StepperForm = ({
  schema,
  handleExecute,
  busy,
}: {
  schema: JSONSchema7;
  handleExecute: ExecutionFormContext['handleExecute'];
  busy: boolean;
}) => {
  const [formState, setFormState] = useState({});
  const [activeStep, setActiveStep] = useState(0);

  const formContext = React.useMemo<ExecutionFormContext>(
    () => ({
      handleExecute: () => handleExecute,
      handleReset: () => {
        setFormState({});
      },
      handleNext: () => setActiveStep(activeStep_ => activeStep_ + 1),
      handleBack: () => setActiveStep(activeStep_ => activeStep_ - 1),
      activeStep,
      busy,
      rootSchema: schema,
    }),
    [activeStep, busy, schema, handleExecute],
  );

  const onSubmit = () => {};

  const onFormChanged = useCallback(
    e => setFormState(current => ({ ...current, ...e.formData })),
    [setFormState],
  );

  return (
    <WrappedForm
      schema={schema}
      validator={validator}
      showErrorList={false}
      onSubmit={onSubmit}
      onChange={onFormChanged}
      formData={formState}
      formContext={formContext}
      templates={{ ObjectFieldTemplate }}
    />
  );
};
