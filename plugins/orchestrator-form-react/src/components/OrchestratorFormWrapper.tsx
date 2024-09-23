import React, { Fragment } from 'react';

import { useApiHolder } from '@backstage/core-plugin-api';
import { JsonObject } from '@backstage/types';

import Form, { FormProps, withTheme } from '@rjsf/core';
import { Theme as MuiTheme } from '@rjsf/material-ui';
import { FieldProps, ValidatorType } from '@rjsf/utils';
import validator from '@rjsf/validator-ajv8';
import { JSONSchema7 } from 'json-schema';

import { orchestratorFormApiRef } from '@janus-idp/backstage-plugin-orchestrator-form-api';

import { defaultFormExtensionsApi } from '../DefaultFormApi';
import { MultiStepFormContextProvider } from './MutiStepFormContext';
import { OrchestratorFormProps } from './propTypes';
import StepperObjectField from './StepperObjectField';

const MuiForm = withTheme<JsonObject, JSONSchema7>(MuiTheme);

const OrchestratorFormWrapper = React.forwardRef<
  Form,
  OrchestratorFormProps & { schema: JSONSchema7 }
>(({ schema, handleExecute, handleReset, isExecuting }, ref) => {
  console.log({ ref });
  const formApi =
    useApiHolder().get(orchestratorFormApiRef) || defaultFormExtensionsApi;
  const withFormExtensions = formApi.getFormDecorator();
  const CustomObjectField = (props: FieldProps<JsonObject, JSONSchema7>) => {
    return (
      <StepperObjectField
        {...props}
        handleExecute={handleExecute}
        handleReset={handleReset}
        isExecuting={isExecuting}
      />
    );
  };
  const FormComponent = (
    props: Partial<FormProps<JsonObject, JSONSchema7>>,
  ) => {
    return (
      <MultiStepFormContextProvider
        isRoot={true}
        customObjectField={props.fields?.ObjectField}
      >
        <MuiForm
          {...props}
          fields={{
            ...props.fields,
            ObjectField: CustomObjectField,
          }}
          validator={
            props.validator ||
            (validator as ValidatorType<JsonObject, JSONSchema7>)
          }
          schema={props.schema || schema}
          noHtml5Validate={true}
          ref={ref}
          // Fragment needed so rjsf won't create a Submit button
        >
          <Fragment />
        </MuiForm>
      </MultiStepFormContextProvider>
    );
  };
  const NewComponent = withFormExtensions(FormComponent);
  return <NewComponent />;
});

export default OrchestratorFormWrapper;
