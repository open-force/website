import { RepositoryList } from '@src/components';
import { Card, Spin } from 'antd';
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

  public async componentDidMount(){
    const response = await fetch('/api/repos');
    const repositories = await response.json();
    this.setState({ repositories });
  }

  public render() {
    return (
      <Card>
        <h1>Open Force</h1>
        <Card title={<h2>Repositories</h2>}>
          {this.renderRepositories()}
        </Card>
      </Card>
    );
  }

  private renderRepositories = () => {
    if (this.state.repositories) {
      return <RepositoryList repositories={this.state.repositories} />;
    }
    return <Spin spinning={true} />;
  }
}

export default hot(module)(App);
