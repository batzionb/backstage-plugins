import { JSONSchema7 } from 'json-schema';

export type OrchestratorFormProps = {
  handleExecute: () => void;
  handleReset: () => void;
  isExecuting: boolean;
};
