/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';

import { Content, StructuredMetadataTable } from '@backstage/core-components';
import { JsonObject } from '@backstage/types';

import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from '@material-ui/core';

import { flattenMultiStateFormData } from './formState';
import { ExecutionFormContext, StepperFormData } from './stepperFormTypes';

const ReviewStep = ({
  formContext,
  formData,
}: {
  formContext: ExecutionFormContext;
  formData: StepperFormData;
}) => {
  const flattenedFormData = React.useMemo<JsonObject>(
    () => flattenMultiStateFormData(formContext.rootSchema, formData),
    [formContext.rootSchema, formData],
  );
  return (
    <Content>
      <Paper square elevation={0}>
        <Typography variant="h6">Review and execute</Typography>
        <StructuredMetadataTable dense metadata={flattenedFormData} />
        <Box mb={4} />
        <Button onClick={formContext.handleBack} disabled={formContext.busy}>
          Back
        </Button>
        <Button onClick={formContext.handleReset} disabled={formContext.busy}>
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={formContext.handleExecute}
          disabled={formContext.busy}
          type="submit"
          startIcon={formContext.busy ? <CircularProgress size="1rem" /> : null}
        >
          Execute
        </Button>
      </Paper>
    </Content>
  );
};

export default ReviewStep;
