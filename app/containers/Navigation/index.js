import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import styles from './styles.css';
import { is } from '../../utils/utils';
import AppControls from '../../components/AppControls';
import { Pulse } from '../../components/Common';
import {
  changeSearchQuery,
  viewStockData,
} from '../../containers/MainScreen/redux';
import {
  selectSearchQuery,
  selectSearchResults,
  selectStockParams,
  selectShouldRenderBack,
} from '../MainScreen/selectors';
import {
  selectIsFetching,
} from '../StockScreen/selectors';

class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {
      searchResultsShown: false,
      searchResultsSelected: -1,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleKeydownOnDropdown = this.handleKeydownOnDropdown.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleClick);
    document.body.addEventListener('keydown', this.handleKeydownOnDropdown);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchResults && !this.state.searchResultsShown) {
      this.setState({ searchResultsShown: true });
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleClick);
    document.body.removeEventListener('keydown', this.handleKeydownOnDropdown);
  }

  handleKeydownOnDropdown(e) {
    if (this.state.searchResultsShown && is(e.keyCode, 13, 38, 40)) {
      switch (e.keyCode) {
        case 40:
          if (this.state.searchResultsSelected + 1 < this.props.searchResults.size) {
            this.setState({
              searchResultsSelected: this.state.searchResultsSelected + 1
            });
          }
          break;
        case 38:
          if (this.state.searchResultsSelected - 1 >= 0) {
            this.setState({
              searchResultsSelected: this.state.searchResultsSelected - 1
            });
          }
          break;
        case 13:
          this.handleSelect(this.props.searchResults.get(this.state.searchResultsSelected));
          break;
        default:
          break;
      }
    }
  }

  handleClick(e) {
    if (this.searchResultsList
    && this.state.searchResultsShown
    && !this.searchInput.contains(e.target)
    && !this.searchResultsList.contains(e.target)
    && !this.searchResultsList.contains(e.target)) {
      this.setState({
        searchResultsShown: false,
        searchResultsSelected: -1,
      });
    }
  }

  handleSelect(selected) {
    this.props.viewStockData(selected.toJS());
    this.setState({
      searchResultsShown: false,
      searchResultsSelected: 0,
    });
  }

  renderSearchResults() {
    if (this.props.searchResults.size && this.state.searchResultsShown) {
      return (
        <div className={styles.appNavigation__searchResults}>
          <ul
            className={styles.appNavigation__searchResultsList}
            ref={(searchResults) => { this.searchResultsList = searchResults; }}
          >
            {this.props.searchResults.map((each, index) =>
              <li
                key={each.get('symbol')}
                className={index === this.state.searchResultsSelected ?
                  styles.appNavigation__searchResultsItem__selected
                  : styles.appNavigation__searchResultsItem}
                onMouseDown={() => this.handleSelect(each)}
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
          <Pulse
            isActive={this.props.isPullingStockData}
          />
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
  isPullingStockData: React.PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  searchQuery: selectSearchQuery(),
  searchResults: selectSearchResults(),
  stockViewParams: selectStockParams(),
  shouldRenderBack: selectShouldRenderBack(),
  isPullingStockData: selectIsFetching(),
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
