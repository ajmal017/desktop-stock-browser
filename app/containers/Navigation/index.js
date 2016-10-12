import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import styles from './styles.css';
import AppControls from '../../components/AppControls';
import {
  changeSearchQuery,
  viewStockData,
} from '../../containers/MainScreen/actions';
import {
  selectSearchQuery,
  selectSearchResults,
  selectStockParams,
  selectShouldRenderBack,
} from '../MainScreen/selectors';

class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {
      searchResultsShown: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document
      .body
      .addEventListener('click', this.handleClick);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchResults && !this.state.searchResultsShown) {
      this.setState({ searchResultsShown: true });
    }
  }

  componentWillUnmount() {
    document
      .body
      .removeEventListener('click', this.handleClick);
  }

  handleClick(e) {
    if (this.searchResultsList
    && this.state.searchResultsShown
    && !this.searchInput.contains(e.target)
    && !this.searchResultsList.contains(e.target)
    && !this.searchResultsList.contains(e.target)) {
      this.setState({
        searchResultsShown: false,
      });
    }
  }

  renderSearchResults() {
    if (this.props.searchResults.size && this.state.searchResultsShown) {
      return (
        <div className={styles.appNavigation__searchResults}>
          <ul
            className={styles.appNavigation__searchResultsList}
            ref={(searchResults) => { this.searchResultsList = searchResults; }}
          >
            {this.props.searchResults.map((each) =>
              <li
                key={each.get('symbol')}
                className={styles.appNavigation__searchResultsItem}
                onMouseDown={() => {
                  this.props.viewStockData(each.toJS());
                  this.setState({
                    searchResultsShown: false,
                  });
                }}
                ref={(thisComp) => {
                  this.searchResultsList = thisComp;
                }}
              >
                <span className={styles.appNavigation__searchResultsItemName}>{each.get('name')}</span>
                <span
                  className={styles.appNavigation__searchResultsItemExchange}
                >
                  {each.get('exchDisp')}
                </span>
              </li>
            )}
          </ul>
        </div>
      );
    }
    return null;
  }

  renderTitle() {
    let titleToBeRendered;
    const routingDataState = this.props.stockViewParams;


    if (routingDataState) {
      titleToBeRendered = (
        <p
          className={styles.appNavigation__containerBranding}
        >
          <span className={styles.appNavigation__containerBrandingExchDisp}>
            {routingDataState.exchDisp}
          </span>
          {routingDataState.name}
        </p>);
    } else {
      titleToBeRendered = (<p
        className={styles.appNavigation__containerBranding}
        style={{
          marginLeft: 10,
        }}
      >
        Watchtower
      </p>);
    }

    return (
      <div className={styles.appNavigation__containerSection}>
        {titleToBeRendered}
      </div>
    );
  }

  render() {
    return (
      <div
        className={styles.appNavigation}
        id="appNavigationContainer"
      >
        <AppControls />
        <div className={styles.appNavigation__container}>
          <button
            onClick={() => this.props.returnToHome()}
            style={{
              display: this.props.shouldRenderBack ? 'block' : 'none',
            }}
          >
            <i
              className="fa fa-chevron-left"
              style={{
                color: 'white',
                marginLeft: 10,
              }}
            />
          </button>
          {this.renderTitle()}
        </div>
        <div className={styles.appNavigation__search}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.appNavigation__searchInput}
            onChange={this.props.changeSearchQuery}
            value={this.props.searchQuery}
            onFocus={() => this.setState({ searchResultsShown: true })}
            ref={(comp) => { this.searchInput = comp; }}
          />
          <button className={styles.appNavigation__searchButton}>
            <i className="fa fa-search" />
          </button>
          {this.renderSearchResults()}
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  changeSearchQuery: React.PropTypes.func,
  searchQuery: React.PropTypes.string,
  searchResults: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.array,
  ]),
  viewStockData: React.PropTypes.func,
  stockViewParams: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  returnToHome: React.PropTypes.func,
  shouldRenderBack: React.PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  searchQuery: selectSearchQuery(),
  searchResults: selectSearchResults(),
  stockViewParams: selectStockParams(),
  shouldRenderBack: selectShouldRenderBack(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeSearchQuery: (e) => dispatch(changeSearchQuery(e.target.value)),
    viewStockData: (stockParams) => {
      dispatch(viewStockData(stockParams));
      dispatch(changeSearchQuery(stockParams.name));
    },
    returnToHome: () => {
      dispatch(push('/'));
      dispatch(viewStockData(false));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
