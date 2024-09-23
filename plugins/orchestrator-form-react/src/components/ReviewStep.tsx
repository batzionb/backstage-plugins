import React from 'react';

import { Content, StructuredMetadataTable } from '@backstage/core-components';
import { JsonObject } from '@backstage/types';

import { Paper } from '@material-ui/core';
import { JSONSchema7 } from 'json-schema';

import generateReviewTableData from '../utils/generateReviewTableData';

const ReviewStep = ({
  schema,
  data,
}: {
  schema: JSONSchema7;
  data: JsonObject;
}) => {
  const displayData = React.useMemo<JsonObject>(() => {
    return generateReviewTableData(schema, data);
  }, [schema, data]);
  return (
    <Content noPadding>
      <Paper square elevation={0}>
        <StructuredMetadataTable dense metadata={displayData} />
      </Paper>
    </Content>
  );
};

export default ReviewStep;
