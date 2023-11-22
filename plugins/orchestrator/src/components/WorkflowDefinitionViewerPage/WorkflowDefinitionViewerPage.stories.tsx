import React from 'react';

import { TestApiProvider, wrapInTestApp } from '@backstage/test-utils';

import { Meta, StoryObj } from '@storybook/react';

import { orchestratorApiRef } from '../../api';
import { mockOrchestratorApi } from '../../mocks/mockOrchestratorApi';
import { orchestratorRootRouteRef } from '../../routes';
import { WorkflowDefinitionViewerPage } from './WorkflowDefinitionViewerPage';

const meta = {
  title: 'Orchestrator',
  component: WorkflowDefinitionViewerPage,
  decorators: [
    Story =>
      wrapInTestApp(
        <TestApiProvider apis={[[orchestratorApiRef, mockOrchestratorApi]]}>
          <Story />
        </TestApiProvider>,
        {
          mountedRoutes: {
            '/orchestrator': orchestratorRootRouteRef,
          },
        },
      ),
  ],
} satisfies Meta<typeof WorkflowDefinitionViewerPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OrchestratorPageStory: Story = {
  name: 'WorkflowDefinitionViewerPage',
  args: {},
};
