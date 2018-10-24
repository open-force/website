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
