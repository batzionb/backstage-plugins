import React from 'react';

import { InfoCard } from '@backstage/core-components';
import { AboutField } from '@backstage/plugin-catalog';

import { Grid } from '@material-ui/core';

import { WorkflowOverview } from '@janus-idp/backstage-plugin-orchestrator-common';

import { getAugmentedWorkflowOverview } from '../../augmentedWorkflowOverview';

const WorkflowDefinitionDetailsCard = ({
  workflowOverview,
}: {
  workflowOverview: WorkflowOverview;
}) => {
  const augmentedWorkflowOverview = React.useMemo(
    () => getAugmentedWorkflowOverview(workflowOverview),
    [workflowOverview],
  );
  return (
    <InfoCard title="Details" variant="fullHeight">
      <Grid container spacing={3}>
        <Grid item md={3}>
          <AboutField label="type" value={augmentedWorkflowOverview.type} />
        </Grid>
        <Grid item md={3}>
          <AboutField
            label="average duration"
            value={augmentedWorkflowOverview.avgDuration}
          />
        </Grid>
        <Grid item md={6}>
          <AboutField
            label="description"
            value={augmentedWorkflowOverview.description}
          />
        </Grid>
        <Grid item md={3}>
          <AboutField
            label="last run"
            value={augmentedWorkflowOverview.lastRunStatus}
          />
        </Grid>
        <Grid item md={3}>
          <AboutField
            label="last run status"
            value={augmentedWorkflowOverview.lastRunStatus}
          />
        </Grid>
      </Grid>
    </InfoCard>
  );
};

export default WorkflowDefinitionDetailsCard;
