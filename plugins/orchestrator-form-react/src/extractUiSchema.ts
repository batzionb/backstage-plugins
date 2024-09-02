import { UiSchema } from '@rjsf/utils';
import { JSONSchema7, JSONSchema7Definition } from 'json-schema';
import get from 'lodash/get';
import set from 'lodash/set';

/**
 * Extracts the uiSchema from a mixed JSON Schema that includes
 * both standard JSON Schema properties and react-json-schema-form specific
 * UI Schema properties (prefixed with 'ui:'). The function does not modify
 * the original JSON Schema.
 *
 * @param mixedSchema - The JSON Schema that contains both standard and UI Schema properties.
 * @returns An object representing the uiSchema.
 */

const getStringAfterDot = (input: string) =>
  input.startsWith('.') ? input.slice(1) : input;

function extractUiSchema(mixedSchema: JSONSchema7): UiSchema {
  const rootSchema = mixedSchema;
  const result = {};
  const processLeafSchema = (
    leafSchema: JSONSchema7Definition,
    path: string,
  ) => {
    for (const [subSchemaKey, value] of Object.entries(leafSchema)) {
      if (subSchemaKey.startsWith('ui:')) {
        set(result, getStringAfterDot(`${path}.${subSchemaKey}`), value);
      }
    }
  };

  const processArrayItems = (items: JSONSchema7Definition[], path: string) => {
    for (let i = 0; i < items.length; ++i) {
      processObject(items[i], `${path}[${i}]`);
    }
  };

  const processObjectProperties = (
    properties: {
      [key: string]: JSONSchema7Definition;
    },
    path: string,
  ) => {
    for (const [key, value] of Object.entries(properties)) {
      processObject(value, `${path}.${key}`);
    }
  };

  const processArraySchema = (schema: JSONSchema7, path: string) => {
    if (Array.isArray(schema.items)) {
      processArrayItems(schema.items, `${path}.items`);
    } else if (typeof schema.items === 'object') {
      processObject(schema.items, `${path}.items`);
    }
    if (schema.additionalItems && typeof schema.additionalItems === 'object') {
      processObject(schema.additionalItems, `${path}.additinalItems`);
    }
  };

  const processComposedSchema = (curSchema: JSONSchema7, path: string) => {
    if (curSchema.anyOf) {
      processArrayItems(curSchema.anyOf, `${path}.anyOf`);
      return true;
    }
    if (curSchema.oneOf) {
      processArrayItems(curSchema.oneOf, `${path}.oneOf`);
      return true;
    }
    if (curSchema.allOf) {
      processArrayItems(curSchema.allOf, `${path}.allOf`);
      return true;
    }
    if (curSchema.then) {
      processObject(curSchema.then, `${path}`);
      return true;
    }
    if (curSchema.else) {
      processObject(curSchema.else, `${path}`);
      return true;
    }
    return false;
  };

  const getSchemaDefinition = (ref: string) => {
    const path = ref.replace(/^#\//, '').replace(/\//g, '.');
    return get(rootSchema, path);
  };

  const processObject = (
    curSchema: JSONSchema7Definition,
    path: string,
  ): any => {
    if (typeof curSchema === 'boolean') {
      return;
    }
    if (curSchema.$ref) {
      processObject(getSchemaDefinition(curSchema.$ref), path);
    } else if (curSchema.properties) {
      processObjectProperties(curSchema.properties, path);
    } else if (curSchema.items) {
      processArraySchema(curSchema, path);
    }
    if (!processComposedSchema(curSchema, path)) {
      processLeafSchema(curSchema, path);
    }
    return result;
  };

  processObject(mixedSchema, '');
  return result;
}

export default extractUiSchema;
