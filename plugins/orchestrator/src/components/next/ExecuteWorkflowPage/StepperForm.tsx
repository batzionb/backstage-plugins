import React from 'react';

import { JsonObject } from '@backstage/types';

import {
  Button,
  Card,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import { JSONSchema7 } from 'json-schema';

import ReviewStep from './ReviewStep';
import WrappedForm from './WrappedForm';

const StepperForm = ({
  refSchemas,
  handleExecute,
  isExecuting,
}: {
  refSchemas: JSONSchema7[];
  handleExecute: (formData: JsonObject) => Promise<void>;
  isExecuting: boolean;
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const handleBack = () => setActiveStep(activeStep - 1);

  const [formDataObjects, setFormDataObjects] = React.useState<JsonObject[]>(
    [],
  );
  const formData = React.useMemo<JsonObject>(
    () =>
      formDataObjects.reduce<JsonObject>(
        (prev, curFormObject) => ({ ...prev, ...curFormObject }),
        {},
      ),
    [formDataObjects],
  );

  const resetFormDataObjects = () =>
    setFormDataObjects(
      refSchemas.reduce<JsonObject[]>(prev => [...prev, {}], []),
    );

  React.useEffect(() => {
    resetFormDataObjects();
  }, []);

  return (
    <>
      <Stepper activeStep={activeStep} orientation="vertical">
        {refSchemas.map((schema, index) => (
          <Step key={index}>
            <StepLabel
              aria-label={`Step ${index + 1} ${schema.title}`}
              aria-disabled="false"
              tabIndex={0}
            >
              <Typography variant="h6" component="h2">
                {schema.title}
              </Typography>
            </StepLabel>
            <StepContent>
              <WrappedForm
                formData={formDataObjects[index]}
                schema={{ ...schema, title: '' }} // title is in step
                onSubmit={e => {
                  const newDataObjects = [...formDataObjects];
                  newDataObjects.splice(index, 1, e.formData || {});
                  setFormDataObjects(newDataObjects);
                  setActiveStep(activeStep + 1);
                }}
              >
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Next step
                </Button>
              </WrappedForm>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === refSchemas.length && (
        <ReviewStep
          refSchemas={refSchemas}
          formDataObjects={formDataObjects}
          handleBack={handleBack}
          handleReset={() => {
            resetFormDataObjects();
            setActiveStep(0);
          }}
          busy={isExecuting}
          handleExecute={() => handleExecute(formData)}
        />
      )}
    </>
  );
};

export default StepperForm;
