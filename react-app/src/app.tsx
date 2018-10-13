import { ResourceList } from '@src/components';
import { Card, Spin } from 'antd';
import * as React from 'react';
import { hot } from 'react-hot-loader';

export interface AppState {
  resources: Resource[];
}

class App extends React.Component<{}, AppState> {

  constructor(props: any) {
    super(props);
    this.state = {
      resources: null,
    };
  }

  public async componentDidMount() {
    const response = await fetch('/api/repos');
    const resources = await response.json();
    this.setState({ resources });
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
    if (this.state.resources) {
      return <ResourceList resources={this.state.resources} />;
    }
    return <Spin spinning={true} />;
  }
}

export default hot(module)(App);
