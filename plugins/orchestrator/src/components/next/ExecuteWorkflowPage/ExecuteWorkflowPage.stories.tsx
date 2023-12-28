import { Meta, StoryObj } from '@storybook/react';
import { JSONSchema7 } from 'json-schema';

import { fakeWorkflowSchema } from '../../../__fixtures__/fakeWorkflowSchema';
import { StepperForm } from './StepperForm';

const meta = {
  title: 'Orchestrator/next/StepperForm',
  component: StepperForm,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof StepperForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StepperFormStory: Story = {
  args: {
    schema: fakeWorkflowSchema as JSONSchema7,
    // eslint-disable-next-line no-console
    handleExecute: () => console.log('on execute'),
    busy: false,
  },
};
