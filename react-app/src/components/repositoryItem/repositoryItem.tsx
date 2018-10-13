import { ResourceIcon } from '@src/components/repositoryItem/repositoryIcon';
import { Avatar, Badge, Card, Divider, Icon, Popover, Tooltip } from 'antd';
import * as React from 'react';

export interface ResourceItemProps {
  repo: Resource;
}

export class ResourceItem extends React.Component<ResourceItemProps, any> {
  public render() {
    const {repo} = this.props;
    if (repo.type === 'repository' || repo.type === 'gist') {
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
            <ResourceIcon hint='language' iconType='code' text={repo.language} />
            <ResourceIcon hint='stars' iconType='star' text={repo.favoriteCount} />
            <ResourceIcon hint='watchers' iconType='notification' text={repo.watcherCount} />
            <ResourceIcon hint='forks' iconType='fork' text={repo.forkCount} />
            {repo.license && repo.license.name
              && <ResourceIcon hint='license' iconType='book' text={repo.license.name} />
            }
            <ResourceIcon
              hide={repo.type === 'gist' || repo.openIssueCount === 0}
              hint='open issues'
              iconType='exclamation-circle'
              link={`${repo.htmlUrl}/issues`}
              text={repo.openIssueCount}
            />
  
            <ResourceIcon
              hide={repo.topics.length === 0}
              hint={repo.topics.join(', ')}
              iconType='tags'
            />
  
          </div>
        </Card>
      );
    } else {
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
  
            <ResourceIcon
              hide={repo.topics.length === 0}
              hint={repo.topics.join(', ')}
              iconType='tags'
            />
  
          </div>
        </Card>
      );
    }

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
    if (this.props.repo.type === 'repository' && this.props.repo.isFork) {
      return (
        <div><i>forked from <a href={this.props.repo.parent.htmlUrl}>{this.props.repo.parent.fullName}</a></i></div>
      );
    }
    return null;
  }

}
