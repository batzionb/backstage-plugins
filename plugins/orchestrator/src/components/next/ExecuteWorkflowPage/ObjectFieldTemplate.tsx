import React, { ComponentType } from 'react';

import { JsonObject } from '@backstage/types';

import {
  Button,
  Grid,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { generateTemplates } from '@rjsf/material-ui-v5';
import { ObjectFieldTemplateProps } from '@rjsf/utils';
import { JSONSchema7 } from 'json-schema';

import ReviewStep from './ReviewStep';
import { ExecutionFormContext, StepperFormData } from './stepperFormTypes';

// TODO: figure out correct way to determine if multi step schema, and if needs this check at all
const isMultiStepSchema = (schema: JSONSchema7) =>
  schema.type === 'object' &&
  schema.properties &&
  Object.keys(schema.properties).length > 0 &&
  !Object.values(schema.properties).find(
    subSchema => typeof subSchema !== 'boolean' && subSchema.type !== 'object',
  );

const DefaultObjectTemplate = generateTemplates()
  .ObjectFieldTemplate as unknown as ComponentType<
  ObjectFieldTemplateProps<JsonObject, JSONSchema7, ExecutionFormContext>
>;

const StepperObjectFieldTemplate = ({
  properties,
  formData,
  formContext,
}: ObjectFieldTemplateProps<JsonObject, JSONSchema7, ExecutionFormContext>) => {
  return (
    <>
      <Stepper activeStep={formContext?.activeStep} orientation="vertical">
        {properties.map((element, index) => (
          <Step key={index}>
            <StepLabel
              aria-label={`Step ${index + 1} ${element.name}`}
              aria-disabled="false"
              tabIndex={0}
            >
              <Typography variant="h6" component="h2">
                {element.content}
              </Typography>
            </StepLabel>
            <StepContent>
              <Grid container>
                <Grid item xs={12}>
                  {element.content}
                </Grid>
                <Grid item xs={12}>
                  <Toolbar>
                    <Button
                      disabled={formContext?.activeStep === 0}
                      onClick={formContext?.handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginTop: '1em' }}
                      onClick={formContext?.handleNext}
                    >
                      Next
                    </Button>
                  </Toolbar>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {formContext?.activeStep === properties.length &&
        formContext &&
        formData && (
          <ReviewStep
            formContext={formContext}
            formData={formData as StepperFormData}
          />
        )}
    </>
  );
};

const ObjectFieldTemplate: ComponentType<
  ObjectFieldTemplateProps<JsonObject, JSONSchema7, ExecutionFormContext>
> = props => {
  if (
    props.schema === props.formContext?.rootSchema &&
    isMultiStepSchema(props.schema)
  ) {
    return <StepperObjectFieldTemplate {...props} />;
  }
  return <DefaultObjectTemplate {...props} title="" />;
};

export default ObjectFieldTemplate;
