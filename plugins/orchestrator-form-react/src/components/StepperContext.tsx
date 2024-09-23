import React from 'react';

export type OrchestratorFormContext = {
  handleExecute: () => void;
  handleReset: () => void;
};

const context = React.createContext<OrchestratorFormContext | null>(null);

export const useStepperContext = (): OrchestratorFormContext => {
  const multiStepFormContext = React.useContext(context);
  if (!multiStepFormContext) {
    throw 'Context StepperContext is not defined';
  }
  return multiStepFormContext;
};

export const StepperContextProvider = ({
  handleExecute,
  handleReset,
}: {
  handleExecute: () => void;
  handleReset: () => void;
}) => {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const contextData = React.useMemo(() => {
    return {
      activeStep,
      handleNext: () => {
        setActiveStep(curActiveStep => curActiveStep + 1);
      },
      handleBack: () => setActiveStep(curActiveStep => curActiveStep - 1),
      reset: () => {
        setActiveStep(0);
        onReset();
      },
      reviewStep,
    };
  }, [handleExecute, handleReset]);
  return <context.Provider value={contextData}>{children}</context.Provider>;
};
