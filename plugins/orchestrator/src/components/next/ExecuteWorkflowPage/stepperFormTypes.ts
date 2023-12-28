import { JsonValue } from '@backstage/types';

import { JSONSchema7 } from 'json-schema';

export type StepperFormData = {
  [key: string]: {
    [key: string]: JsonValue;
  };
};
export type ExecutionFormContext = {
  handleExecute: () => void;
  handleReset: () => void;
  handleBack: () => void;
  handleNext: () => void;
  activeStep: number;
  rootSchema: JSONSchema7;
  busy: boolean;
};
