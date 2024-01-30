import { expect, test } from '@playwright/test';

import OrchestratorPageTestUtils, {
  InstanceTableColumn,
  WorkflowTableColumn,
} from '../TestUtils/OrchestratorPageLocators';

test.beforeEach(async ({ page }) => {
  await page.goto(
    'http://localhost:6006/iframe.html?args=&id=orchestrator-next-orchestratorpage--orchestrator-page-story&viewMode=story',
  );
});

test('workflows table data', async ({ page }) => {
  const rowNum = 2;
  // await OrchestratorPageTestUtils.workflowLink(page, /ansible.*parallel/i).should('exist');
  await expect(
    OrchestratorPageTestUtils.workflowLink(page, rowNum),
  ).toHaveAttribute(
    'href',
    '/orchestrator/workflows/yaml/orchestrator-ansible-job-parallel-error-handler',
  );
  await expect(
    OrchestratorPageTestUtils.workflowTableCell(
      page,
      rowNum,
      WorkflowTableColumn.CATEGORY,
    ),
  ).toContainText('Infrastructure');
  await expect(
    OrchestratorPageTestUtils.workflowTableCell(
      page,
      rowNum,
      WorkflowTableColumn.LAST_RUN,
    ),
  ).toContainText(/1970/);
  await expect(
    OrchestratorPageTestUtils.workflowTableCell(
      page,
      rowNum,
      WorkflowTableColumn.LAST_RUN_STATUS,
    ),
  ).toContainText('Suspended');
  await expect(
    OrchestratorPageTestUtils.workflowTableCell(
      page,
      rowNum,
      WorkflowTableColumn.AVG_DURATION,
    ),
  ).toContainText('5 sec');
  await expect(
    OrchestratorPageTestUtils.workflowTableCell(
      page,
      rowNum,
      WorkflowTableColumn.DESCRIPTION,
    ),
  ).toContainText(
    '[WF] Launch an Ansible Job within Ansible Automation Platform - ERROR Handling',
  );
  await expect(
    OrchestratorPageTestUtils.runWorkflow(page, rowNum),
  ).toBeVisible();
  await expect(
    OrchestratorPageTestUtils.viewWorkflow(page, rowNum),
  ).toBeVisible();
});

test('workflow instances table data', async ({ page }) => {
  OrchestratorPageTestUtils.workflowRunsTab(page).click();
  const rowNum = 0;
  await expect(
    OrchestratorPageTestUtils.workflowInstanceLink(page, rowNum),
  ).toHaveAttribute(
    'href',
    '/orchestrator/instances/12f767c1-9002-43af-9515-62a72d0eaf12',
  );
  await expect(
    OrchestratorPageTestUtils.workflowInstanceTableCell(
      page,
      rowNum,
      InstanceTableColumn.NAME,
    ),
  ).toHaveText('[WF] Ansible Job - Parallel/ERROR');
  await expect(
    OrchestratorPageTestUtils.workflowInstanceTableCell(
      page,
      rowNum,
      InstanceTableColumn.STATUS,
    ),
  ).toHaveText('Active');
  await expect(
    OrchestratorPageTestUtils.workflowInstanceTableCell(
      page,
      rowNum,
      InstanceTableColumn.CATEGORY,
    ),
  ).toHaveText('Infrastructure');
  await expect(
    OrchestratorPageTestUtils.workflowInstanceTableCell(
      page,
      rowNum,
      InstanceTableColumn.STARTED,
    ),
  ).toHaveText(/2023/);
  await expect(
    OrchestratorPageTestUtils.workflowInstanceTableCell(
      page,
      rowNum,
      InstanceTableColumn.DURATION,
    ),
  ).toHaveText('---');
});

test('workflow instances filter status', async ({ page }) => {
  OrchestratorPageTestUtils.workflowRunsTab(page).click();
  await expect(
    OrchestratorPageTestUtils.workflowInstanceTableRow(page),
  ).toHaveCount(4);
  await OrchestratorPageTestUtils.filterStatus(page).selectOption('SUSPENDED');
  await expect(
    OrchestratorPageTestUtils.workflowInstanceTableCell(
      page,
      0,
      InstanceTableColumn.STATUS,
    ),
  ).toHaveText('Suspended');
  await expect(
    OrchestratorPageTestUtils.workflowInstanceTableRow(page),
  ).toHaveCount(1);
});
