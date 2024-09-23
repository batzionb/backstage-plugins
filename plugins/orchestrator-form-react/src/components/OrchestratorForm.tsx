import React from 'react';

import { JsonObject } from '@backstage/types';

import Form from '@rjsf/core';
import { JSONSchema7 } from 'json-schema';

import OrchestratorFormWrapper from './OrchestratorFormWrapper';

const getNumSteps = (schema: JSONSchema7): number | undefined => {
  if (schema.type !== 'object' || !schema.properties) return undefined;
  const isMultiStep = Object.values(schema.properties).every(
    prop => (prop as JSONSchema7).type === 'object',
  );
  return isMultiStep ? Object.keys(schema.properties).length : undefined;
};

type OrchestratorFormProps = {
  schema: JSONSchema7;

  isExecuting: boolean;
  handleExecute: (parameters: JsonObject) => Promise<void>;
  handleReset: () => void;
};

const OrchestratorForm = ({
  schema,
  handleExecute,
  isExecuting,
}: OrchestratorFormProps) => {
  const formRef = React.useRef<Form<JsonObject, JSONSchema7>>(null);
  const numStepsInMultiStepSchema = React.useMemo(
    () => getNumSteps(schema),
    [schema],
  );
  const isSingleStep = numStepsInMultiStepSchema === undefined;
  let _schema: JSONSchema7 = isSingleStep
    ? {
        type: 'object',
        properties: {
          dummy: schema,
        },
      }
    : schema;

  const handleReset = () => {
    formRef.current?.reset();
  };

  const _handleExecute = () => {
    const formData = formRef.current?.state.formData || {};
    let data = isSingleStep ? formData.dummy : formData;
    handleExecute(data as JsonObject);
  };

  return (
    <OrchestratorFormWrapper
      schema={_schema}
      ref={formRef}
      handleReset={handleReset}
      handleExecute={_handleExecute}
      isExecuting={isExecuting}
    />
  );
};

export default OrchestratorForm;
