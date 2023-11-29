import { WorkflowOverview } from '@janus-idp/backstage-plugin-orchestrator-common';

import WorkflowOverviewFormatter, {
  FormattedWorkflowOverview,
} from './WorkflowOverviewFormatter';

describe('WorkflowOverviewAdapter', () => {
  it('should adapt WorkflowOverview to AdaptedWorkflowOverview', () => {
    // Mock data for testing
    const mockWorkflowOverview: WorkflowOverview = {
      workflowId: '123',
      name: 'Sample Workflow',
      lastTriggeredMs: 1637833200000, // Replace with your timestamp in milliseconds
      lastRunStatus: 'Success',
      type: 'Sample Type',
      avgDurationMs: 150000,
      description: 'Sample description',
      uri: 'https://example.com/sample-workflow.yaml',
    };

    const adaptedData: FormattedWorkflowOverview =
      WorkflowOverviewFormatter.format(mockWorkflowOverview);

    expect(adaptedData.id).toBe(mockWorkflowOverview.workflowId);
    expect(adaptedData.name).toBe(mockWorkflowOverview.name);
    expect(adaptedData.lastTriggered).toBe('abc');
    expect(adaptedData.lastRunStatus).toBe(mockWorkflowOverview.lastRunStatus);
    expect(adaptedData.type).toBe(mockWorkflowOverview.type);
    expect(adaptedData.avgDuration).toBe('aaa');
    expect(adaptedData.description).toBe(mockWorkflowOverview.description);
    expect(adaptedData.format).toBe('yaml'); // Adjust based on your expected value
  });

  it('should have --- for undefined data', () => {
    // Mock data for testing
    const mockWorkflowOverview: WorkflowOverview = {
      workflowId: '123',
    };
    const adaptedData: FormattedWorkflowOverview =
      WorkflowOverviewFormatter.format(mockWorkflowOverview);

    expect(adaptedData.id).toBe(mockWorkflowOverview.workflowId);
    expect(adaptedData.name).toBe('---');
    expect(adaptedData.lastTriggered).toBe('---');
    expect(adaptedData.lastRunStatus).toBe('---');
    expect(adaptedData.type).toBe('---');
    expect(adaptedData.avgDuration).toBe('---');
    expect(adaptedData.description).toBe('---');
    expect(adaptedData.format).toBe('yaml');
  });
});
