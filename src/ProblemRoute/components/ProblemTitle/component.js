import React from 'react';
import {
  array,
  func,
  object,
  node,
} from 'prop-types';
import {
  Card,
  Grid,
  IconButton,
  SvgIcon,
  TextField,
  withStyles,
} from '@material-ui/core';
import classNames from 'classnames';
import Chip from 'ibuscloud-ui/Chip';

import TabShowList from '../TabShowList';
import Filters from '../Filters';

const styles = (theme) => ({
  title: {
    padding: '17px 20px 17px 24px',
  },
  littleTitle: {
    flex: '0 0 auto',
    fontSize: 21,
    fontWeight: 400,
    color: '#43425d',
    marginRight: 20,
  },
  popperClose: {
    pointerEvents: 'none',
  },
  rightPaper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  searchInputContainer: {
    overflow: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  searchInputVisible: {
    width: 170,
  },
  searchInputHidden: {
    width: 0,
  },
});

/**
 * 纯信息展示面板包含统一的样式，标题和详情内容
 * @param {string} [title=''] - 面板标题
 * @param {Node} [children] - 详情内容
 */
@withStyles(styles)
class ProblemTitle extends React.Component {
  static propTypes = {
    classes: object,
    conditions: array.isRequired,
    children: node,
    changeFilter: func.isRequired,
    removeCondition: func.isRequired,
  };

  static defaultProps = {
    title: 'nihao',
  };

  /**
   * [constructor description]
   * @param  {[type]} props [description]
   */
  constructor(props) {
    super(props);

    this.state= {
      isSearchInputVisible: false,
      searchInputValue: '',
    };
  }

  /**
   * [handleChipRemove description]
   * @param  {object} condition - 去除卡片类型
   */
  handleChipRemove(condition) {
    const {
      conditions,
      changeFilter,
      removeCondition,
    } = this.props;

    const conditionIndexToRemove = conditions.findIndex((checkedList) => {
      // Filter id and condition id are joint primary key
      return checkedList.name === condition.name && checkedList.id === condition.id;
    });
      // Delete from selected conditions
    removeCondition({index: conditionIndexToRemove});
    changeFilter(condition);
  }

  /**
   * Hide search input and call props.onSearch function.
   * @param  {Object} event - The event source of the callback
   */
  handleSearch(event) {
    const {
      onSearch,
    } = this.props;

    const {
      searchInputValue: keyword,
    } = this.state;

    event.preventDefault();

    this.hideSearchInput();

    typeof onSearch === 'function' && onSearch(keyword, event);
  }

  /**
   * [handleSearchIconClick description]
   */
  handleSearchIconClick() {
    this.setState({
      ...this.state,
      isSearchInputVisible: true,
    });
    this.searchInputDom.focus();
  }

  /**
   * Update search input text field value
   * @param  {Object} event - The event source of the callback
   */
  handleSearchInputChange(event) {
    this.setState({
      ...this.state,
      searchInputValue: event.target.value,
    });
  }

  /**
   * Hide search input and clear input value
   */
  hideSearchInput() {
    this.setState({
      ...this.state,
      isSearchInputVisible: false,
      searchInputValue: '',
    });
  }

    /**
   * Save ref to searchInputDom
   * @param {Element} element - React element
   */
  setSearchInputDom(element) {
    this.searchInputDom = element;
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      conditions,
      children,
    } = this.props;

     const {
      isSearchInputVisible,
      searchInputValue,
    } = this.state;

    return (
      <Card>
        <Grid
          container
          justify='space-between'
          wrap='nowrap'
          className={classes.title}
        >
          <Grid item container justify='flex-start' wrap='nowrap'>
            <Grid item className={classes.littleTitle}>
              问题线路
            </Grid>
            <Grid item>
              {
                conditions.map((condition, index) => (
                  <Chip
                  key={index}
                  label={condition.typeName + ' : ' + condition.name}
                  onDelete={this.handleChipRemove.bind(this, condition)}
                />
                ))
              }
            </Grid>
          </Grid>
          <Grid item className={classes.rightPaper}>
            <Grid item className={classes.rightPaper}>
              <IconButton onClick={this.handleSearchIconClick.bind(this)}>
                <SvgIcon>
                  <use xlinkHref="#icon-icon_search"></use>
                </SvgIcon>
              </IconButton>
              <form
                className={classNames(classes.searchInputContainer, {
                  [classes.searchInputVisible]: isSearchInputVisible,
                  [classes.searchInputHidden]: !isSearchInputVisible,
                })}
                onSubmit={this.handleSearch.bind(this)}
              >
                <TextField
                  placeholder='站内搜索'
                  inputRef={this.setSearchInputDom.bind(this)}
                  value={searchInputValue}
                  onBlur={this.hideSearchInput.bind(this)}
                  onChange={this.handleSearchInputChange.bind(this)}
                />
              </form>
            </Grid>
            <Grid item>
              <TabShowList />
            </Grid>
            <Grid item>
              <Filters />
            </Grid>
          </Grid>
        </Grid>
        <div>
          {children}
        </div>
      </Card>
    );
  }
}

export default ProblemTitle;
