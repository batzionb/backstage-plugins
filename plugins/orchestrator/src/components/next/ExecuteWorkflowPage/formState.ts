import { JsonObject, JsonValue } from '@backstage/types';

import { JSONSchema7 } from 'json-schema';

import { StepperFormData } from './stepperFormTypes';

export function isJsonObject(value: JsonValue): value is JsonObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function flattenMultiStateFormData(
  schema: JSONSchema7,
  data: StepperFormData,
): JsonObject {
  const parameters: JsonObject = {};
  if (!schema.properties) {
    return data;
  }
  for (const [stepKey, stepSchema] of Object.entries(schema.properties)) {
    if (typeof stepSchema === 'boolean') {
      return data;
    }
    if (!stepSchema.properties) {
      return data;
    }
    for (const key of Object.keys(stepSchema.properties)) {
      parameters[key] = data[stepKey]?.[key];
    }
  }

  return parameters;
}
