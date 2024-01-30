/* eslint-disable @backstage/no-undeclared-imports */
import { Page } from '@playwright/test';

import TableTestUtils from './TableTestUtils';

export enum InstanceTableColumn {
  ID,
  NAME,
  STATUS,
  CATEGORY,
  STARTED,
  DURATION,
}

export enum WorkflowTableColumn {
  NAME,
  CATEGORY,
  LAST_RUN,
  LAST_RUN_STATUS,
  AVG_DURATION,
  DESCRIPTION,
  ACTIONS,
}

export enum ProcessInstanceState {
  Active = 'ACTIVE',
  Completed = 'COMPLETED',
  Aborted = 'ABORTED',
  Suspended = 'SUSPENDED',
  Error = 'ERROR',
}

export type ProcessInstanceStateValues = Uppercase<
  keyof typeof ProcessInstanceState
>;

const workflowsTab = (page: Page) =>
  page.getByRole('tab', { name: 'workflows' });

const workflowRunsTab = (page: Page) =>
  page.getByRole('tab', { name: 'workflow runs' });

const workflowLink = (page: Page, row: number) =>
  TableTestUtils.tableCellByRow(page, row, WorkflowTableColumn.NAME).getByRole(
    'link',
  );

const workflowInstanceLink = (page: Page, row: number) =>
  TableTestUtils.tableCellByRow(page, row, InstanceTableColumn.ID).getByRole(
    'link',
  );

const runWorkflow = (page: Page, row: number) =>
  TableTestUtils.tableCellByRow(
    page,
    row,
    WorkflowTableColumn.ACTIONS,
  ).getByRole('button', {
    name: /execute/i,
  });

const viewWorkflow = (page: Page, row: number) =>
  TableTestUtils.tableCellByRow(
    page,
    row,
    WorkflowTableColumn.ACTIONS,
  ).getByRole('button', {
    name: /view/i,
  });

const instanceTableCell = (
  page: Page,
  row: number,
  column: InstanceTableColumn,
) => TableTestUtils.tableCellByRow(page, row, column);

const workflowTableCell = (
  page: Page,
  row: number,
  column: WorkflowTableColumn,
) => TableTestUtils.tableCellByRow(page, row, column);

const workflowInstanceTableCell = (
  page: Page,
  row: number,
  column: InstanceTableColumn,
) => TableTestUtils.tableCellByRow(page, row, column);

const filterStatus = (page: Page) => page.getByRole('combobox');

const workflowInstanceTableRow = (page: Page) => TableTestUtils.row(page);

const OrchestratorPageTestUtils = {
  workflowsTab,
  workflowRunsTab,
  workflowLink,
  runWorkflow,
  instanceTableCell,
  workflowTableCell,
  workflowInstanceTableCell,
  viewWorkflow,
  workflowInstanceLink,
  filterStatus,
  workflowInstanceTableRow,
};

export default OrchestratorPageTestUtils;
