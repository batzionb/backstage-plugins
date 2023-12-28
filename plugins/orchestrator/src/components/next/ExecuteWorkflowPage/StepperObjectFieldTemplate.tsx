import React, { ComponentType, useState } from 'react';

import {
  Button,
  Grid,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import { ObjectFieldTemplateProps } from '@rjsf/core';

const StepperObjectFieldTemplate: ComponentType<
  ObjectFieldTemplateProps<any>
> = ({ properties }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  return (
    <Stepper activeStep={activeStep} orientation="vertical">
      {properties.map((element, index) => (
        <Step key={index}>
          <StepLabel
            aria-label={`Step ${index + 1} ${element.name}`}
            aria-disabled="false"
            tabIndex={0}
          >
            <Typography variant="h6" component="h2">
              {element.name}
            </Typography>
          </StepLabel>
          <StepContent>
            <Grid container>
              <Grid item xs={12}>
                {element.content}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '1em' }}
                  onClick={handleNext}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperObjectFieldTemplate;
