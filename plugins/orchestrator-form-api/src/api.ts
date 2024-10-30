import { createApiRef } from '@backstage/core-plugin-api';
import { JsonObject } from '@backstage/types';

import { FormProps } from '@rjsf/core';
import { ErrorSchema, UiSchema } from '@rjsf/utils';
// eslint-disable-next-line @backstage/no-undeclared-imports
import { JSONSchema7 } from 'json-schema';

// Type definition for properties passed to a form decorator component.
// This picks selected fields from `FormProps` provided by `react-jsonschema-form`.
// For more details on `FormProps`, refer to the `react-jsonschema-form` documentation:
// https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/form-props

// These properties allow for control over form data, form context, widgets,
// change handling, and custom validation logic.
export type FormDecoratorProps = Pick<
  FormProps<JsonObject, JSONSchema7>,
  'formData' | 'formContext' | 'widgets' | 'onChange' | 'customValidate'
> & {
  // Custom function to retrieve additional errors. Unlike `extraErrors`, which would be passed
  // through `onSubmit`, `getExtraErrors` dynamically generates errors outside of submission handling.
  // This is because the decorator does not expose `onSubmit` directly.
  getExtraErrors?: (
    formData: JsonObject,
  ) => Promise<ErrorSchema<JsonObject>> | undefined;
};

// Type definition for the decorator function that wraps the FormComponent.
// It accepts a form component with specified FormDecoratorProps and returns a new component type.
export type OrchestratorFormDecorator = (
  FormComponent: React.ComponentType<FormDecoratorProps>,
) => React.ComponentType;

// Interface defining the API for the orchestrator form, including a method to get a form decorator.
// The `getFormDecorator` method accepts a JSON schema and UI schema, then returns a decorator function
// that can wrap form components.
export interface OrchestratorFormApi {
  getFormDecorator(
    schema: JSONSchema7,
    uiSchema: UiSchema<JsonObject, JSONSchema7>,
  ): OrchestratorFormDecorator;
}

// Reference to the orchestrator form API, creating an API with an identifier for the plugin system.
// This API allows plugins to interact with the form orchestrator functionality.
export const orchestratorFormApiRef = createApiRef<OrchestratorFormApi>({
  id: 'plugin.orchestrator.form',
});
