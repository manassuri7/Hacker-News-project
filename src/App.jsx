import React, { Component } from 'react';
import axios from 'axios';

import * as CONST from './constants';

import Search from './components/Search/Search.jsx';
import Table from './components/Table/Table.jsx';
import ButtonWithLoading from './components/ButtonWithLoading/ButtonWithLoading.jsx';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      query: CONST.DEFAULT_QUERY,
      searchKey: '',
      isLoading: false,
      sortKey: 'NONE',
      isSortReverse: false
    };

    this.fetchSearchTopStories   = this.fetchSearchTopStories.bind(this);
    this.onSearchChange          = this.onSearchChange.bind(this);
    this.onSearchSubmit          = this.onSearchSubmit.bind(this);
    this.onSort                  = this.onSort.bind(this);

    ////////// Private Methods
    this._needToSearchTopStories = this._needToSearchTopStories.bind(this);
    this._setSearchTopStories    = this._setSearchTopStories.bind(this);
  }


  componentDidMount() {
    const { query } = this.state;

    this.setState({ searchKey: query });
    this.fetchSearchTopStories(query, CONST.DEFAULT_PAGE);
  }


  fetchSearchTopStories(query, page) {
    this.setState({ isLoading: true });

    const API_URL = [
      `${CONST.PATH_BASE}`,
      `${CONST.PATH_SEARCH}`,
      '?',
      `${CONST.PARAM_SEARCH}`,
      `${query}`,
      '&',
      `${CONST.PARAM_PAGE}`,
      `${page}`,
      '&',
      `${CONST.PARAM_HPP}`,
      `${CONST.DEFAULT_HPP}`,
    ].join('');

    axios
      .get(API_URL)
      .then(response => response.data)
      .then(result => this._setSearchTopStories(result));
  }

  onSearchChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  onSearchSubmit(event) {
    const { query } = this.state;

    this.setState({ searchKey: query });

    if (this._needToSearchTopStories(query)) {
      this.fetchSearchTopStories(query, CONST.DEFAULT_PAGE);
    }

    event.preventDefault();
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;

    this.setState({ sortKey, isSortReverse });
  }


  _needToSearchTopStories(query) {
    return !this.state.results[query];
  }

  _setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey } = this.state;

    const oldHits = page === 0 ? [] : this.state.results[searchKey].hits;
    const updateHits = [...oldHits, ...hits];

    this.setState({
      results: {
        ...this.state.results,
        [searchKey]: { hits: updateHits, page }
      },
      isLoading: false
    });
  }

  ////////// Render
  render() {
    const { results, searchKey, query, isLoading, sortKey, isSortReverse } = this.state;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    const page = (results && results[searchKey] && results[searchKey].page) || 0;

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={query}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        <Table
          list={list}
          sortKey={sortKey}
          onSort={this.onSort}
          isSortReverse={isSortReverse}
        />
        <div className="interactions">
          <ButtonWithLoading
            isLoading={isLoading}
            onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}
            className="ButtonWithLoading"
          >
            More
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

export default App;
