import { JSONSchema7 } from 'json-schema';

import extractUiSchema from './extractUiSchema';

describe('extract ui schema', () => {
  it('if has properties ui: should create ui schema with properties', () => {
    const expected = {
      name: { 'ui:validationType': 'product' },
      color: { 'ui:widget': 'color1', 'ui:validationType': 'color' },
    };
    const mixedSchema: JSONSchema7 = {
      title: 'Product',
      type: 'object',
      properties: {
        name: {
          type: 'string',
          title: 'Product Name',
          'ui:validationType': 'product',
        },
        color: {
          type: 'string',
          title: 'Product Color',
          description: 'The color of the product',
          'ui:widget': 'color1',
          'ui:validationType': 'color',
        },
      },
      required: ['name', 'color'],
    } as JSONSchema7;
    const uiSchema = extractUiSchema(mixedSchema);
    console.log(uiSchema);
    expect(uiSchema).toEqual(expected);
  });
  it('if no properties ui: should create empty ui schema', () => {
    const mixedSchema: JSONSchema7 = {
      title: 'Product',
      type: 'object',
      properties: {
        name: {
          type: 'string',
          title: 'Product Name',
        },
        color: {
          type: 'string',
          title: 'Product Color',
          description: 'The color of the product',
        },
      },
      required: ['name', 'color'],
    } as JSONSchema7;
    const uiSchema = extractUiSchema(mixedSchema);
    expect(uiSchema).toEqual({});
  });
  it('should extract from array', () => {
    const mixedSchema = {
      title: 'A list of tasks',
      type: 'object',
      required: ['title'],
      properties: {
        title: {
          type: 'string',
          title: 'Task list title',
        },
        tasks: {
          type: 'array',
          title: 'Tasks',
          items: {
            type: 'object',
            required: ['title'],
            properties: {
              title: {
                type: 'string',
                title: 'Title',
                description: 'A sample title',
              },
              details: {
                type: 'string',
                title: 'Task details',
                description: 'Enter the task details',
                'ui:widget': 'textarea',
              },
              done: {
                type: 'boolean',
                title: 'Done?',
                default: false,
              },
            },
          },
        },
      },
    } as JSONSchema7;
    const expected = {
      tasks: {
        items: {
          details: {
            'ui:widget': 'textarea',
          },
        },
      },
    } as JSONSchema7;
    const uiSchema = extractUiSchema(mixedSchema);
    expect(uiSchema).toEqual(expected);
  });
  it('should extract from array with fixed number of items', () => {
    const mixedSchema = {
      type: 'object',
      properties: {
        fixedItemsList: {
          type: 'array',
          title: 'A list of fixed items',
          items: [
            {
              title: 'A string value',
              type: 'string',
              default: 'lorem ipsum',
              'ui:widget': 'textarea',
            },
            {
              title: 'a boolean value',
              type: 'boolean',
            },
          ],
          additionalItems: {
            title: 'Additional item',
            type: 'number',
          },
        },
      },
    } as JSONSchema7;
    const expected = {
      fixedItemsList: {
        items: [
          {
            'ui:widget': 'textarea',
          },
        ],
      },
    } as JSONSchema7;

    const uiSchema = extractUiSchema(mixedSchema);
    console.log(JSON.stringify(uiSchema, null, 4));
    expect(uiSchema).toEqual(expected);
  });

  it('should handle anyOf schema with ui:widget', () => {
    const schemaWithAnyOf = {
      title: 'A selection of items',
      type: 'object',
      properties: {
        selectedItem: {
          anyOf: [
            { type: 'string', title: 'Color', 'ui:widget': 'color' },
            { type: 'number', title: 'Number item' },
            { type: 'boolean', title: 'Boolean item' },
          ],
        },
      },
    } as JSONSchema7;

    const expected = {
      selectedItem: {
        anyOf: [{ 'ui:widget': 'color' }],
      },
    };

    const uiSchema = extractUiSchema(schemaWithAnyOf);
    expect(uiSchema).toEqual(expected);
  });
});
