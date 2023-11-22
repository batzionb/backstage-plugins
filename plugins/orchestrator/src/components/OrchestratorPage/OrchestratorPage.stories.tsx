import React from 'react';

import { TestApiProvider, wrapInTestApp } from '@backstage/test-utils';

import { Meta, StoryObj } from '@storybook/react';

import { orchestratorApiRef } from '../../api';
import { mockOrchestratorApi } from '../../mocks/mockOrchestratorApi';
import { orchestratorRootRouteRef } from '../../routes';
import { OrchestratorPage } from './OrchestratorPage';

const meta = {
  title: 'Orchestrator',
  component: OrchestratorPage,
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
} satisfies Meta<typeof OrchestratorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OrchestratorPageStory: Story = {
  name: 'OrchestratorPage',
  args: {},
};
