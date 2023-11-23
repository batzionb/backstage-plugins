// generate an augmented workflow overview that's usable for the UI

import { WorkflowOverview } from '@janus-idp/backstage-plugin-orchestrator-common';

import getPrettyDuration from './prettyDuration';

const UNAVAILABLE = '---';

export type AugmentedWorkflowOverview = {
  id: string;
  name: string;
  lastTriggered: string;
  lastRunStatus: string;
  type: string;
  avgDuration: string;
  description: string;
};

export function getAugmentedWorkflowOverview(
  workflowOverview: WorkflowOverview,
): AugmentedWorkflowOverview {
  return {
    id: workflowOverview.id,
    name: workflowOverview.name || UNAVAILABLE,
    lastTriggered: workflowOverview.lastTriggered || UNAVAILABLE,
    lastRunStatus: workflowOverview.lastRunStatus || UNAVAILABLE,
    type: workflowOverview.type || UNAVAILABLE,
    avgDuration: workflowOverview.avgDurationMs
      ? getPrettyDuration(workflowOverview.avgDurationMs)
      : UNAVAILABLE,
    description: workflowOverview.description || UNAVAILABLE,
  };
}
