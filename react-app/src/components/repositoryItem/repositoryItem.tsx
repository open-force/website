import { RepositoryIcon } from '@src/components/repositoryItem/repositoryIcon';
import { Avatar, Badge, Card, Divider, Icon, Popover, Tooltip } from 'antd';
import * as React from 'react';
import { Repository } from '../../../../shared/resource';

export interface RepositoryItemProps {
  repo: Repository;
}

export class RepositoryItem extends React.Component<RepositoryItemProps, any> {
  public render() {
    const {repo} = this.props;
    return (
      <Card
        className='spaced'
        type='inner'
        title={this.renderTitle()}
        extra={this.renderFork()}
      >
        {repo.description}
        <Divider style={{marginBottom: 0}} />
        <div style={{ marginTop: 10, float: 'right' }}>
          <RepositoryIcon hint='language' iconType='code' text={repo.language} />
          <RepositoryIcon hint='stars' iconType='star' text={repo.favoriteCount} />
          <RepositoryIcon hint='watchers' iconType='notification' text={repo.watcherCount} />
          <RepositoryIcon hint='forks' iconType='fork' text={repo.forkCount} />
          {repo.license
            && <RepositoryIcon hint='license' iconType='book' text={repo.license} />
          }
          <RepositoryIcon
            hide={repo.openIssueCount === 0}
            hint='open issues'
            iconType='exclamation-circle'
            link={`${repo.htmlUrl}/issues`}
            text={repo.openIssueCount}
          />

          <RepositoryIcon
            hide={repo.topics.length === 0}
            hint={repo.topics.join(', ')}
            iconType='tags'
          />

        </div>
      </Card>
    );
  }

  private renderTitle() {
    return (
      <div>
        <Tooltip title={<a href={this.props.repo.owner.website}>{this.props.repo.owner.username}</a>}>
          <Avatar style={{marginRight: 8}} shape='square' src={this.props.repo.owner.avatarUrl}/>
        </Tooltip>
        <a href={this.props.repo.url}>{this.props.repo.name}</a>
      </div>
    );
  }

  private renderFork() {
    if (this.props.repo.fork) {
      return (
        <div><i>forked from <a href={this.props.repo.parent.htmlUrl}>{this.props.repo.parent.fullName}</a></i></div>
      );
    }
    return null;
  }

}
