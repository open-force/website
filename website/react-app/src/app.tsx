import { PageHeader, Spinner } from '@salesforce/design-system-react';
import { RepositoryList } from '@src/components';
import * as React from 'react';
import { hot } from 'react-hot-loader';

export interface AppState {
  repositories: Repository[];
}

class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      repositories: null,
    };
  }

  public async componentDidMount() {
    const response = await fetch('/api/repos');
    const repositories = await response.json();
    this.setState({ repositories });
  }

  public render() {
    return (
      <div>
        <PageHeader
          title='Open Force'
        />
          <div>
              <p>Welcome to open-force.org! This is a maker space for developers and others in the Salesforce.com ecosystem to share code with each other. Think of open-force as a workshop where people like you are hanging out, tinkering with things they are passionate about. Maybe you'd like to chip in on a project you find interesting, or maybe you'd like to bring your own project into the workshop?</p>

              <p>This website includes a searchable index of open source projects that exist in Salesforce-land. You can browse these projects with the tool below. Send an email to dev@open-force.org to have your project added to the index.</p>

              <p>There are some companion resources to this website:</p>

              <ol>
                  <li>You can get hosting for your project in our public GitHub at https://github.com/open-force. To have a repository created, send an email to dev@open-force.org.</li>
                  <li>We have a community of collaborators that hang out in a slack channel over on the GoodDaySir podcast slack. Sign up for the slack group at https://www.gooddaysirpodcast.com/community/, and find us in the #open-force channel.</li>
              </ol>

              <p>We're glad you're here. We love sharing knowledge and code, and we hope you will participate in our open source movement on the Salesforce platform!</p>
          </div>
        {this.renderRepositories()}
      </div>
    );
  }

  private renderRepositories = () => {
    if (this.state.repositories) {
      return <RepositoryList repositories={this.state.repositories} />;
    }
    return (
      <Spinner
        size='small'
        variant='base'
        assistiveText={{ label: 'Small spinner' }}
			/>
    );
  }
}

export default hot(module)(App);
