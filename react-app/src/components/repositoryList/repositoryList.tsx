import { ResourceItem } from '@src/components/repositoryItem/repositoryItem';
import { Col, Input, List, Row, Select } from 'antd';
import * as React from 'react';

export interface ResourceListProps {
  resources: Resource[];
}

interface ResourceListState {
  searchTerm: string;
  sortField: SortFields;
  filteredTopics: string[];
}

enum SortFields {
  NAME = 'name',
  WATCHERS = 'watchers',
  STARS = 'stars',
}

export type Sorters = {
  [P in SortFields]: (a: Resource, b: Resource) => number;
};

const SORTERS: Sorters = {
  name: (a, b) => a.name.localeCompare(b.name),
  stars: (a, b) => b.favoriteCount - a.favoriteCount,
  watchers: (a, b) => b.watcherCount - a.watcherCount,
};

export class ResourceList extends React.Component<ResourceListProps, ResourceListState> {
  constructor(props: ResourceListProps) {
    super(props);

    this.state = {
      searchTerm: '',
      sortField: SortFields.NAME,
      filteredTopics: [],
    };
  }

  public render() {
    const topics = this.props.resources.reduce((ret, repo) => {
      repo.topics.forEach((topic) => ret.add(topic));
      return ret;
    }, new Set<string>());

    const topicOpts = [...topics].map((topic) => <Select.Option key={topic}>{topic}</Select.Option>);

    const dataSource = this.getDataSource();

    return (
      <div>
        <Row type='flex' justify='space-between'>
          <Col span={6}>
            <Input.Search
              value={this.state.searchTerm}
              onChange={(e) => this.setState({ searchTerm: e.target.value })}
              style={{ width: 300 }}
              placeholder='search repositories'
            />
          </Col>
          <Col span={6}>
            Topics: <Select
              value={this.state.filteredTopics}
              mode='multiple'
              style={{ width: '80%' }}
              placeholder='Filter on topics'
              onChange={(filteredTopics: string[]) => this.setState({ filteredTopics })}
            >
              {topicOpts}
            </Select>
          </Col>
          <Col span={4}>
            Sort By: <Select
              value={this.state.sortField}
              style={{ width: 130 }}
              placeholder='Sort By'
              onChange={(e: SortFields) => { this.setState({ sortField: e }); }}
            >
              <Select.Option value={SortFields.NAME}>Name</Select.Option>
              <Select.Option value={SortFields.STARS}>Stars</Select.Option>
              <Select.Option value={SortFields.WATCHERS}>Watchers</Select.Option>
            </Select>
          </Col>
        </Row>

        <List
          dataSource={dataSource}
          renderItem={this.renderItem}
        />
      </div>
    );
  }

  private getDataSource() {
    return this.props.resources.filter((repo) => {
      const term = this.state.searchTerm.toLowerCase();
      const include =
        (
          repo.name.toLowerCase().includes(term)
          || repo.description.includes(term)
          || repo.topics.filter((topic) => topic.includes(term)).length
        )
        &&
        (
          !this.state.filteredTopics.length
          || repo.topics.filter((topic) => this.state.filteredTopics.includes(topic)).length
        );
      return include;
    }).sort(SORTERS[this.state.sortField]);
  }

  private renderItem(item: Resource) {
    return <ResourceItem repo={item} />;
  }
}
