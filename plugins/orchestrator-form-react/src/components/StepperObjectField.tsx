import React from 'react';

import { JsonObject } from '@backstage/types';

import ObjectField from '@rjsf/core/lib/components/fields/ObjectField';
import { FieldProps } from '@rjsf/utils';
import { JSONSchema7 } from 'json-schema';

import OrchestratorFormStepper, {
  OrchestratorFormStep,
} from './OrchestratorFormStepper';
import { OrchestratorFormProps } from './propTypes';

const StepperObjectField = (
  props: FieldProps<JsonObject, JSONSchema7> & OrchestratorFormProps,
) => {
  const {
    formData,
    schema,
    uiSchema,
    onChange,
    handleExecute,
    handleReset,
    isExecuting,
  } = props;
  const steps = Object.entries(schema.properties || {}).reduce<
    OrchestratorFormStep[]
  >((prev, [key, subSchema]) => {
    if (typeof subSchema === 'boolean') {
      return prev;
    }
    return [
      ...prev,
      {
        content: (
          <ObjectField<JsonObject, JSONSchema7>
            {...props}
            schema={{ ...subSchema, title: '' }} // the title is in the step
            uiSchema={uiSchema?.[key] || {}}
            formData={(formData?.[key] as JsonObject) || {}}
            onChange={data => onChange({ ...formData, [key]: data })}
          />
        ),
        title: subSchema.title || key,
        key,
      },
    ];
  }, []);

  return (
    <OrchestratorFormStepper
      steps={steps}
      handleExecute={handleExecute}
      handleReset={handleReset}
      schema={schema}
      formData={formData || {}}
      isExecuting={isExecuting}
    />
  );
};

export default StepperObjectField;
