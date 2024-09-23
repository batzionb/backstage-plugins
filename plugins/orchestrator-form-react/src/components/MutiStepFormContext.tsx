import React from 'react';

import { JsonObject } from '@backstage/types';

import { Field } from '@rjsf/utils';
import { JSONSchema7 } from 'json-schema';

export type MultiStepFormContext = {
  isRoot: boolean;
  customObjectField?: Field<JsonObject, JSONSchema7, any>;
};

const context = React.createContext<MultiStepFormContext | null>(null);

export const useMultiStepFormContext = (): MultiStepFormContext => {
  const multiStepFormContext = React.useContext(context);
  if (!multiStepFormContext) {
    throw 'Context MultiStepFormContext is not defined';
  }
  return multiStepFormContext;
};

export const MultiStepFormContextProvider = ({
  children,
  isRoot,
  customObjectField,
}: {
  children: React.ReactNode;
  isRoot: boolean;
  customObjectField?: Field<JsonObject, JSONSchema7, any>;
}) => {
  const contextData = React.useMemo(() => {
    return {
      isRoot,
      customObjectField,
    };
  }, [isRoot, customObjectField]);
  return <context.Provider value={contextData}>{children}</context.Provider>;
};
