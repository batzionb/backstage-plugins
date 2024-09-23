import { JsonObject } from '@backstage/types';

import { JSONSchema7 } from 'json-schema';

import {
  ComposedSchema,
  isComposedSchema,
  isJsonObjectSchema,
  JsonObjectSchema,
  WorkflowDefinition,
  WorkflowInputSchemaResponse,
  WorkflowInputSchemaStep,
} from '@janus-idp/backstage-plugin-orchestrator-common';

import { WORKFLOW_DATA_KEY } from './constants';

const SINGLE_SCHEMA_TITLE = 'workflow input data';
const SINGLE_SCHEMA_KEY = 'DUMMY_KEY_FOR_SINGLE_SCHEMA';

export class DataInputSchemaService {
  public extractInitialStateFromWorkflowData(
    workflowData: JsonObject,
    schemaProperties: JsonObjectSchema['properties'],
  ): JsonObject {
    return Object.keys(schemaProperties)
      .filter(k => k in workflowData)
      .reduce((result, k) => {
        if (!workflowData[k]) {
          return result;
        }
        result[k] = workflowData[k];
        return result;
      }, {} as JsonObject);
  }

  private findReferencedSchema(
    rootSchema: JSONSchema7,
    ref: string,
  ): JSONSchema7 {
    const pathParts = ref.split('/').filter(part => !['#', ''].includes(part));

    let current: any = rootSchema;
    for (const part of pathParts) {
      current = current?.[part];
      if (current === undefined) {
        throw new Error(`schema contains invalid ref ${ref}`);
      }
    }
    return current;
  }

  public resolveRefs(schema: JsonObjectSchema): JsonObjectSchema {
    const resolvedSchemaProperties = Object.entries(schema.properties).reduce<
      JsonObjectSchema['properties']
    >(
      (prev, [key, curSchema]) => ({
        ...prev,
        [key]: curSchema.$ref
          ? this.findReferencedSchema(schema, curSchema.$ref)
          : curSchema,
      }),
      {},
    );
    return {
      ...schema,
      properties: resolvedSchemaProperties,
    };
  }

  public extractWorkflowData(variables?: object): JsonObject | undefined {
    return variables && WORKFLOW_DATA_KEY in variables
      ? (variables[WORKFLOW_DATA_KEY] as JsonObject)
      : undefined;
  }
}
