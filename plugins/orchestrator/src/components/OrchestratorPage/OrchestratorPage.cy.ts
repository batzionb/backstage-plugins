/* eslint-disable jest/expect-expect */
import OrchestratorPageTestUtils from "./OrchestratorPageTestUtils";

describe('orchestrator page component test', () => {
    
    beforeEach(() => {
        cy.visit("http://localhost:6006/iframe.html?args=&id=orchestrator-next-orchestratorpage--orchestrator-page-story&viewMode=story");
    })

    it('show workflow tab data and buttons', () => {
        
        OrchestratorPageTestUtils.workflowLink(/ansible.*parallel/i).should('exist');
        OrchestratorPageTestUtils.runWorkflow(/ansible.*parallel/i).should('exist');
    })

    it('show workflow runs', () => {
        OrchestratorPageTestUtils.workflowRunsTab().click();
        OrchestratorPageTestUtils.workflowRunStatus(/quarkus/i).should('contain.text', "Error");
    })
})