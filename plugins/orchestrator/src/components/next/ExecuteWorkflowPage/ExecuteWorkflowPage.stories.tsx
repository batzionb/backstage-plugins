import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { TestApiProvider, wrapInTestApp } from '@backstage/test-utils';

import { Meta, StoryObj } from '@storybook/react';

import { fakeDataInputSchemaReponse } from '../../../__fixtures__/fakeWorkflowDataInputSchemaResponse';
import { orchestratorApiRef } from '../../../api';
import { MockOrchestratorClient } from '../../../api/MockOrchestratorClient';
import { orchestratorRootRouteRef } from '../../../routes';
import { ExecuteWorkflowPage } from './ExecuteWorkflowPage';

const meta = {
  title: 'Orchestrator/next/ExecuteWorkflowPage',
  component: ExecuteWorkflowPage,
} satisfies Meta<typeof ExecuteWorkflowPage>;

export default meta;

type Story = StoryObj<typeof meta>;

/** This component is used in order to correctly render nested components using the `TabbedLayout.Route` component. */
const TestRouter: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
  <Routes>
    <Route path="/*" element={<>{children}</>} />
  </Routes>
);

export const ExecuteWorkflowPageStory: Story = {
  name: 'Sample 1',
  render: args =>
    wrapInTestApp(
      <TestRouter>
        <TestApiProvider
          apis={[
            [
              orchestratorApiRef,
              new MockOrchestratorClient({
                getWorkflowDataInputSchemaResponse: Promise.resolve(
                  fakeDataInputSchemaReponse,
                ),
              }),
            ],
          ]}
        >
          <ExecuteWorkflowPage {...args} />
        </TestApiProvider>
      </TestRouter>,
      {
        mountedRoutes: {
          '/orchestrator': orchestratorRootRouteRef,
        },
      },
    ),
};
