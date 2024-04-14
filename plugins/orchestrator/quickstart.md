## Quickstart Guide

This quickstart guide will help you install the Orchestrator using the helm chart and execute a sample workflow.

1. **Install Orchestrator**:
   Follow the provided [installation instructions for Orchestrator](https://www.parodos.dev/orchestrator-helm-chart/).

2. **Install a sample workflow**:
   Follow the [installation instructions for the greetings workflow](https://github.com/parodos-dev/serverless-workflows-config/blob/gh-pages/docs/greeting/README.md).

3. **Access Backstage**:
   Open your web browser and navigate to the Backstage application. Retrieve the URL using the following openshift CLI command.

   ```bash
   oc get route backstage-backstage -n rhdh-operator -o jsonpath='{.spec.host}'
   ```

   Make sure the route is accessible to you locally.

4. **Login to backstage**
   Login to backstage with the Guest account.

5. **Navigate to Orchestrator**:
   Navigate to the Orchestrator page by clicking on the Orchestrator icon in the left navigation menu.
   ![Selection_006](https://github.com/batzionb/backstage-plugins/assets/22211154/ab28e602-2d42-4b8c-910f-982ebb0149d9)

7. **Execute Greeting Workflow**:   
   Click on the 'Execute' button in the ACTIONS column of the Greeting workflow.
   ![Selection_008](https://github.com/batzionb/backstage-plugins/assets/22211154/5c03408e-00b0-48eb-82c0-d14854d75280)
   The 'Run workflow' page will open. Click 'Next step' and then 'Run'
   ![Selection_010](https://github.com/batzionb/backstage-plugins/assets/22211154/e90a0617-2f96-4eb1-89ec-2207e0d4cab4)
   ![Selection_011](https://github.com/batzionb/backstage-plugins/assets/22211154/5c909f4e-d5f7-40c2-af00-ee18db3146dc)
9. **Monitor Workflow Status**:
   Wait for the status of the Greeting workflow execution to become _Completed_. This may take a moment.

