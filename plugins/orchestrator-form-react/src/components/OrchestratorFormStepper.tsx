import React from 'react';

import { JsonObject } from '@backstage/types';

import {
  Button,
  makeStyles,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@material-ui/core';
import { JSONSchema7 } from 'json-schema';

import { OrchestratorFormProps } from './propTypes';
import ReviewStep from './ReviewStep';
import SubmitButton from './SubmitButton';

const useStyles = makeStyles(theme => ({
  // Hotfix: this should be fixed in the theme
  step: {
    '& form': {
      '& .field-array > div > div': {
        outline: 'inherit !important',
        padding: 'inherit !important',
        backgroundColor: 'inherit !important',

        '& div > div > div > div': {
          // unfortunately there are no better CSS selectors
          backgroundColor: 'inherit !important',
        },
      },
    },
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'right',
    marginTop: theme.spacing(2),
  },
  formWrapper: {
    padding: theme.spacing(2),
  },
}));

export type OrchestratorFormStep = {
  content: React.ReactNode;
  title: string;
  key: string;
};

const OrchestratorFormStepper = ({
  steps,
  schema,
  formData,
  isExecuting,
  handleExecute,
  handleReset,
}: OrchestratorFormProps & {
  steps: OrchestratorFormStep[];
  schema: JSONSchema7;
  formData: JsonObject;
}) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  const reviewStep: OrchestratorFormStep = {
    title: 'Review',
    key: 'review',
    content: <ReviewStep schema={schema} data={formData} />,
  };
  const stepsWithReview = [...steps, reviewStep];
  const styles = useStyles();
  const isReviewStep = activeStep === stepsWithReview.length - 1;
  return (
    <>
      <Stepper
        activeStep={activeStep}
        variant="elevation"
        style={{ overflowX: 'auto' }}
        alternativeLabel
      >
        {stepsWithReview?.map((step, index) => (
          <Step key={step.key} className={styles.step}>
            <StepLabel
              aria-label={`Step ${index + 1} ${step.title}`}
              aria-disabled="false"
              tabIndex={0}
            >
              <Typography variant="h6" component="h2">
                {step.title}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={styles.formWrapper}>
        {stepsWithReview[activeStep].content}
      </div>
      <div className={styles.footer}>
        <Button disabled={activeStep === 0 || isExecuting} onClick={handleBack}>
          Back
        </Button>
        {isReviewStep ? (
          <>
            <Button
              onClick={() => {
                setActiveStep(0);
                handleReset();
              }}
              disabled={isExecuting}
            >
              Reset
            </Button>
            <SubmitButton
              handleClick={handleExecute}
              submitting={isExecuting}
              focusOnMount
            >
              Run
            </SubmitButton>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleNext}
          >
            Next
          </Button>
        )}
      </div>
    </>
  );
};

export default OrchestratorFormStepper;
