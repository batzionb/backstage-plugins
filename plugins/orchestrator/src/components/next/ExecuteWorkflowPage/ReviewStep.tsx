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
import { JSONSchema7 } from 'json-schema';

const ReviewStep = ({
  busy,
  formDataObjects,
  refSchemas,
  handleBack,
  handleReset,
  handleExecute,
}: {
  busy: boolean;
  formDataObjects: JsonObject[];
  refSchemas: JSONSchema7[];
  handleBack: () => void;
  handleReset: () => void;
  handleExecute: () => void;
}) => {
  const orderedFormData = React.useMemo<JsonObject>(() => {
    return refSchemas.reduce<JsonObject>((prevFormData, refSchema, index) => {
      const orderedStapFormData = Object.keys(
        refSchema.properties || {},
      ).reduce<JsonObject>(
        (prevStepForm, key) => ({
          ...prevStepForm,
          [key]: formDataObjects[index][key],
        }),
        {},
      );
      return { ...prevFormData, ...orderedStapFormData };
    }, {});
  }, [formDataObjects, refSchemas]);
  return (
    <Content>
      <Paper square elevation={0}>
        <Typography variant="h6">Review and execute</Typography>
        <StructuredMetadataTable dense metadata={orderedFormData} />
        <Box mb={4} />
        <Button onClick={handleBack} disabled={busy}>
          Back
        </Button>
        <Button onClick={handleReset} disabled={busy}>
          Reset
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleExecute}
          disabled={busy}
          type="submit"
          startIcon={busy ? <CircularProgress size="1rem" /> : null}
        >
          Run
        </Button>
      </Paper>
    </Content>
  );
};

export default ReviewStep;
