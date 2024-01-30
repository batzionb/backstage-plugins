/* eslint-disable @backstage/no-undeclared-imports */
import { Page } from '@playwright/test';

const tableCellByRow = (page: Page, row: number, column: number) =>
  page.locator('tbody').getByRole('row').nth(row).getByRole('cell').nth(column);

const tableCellByName = (page: Page, name: string | RegExp, column: number) =>
  page
    .locator('tbody')
    .getByRole('row', { name })
    .getByRole('cell')
    .nth(column);

const row = (page: Page) => page.locator('tbody').getByRole('row');

const TableTestUtils = {
  tableCellByName,
  tableCellByRow,
  row,
};

export default TableTestUtils;
