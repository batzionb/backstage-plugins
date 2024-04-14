## Quickstart Guide

This quickstart guide will help you install the Orchestrator using the helm chart and execute a sample workflow.

1. **Install Orchestrator**:
   Follow the provided [installation instructions for Orchestrator](/content/docs/installation/orchestrator/_index.md).

2. **Install Workflows**:
   Follow the provided [installation instructions for workflows](/content/docs/installation/workflows/deploy-from-helm-repository.md).

3. **Access Backstage**:
   Open your web browser and navigate to the Backstage application. Retrieve the URL using the following openshift CLI command.

   ```bash
   oc get route backstage-backstage -n rhdh-operator -o=jsonpath='{.spec.host}'
   ```

   Make sure the route is accessible to you locally.

4. **Login to backstage**
   Login to backstage with the Guest account.

5. **Navigate to Orchestrator**:
   Navigate to the Orchestrator page by clicking on the Orchestrator icon in the left navigation menu.

6. **Verify Pre-defined Workflows**:
   Verify that you see the three pre-defined workflows listed in the Workflows table: _Greeting workflow_, _Move2Kube workflow_, and _MTA Analysis_.

7. **Execute Greeting Workflow**:
   The primary action which can be called on a workflow is the `Run`.
   Choose the `Greeting Workflow` and click `Run`

8. **Monitor Workflow Status**:
   Wait for the status of the Greeting workflow execution to become _Completed_. This may take a moment.

