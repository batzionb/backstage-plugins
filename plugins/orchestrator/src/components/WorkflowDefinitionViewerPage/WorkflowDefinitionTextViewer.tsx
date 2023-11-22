import React from 'react';

import { CodeSnippet, Progress } from '@backstage/core-components';

import {
  extractWorkflowFormatFromUri,
  toWorkflowString,
  WorkflowFormat,
  WorkflowItem,
} from '@janus-idp/backstage-plugin-orchestrator-common';

const WorkflowDefinitionTextViewer = ({
  workflowItem,
}: {
  workflowItem?: WorkflowItem;
}) => {
  const [error, setError] = React.useState<unknown>();
  const [text, setText] = React.useState<string>('');
  const [format, setFormat] = React.useState<WorkflowFormat>();

  React.useEffect(() => {
    if (!workflowItem) {
      return;
    }
    try {
      const format_ = extractWorkflowFormatFromUri(workflowItem.uri);
      setText(toWorkflowString(workflowItem.definition, format_));
      setFormat(format_);
    } catch (err) {
      setError(new Error('Failed to extract workflow text.'));
    }
  }, [workflowItem, setFormat]);

  if (error) {
    return <div>error</div>;
  }

  if (!workflowItem || !format) {
    return <Progress />;
  }

  return (
    <div style={{ height: '600px', overflowY: 'auto' }}>
      <CodeSnippet text={text} language={format} showLineNumbers />
    </div>
  );
};

export default WorkflowDefinitionTextViewer;
