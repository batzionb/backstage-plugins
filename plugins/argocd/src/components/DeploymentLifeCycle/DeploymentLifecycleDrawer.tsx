import * as React from 'react';

import { useEntity } from '@backstage/plugin-catalog-react';

import {
  Box,
  Card,
  CardContent,
  Chip,
  createStyles,
  Drawer,
  Grid,
  IconButton,
  Link,
  makeStyles,
  Theme,
  Tooltip,
  Typography,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import { Skeleton } from '@material-ui/lab';
import { Flex, FlexItem } from '@patternfly/react-core';
import GitLabIcon from '@patternfly/react-icons/dist/esm/icons/gitlab-icon';
import moment from 'moment';

import { Application, Revision } from '../../types';
import { getCommitUrl } from '../../utils/utils';
import StatusHeading from '../AppStatus/StatusHeading';
import DeploymentLifecycledHeader from './DeploymentLifecycleHeader';

interface DeploymentLifecycleDrawerProps {
  app: Application | undefined;
  isOpen: boolean;
  onClose: () => void;
  revisionsMap: { [key: string]: Revision };
}

const useDrawerStyles = makeStyles<Theme>(theme =>
  createStyles({
    icon: {
      fontSize: 20,
    },
    paper: {
      width: '40%',
      padding: theme.spacing(2.5),
      gap: '3%',
    },
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'baseline',
    },
  }),
);
const DeploymentLifecycleDrawer: React.FC<DeploymentLifecycleDrawerProps> = ({
  app,
  isOpen,
  onClose,
  revisionsMap,
}) => {
  const appHistory = app?.status?.history ?? [];
  const latestRevision = appHistory[appHistory.length - 1];
  const appDeployedAt = latestRevision?.deployedAt;

  const { entity } = useEntity();
  const classes = useDrawerStyles();

  if (!app) {
    return null;
  }
  return (
    <Drawer
      data-testid={`${app?.metadata?.name}-drawer`}
      anchor="right"
      open={isOpen}
      onClose={onClose}
      classes={{
        paper: classes.paper,
      }}
    >
      <CardContent>
        <Grid container alignItems="stretch">
          <Grid item xs={12}>
            <div className={classes.header}>
              <Typography variant="h4">
                <DeploymentLifecycledHeader app={app} />
              </Typography>

              <IconButton
                key="dismiss"
                title="Close the drawer"
                onClick={onClose}
                color="inherit"
              >
                <Close className={classes.icon} />
              </IconButton>
            </div>
            <div style={{ display: 'flex' }}>
              <StatusHeading app={app} />
            </div>
          </Grid>

          <Grid item xs={12}>
            <Typography color="textPrimary">Instance</Typography>

            <Typography color="textSecondary" gutterBottom>
              {app?.metadata?.instance?.name}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">Server</Typography>

            <Typography
              style={{ overflowWrap: 'anywhere' }}
              variant="body2"
              color="textSecondary"
              gutterBottom
            >
              {app?.spec?.destination?.server}{' '}
              {app?.spec?.destination?.server ===
              'https://kubernetes.default.svc' ? (
                <>
                  <Tooltip title="This is the local cluster where Argo CD is installed.">
                    <span>(in-cluster) </span>
                  </Tooltip>
                </>
              ) : (
                ''
              )}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textPrimary">Namespace</Typography>

            <Flex
              gap={{ default: 'gapNone' }}
              alignItems={{ default: 'alignItemsFlexStart' }}
            >
              <FlexItem>
                <Chip
                  size="small"
                  variant="default"
                  color="primary"
                  label="NS"
                  style={{ background: 'green' }}
                />
              </FlexItem>
              <FlexItem>
                <Typography variant="body2" color="textSecondary">
                  {app.spec.destination.namespace}{' '}
                </Typography>
              </FlexItem>
            </Flex>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textPrimary">Commit</Typography>
            {latestRevision ? (
              <>
                <Chip
                  data-testid={`${latestRevision?.revision?.slice(
                    0,
                    5,
                  )}-commit-link`}
                  size="small"
                  variant="outlined"
                  icon={<GitLabIcon />}
                  color="primary"
                  onClick={e => {
                    e.stopPropagation();

                    const repoUrl = app?.spec?.source?.repoURL ?? '';
                    if (repoUrl) {
                      window.open(
                        getCommitUrl(
                          repoUrl,
                          latestRevision?.revision,
                          entity?.metadata?.annotations ?? {},
                        ),
                        '_blank',
                      );
                    }
                  }}
                  label={latestRevision?.revision.slice(0, 7)}
                />
                <Typography color="textSecondary">
                  {revisionsMap?.[latestRevision?.revision] ? (
                    <>
                      {revisionsMap?.[latestRevision?.revision]?.message} by{' '}
                      {revisionsMap?.[latestRevision?.revision]?.author}
                    </>
                  ) : (
                    <Skeleton />
                  )}
                </Typography>
              </>
            ) : (
              <>-</>
            )}
          </Grid>
          {appHistory.length >= 1 && (
            <Grid item xs={12}>
              <Typography color="textPrimary">Latest deployment</Typography>

              <Card elevation={2} style={{ margin: '10px' }}>
                <CardContent>
                  <Typography color="textPrimary" gutterBottom>
                    Deployment
                  </Typography>

                  <Typography variant="body2" color="textSecondary">
                    Image{' '}
                    <Link
                      href={`https://${app?.status?.summary?.images?.[0]}`}
                      target="_blank"
                      rel="noopener"
                    >
                      {app?.status?.summary?.images?.[0].split('/').pop()}
                    </Link>
                    <br />
                    {revisionsMap[latestRevision?.revision]?.message}{' '}
                    <Link
                      href={getCommitUrl(
                        app?.spec?.source?.repoURL ?? '',
                        latestRevision?.revision,
                        entity?.metadata?.annotations ?? {},
                      )}
                      target="_blank"
                      rel="noopener"
                    >
                      {latestRevision?.revision.slice(0, 7)}
                    </Link>{' '}
                    deployed {moment(appDeployedAt).local().fromNow()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )}
          {appHistory.length > 1 && (
            <Grid item xs={12}>
              <Typography color="textPrimary">Deployment history</Typography>
              <Box
                style={{
                  width: '100%',
                  margin: 0,
                  padding: '0',
                  height: '35vh',
                  overflowY: 'auto',
                }}
              >
                <br />
                {app?.status?.history
                  ?.slice()
                  ?.reverse()
                  .slice(1)
                  ?.map(dep => {
                    const commitUrl = app?.spec?.source?.repoURL
                      ? getCommitUrl(
                          app.spec.source.repoURL,
                          dep?.revision,
                          entity?.metadata?.annotations ?? {},
                        )
                      : null;
                    return (
                      <Card
                        elevation={2}
                        key={dep.id}
                        style={{ margin: '10px' }}
                      >
                        <CardContent>
                          <Typography color="textPrimary" gutterBottom>
                            Deployment
                          </Typography>

                          <Typography variant="body2" color="textSecondary">
                            {revisionsMap[dep.revision]?.message}{' '}
                            <Link
                              aria-disabled={!!commitUrl}
                              href={commitUrl ?? ''}
                              target="_blank"
                              rel="noopener"
                            >
                              {dep.revision.slice(0, 7)}
                            </Link>{' '}
                            deployed {moment(dep.deployedAt).local().fromNow()}
                          </Typography>
                        </CardContent>
                      </Card>
                    );
                  })}
              </Box>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Drawer>
  );
};
export default DeploymentLifecycleDrawer;