import { Card } from '@salesforce/design-system-react';
import { RepositoryIcon } from '@src/components/repositoryItem/repositoryIcon';
import { Avatar, Divider, Tooltip } from 'antd';
import * as React from 'react';

export interface RepositoryItemProps {
  repo: Repository;
}

export class RepositoryItem extends React.Component<RepositoryItemProps, any> {
  public render() {
    const {repo} = this.props;
    return (
      <Card
        className='slds-grid slds-grid_vertical'
        heading={this.renderTitle()}
      >
        {this.renderFork()}
        {repo.description}
        <Divider style={{marginBottom: 0}} />
        <div style={{ marginTop: 10, float: 'right' }}>
          <RepositoryIcon hint='language' iconType='code' text={repo.language} />
          <RepositoryIcon hint='stars' iconType='star' text={repo.stargazers_count} />
          <RepositoryIcon hint='watchers' iconType='notification' text={repo.watchers_count} />
          <RepositoryIcon hint='forks' iconType='fork' text={repo.forks_count} />
          {repo.license
            && <RepositoryIcon hint='license' iconType='book' text={repo.license.name} />
          }
          <RepositoryIcon
            hide={repo.open_issues_count === 0}
            hint='open issues'
            iconType='exclamation-circle'
            link={`${repo.html_url}/issues`}
            text={repo.open_issues_count}
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
        <Tooltip title={<a href={this.props.repo.owner.html_url}>{this.props.repo.owner.login}</a>}>
          <Avatar style={{marginRight: 8}} shape='square' src={this.props.repo.owner.avatar_url}/>
        </Tooltip>
        <a href={this.props.repo.html_url}>{this.props.repo.name}</a>
      </div>
    );
  }

  private renderFork() {
    if (this.props.repo.fork) {
      return (
        <div><i>forked from <a href={this.props.repo.parent.html_url}>{this.props.repo.parent.full_name}</a></i></div>
      );
    }
    return null;
  }

}
