import { createPermission } from '@backstage/plugin-permission-common';

export const orchestratorWorkflowInstancesReadPermission = createPermission({
  name: 'orchestrator.workflowInstances.read',
  attributes: {
    action: 'read',
  },
});

export const orchestratorWorkflowInstanceReadPermission = createPermission({
  name: 'orchestrator.workflowInstance.read',
  attributes: {
    action: 'read',
  },
});

export const orchestratorWorkflowExecutePermission = createPermission({
  name: 'orchestrator.workflow.execute',
  attributes: {
    action: 'execute',
  },
});

export const orchestratorPermissions = [
  orchestratorWorkflowInstancesReadPermission,
  orchestratorWorkflowInstanceReadPermission,
  orchestratorWorkflowExecutePermission,
];

