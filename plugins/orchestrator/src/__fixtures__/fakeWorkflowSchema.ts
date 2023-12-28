export const fakeWorkflowSchema = {
  $id: 'classpath:/schemas/orchestrator-ansible-job-long__main_schema.json',
  title: 'orchestrator-ansible-job-long: Data Input Schema',
  $schema: 'http://json-schema.org/draft-04/schema#',
  type: 'object',
  properties: {
    'orchestrator-ansible-job-long__sub_schema__Generating_the_Ansible_Job_component_Run_Template_Fetch_Action_runActionTemplateFetch.json':
      {
        $ref: '#/$defs/orchestrator-ansible-job-long: Generating the Ansible Job component > Run Template Fetch Action > runActionTemplateFetch_0',
        type: 'object',
      },
    'orchestrator-ansible-job-long__sub_schema__Generating_the_Catalog_Info_Component_Catalog_template_action_runActionTemplateFetch.json':
      {
        $ref: '#/$defs/orchestrator-ansible-job-long: Generating the Catalog Info Component > Catalog template action > runActionTemplateFetch_1',
        type: 'object',
      },
    'orchestrator-ansible-job-long__sub_schema__Publish_to_GitHub_Publish_github_action_runActionGitHubRepoPush.json':
      {
        $ref: '#/$defs/orchestrator-ansible-job-long: Publish to GitHub > Publish github action > runActionGitHubRepoPush_2',
        type: 'object',
      },
    'orchestrator-ansible-job-long__sub_schema__Additional_input_data.json': {
      $ref: '#/$defs/orchestrator-ansible-job-long: Additional input data_3',
      type: 'object',
    },
  },
  $defs: {
    'orchestrator-ansible-job-long: Generating the Catalog Info Component > Catalog template action > runActionTemplateFetch_1':
      {
        $id: 'classpath:/schemas/orchestrator-ansible-job-long__sub_schema__Generating_the_Catalog_Info_Component_Catalog_template_action_runActionTemplateFetch.json',
        title:
          'orchestrator-ansible-job-long: Generating the Catalog Info Component > Catalog template action > runActionTemplateFetch',
        $schema: 'http://json-schema.org/draft-04/schema#',
        type: 'object',
        properties: {
          repoName: {
            title: 'repoName',
            description:
              'Extracted from https://github.com/janus-idp/software-templates/tree/main/skeletons/catalog-info',
            type: 'string',
          },
          owner: {
            title: 'owner',
            description:
              'Extracted from https://github.com/janus-idp/software-templates/tree/main/skeletons/catalog-info',
            type: 'string',
          },
          description: {
            title: 'description',
            description:
              'Extracted from https://github.com/janus-idp/software-templates/tree/main/skeletons/catalog-info',
            type: 'string',
          },
        },
        required: ['repoName', 'owner', 'description'],
      },
    'orchestrator-ansible-job-long: Publish to GitHub > Publish github action > runActionGitHubRepoPush_2':
      {
        $id: 'classpath:/schemas/orchestrator-ansible-job-long__sub_schema__Publish_to_GitHub_Publish_github_action_runActionGitHubRepoPush.json',
        title:
          'orchestrator-ansible-job-long: Publish to GitHub > Publish github action > runActionGitHubRepoPush',
        $schema: 'http://json-schema.org/draft-04/schema#',
        type: 'object',
        properties: {
          defaultBranch: {
            title: 'Default Branch',
            type: 'string',
            description:
              "Sets the default branch on the repository. The default value is 'master'",
          },
        },
        required: ['defaultBranch'],
      },
    'orchestrator-ansible-job-long: Generating the Ansible Job component > Run Template Fetch Action > runActionTemplateFetch_0':
      {
        $id: 'classpath:/schemas/orchestrator-ansible-job-long__sub_schema__Generating_the_Ansible_Job_component_Run_Template_Fetch_Action_runActionTemplateFetch.json',
        title:
          'orchestrator-ansible-job-long: Generating the Ansible Job component > Run Template Fetch Action > runActionTemplateFetch',
        $schema: 'http://json-schema.org/draft-04/schema#',
        type: 'object',
        properties: {
          component_id: {
            title: 'component_id',
            description:
              'Extracted from https://github.com/janus-idp/software-templates/tree/main/templates/github/launch-ansible-job/skeleton',
            type: 'string',
          },
          jobTemplate: {
            title: 'jobTemplate',
            description:
              'Extracted from https://github.com/janus-idp/software-templates/tree/main/templates/github/launch-ansible-job/skeleton',
            type: 'string',
          },
          namespace: {
            title: 'namespace',
            description:
              'Extracted from https://github.com/janus-idp/software-templates/tree/main/templates/github/launch-ansible-job/skeleton',
            type: 'string',
          },
          connection_secret: {
            title: 'connection_secret',
            description:
              'Extracted from https://github.com/janus-idp/software-templates/tree/main/templates/github/launch-ansible-job/skeleton',
            type: 'string',
          },
        },
        required: [
          'component_id',
          'jobTemplate',
          'namespace',
          'connection_secret',
        ],
      },
    'orchestrator-ansible-job-long: Additional input data_3': {
      $id: 'classpath:/schemas/orchestrator-ansible-job-long__sub_schema__Additional_input_data.json',
      title: 'orchestrator-ansible-job-long: Additional input data',
      $schema: 'http://json-schema.org/draft-04/schema#',
      type: 'object',
      properties: {
        githubOrg: {
          title: 'githubOrg',
          type: 'string',
          description: 'Extracted from the Workflow definition',
        },
        jiraAssignee: {
          title: 'jiraAssignee',
          type: 'string',
          description: 'Extracted from the Workflow definition',
        },
        jiraProjectKey: {
          title: 'jiraProjectKey',
          type: 'string',
          description: 'Extracted from the Workflow definition',
        },
        jiraReporter: {
          title: 'jiraReporter',
          type: 'string',
          description: 'Extracted from the Workflow definition',
        },
      },
    },
  },
};
