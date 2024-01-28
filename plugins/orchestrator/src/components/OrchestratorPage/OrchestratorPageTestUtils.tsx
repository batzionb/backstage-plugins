const workflowLink = (name: string | RegExp) => cy.findByRole('link', {name: name});
const runWorkflow = (name: string | RegExp) => cy.findByRole('row', {name: name}).findByRole('button', {name: /execute/i});
const workflowsTab = () => cy.findByRole('tab', {name: /workflows/i});
const workflowRunsTab = () => cy.findByRole('tab', {name: /workflow runs/i});
const workflowRunStatus = (name: string | RegExp) => cy.findByRole('row', {name: name}).findAllByRole('cell').eq(2);


const OrchestratorPageTestUtils = {
    workflowLink,
    runWorkflow,
    workflowsTab,
    workflowRunsTab,
    workflowRunStatus
};

export default OrchestratorPageTestUtils;