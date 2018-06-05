import React from 'react';
import {
  array,
  func,
  object,
} from 'prop-types';
import {
  Checkbox,
  ClickAwayListener,
  Collapse,
  Grid,
  IconButton,
  Portal,
  Paper,
  withStyles,
} from '@material-ui/core';
import {Manager, Target, Popper} from 'react-popper';
import FilterListIcon from '@material-ui/icons/FilterList';
import classNames from 'classnames';

const styles = (theme) => ({
  filterList: {
    paddingLeft: 25,
  },
  paper: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '15px 20px 15px 0',
  },
  popperClose: {
    pointerEvents: 'none',
  },
  portal: {
    zIndex: 100,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.04)',
  },
  typeName: {
    color: '#A3A6B4',
  },
});

/**
 * 纯信息展示面板包含统一的样式，标题和详情内容
 * @param {string} [title=''] - 面板标题
 * @param {Node} [children] - 详情内容
 */
@withStyles(styles)
class Filters extends React.Component {
  static propTypes = {
    classes: object,
    conditions: array.isRequired,
    changeFilter: func.isRequired,
    filters: array.isRequired,
    onConditionAdd: func.isRequired,
    onConditionRemove: func.isRequired,
  };

  /**
   * [constructor description]
   * @param  {[type]} props [description]
   */
  constructor(props) {
    super(props);

    this.state= {
      open: false,
    };
  }

  /**
   * 筛选项类型点击
   * @param  {[type]} typeName - 类型名
   * @param  {[type]} list - 选中列表
   */
  handleChange(typeName, list) {
    const {
      onConditionAdd,
      conditions,
      changeFilter,
      onConditionRemove,
    } = this.props;

    const conditionIndexToRemove = conditions.findIndex((checkedList) => {
      // Filter id and condition id are joint primary key
      return checkedList.name === list.name && checkedList.id === list.id;
    });


    if (conditionIndexToRemove === -1) { // Push to selected conditions
      onConditionAdd({
        ...list,
        typeName: typeName,
      });
    } else { // Delete from selected conditions
      onConditionRemove({index: conditionIndexToRemove});
    }
    changeFilter({...list, typeName: typeName});
  }

  /**
   * [handleToggle description]
   */
  handleToggle() {
    this.setState({
      open: !this.state.open,
    });
  }

  /**
   * [handleClose description]
   * @param {[type]} event [description]
   */
  handleClose(event) {
    if (this.target.contains(event.target)) {
      return;
    }
    this.setState({open: false});
  }

  /**
   * @return {Component}
   */
  render() {
    const {
      classes,
      filters,
    } = this.props;
    const {open} = this.state;

    return (
      <div>
        <Grid item>
          <Manager>
            <Target>
              <div
                ref={(node) => {
                  this.target = node;
                }}
              >
                <IconButton>
                  <FilterListIcon onClick={this.handleToggle.bind(this)}/>
                </IconButton>
              </div>
            </Target>
            <Portal>
              <Popper
                placement="bottom-end"
                eventsEnabled={open}
                className={classNames({[classes.popperClose]: !open}, classes.portal)}
              >
                <ClickAwayListener onClickAway={this.handleClose.bind(this)}>
                  <Collapse in={open} id="menu-list-collapse" >
                    <Paper className={classes.paper}>
                      {
                        filters.map((filter, index) => (
                          <Grid key={index} className={classes.filterList}>
                            <div className={classes.typeName}>{filter.typeName}</div>
                              {
                                filter.lists.map((list, index) => (
                                  <div key={index}>
                                    <Checkbox
                                      checked={list.isCheck}
                                      onChange={this.handleChange.bind(this, filter.typeName, list)}
                                      value="checked"
                                      color='primary'
                                    />
                                    {list.name}
                                  </div>
                                ))
                              }
                          </Grid>
                        ))
                      }
                    </Paper>
                  </Collapse>
                </ClickAwayListener>
              </Popper>
            </Portal>
          </Manager>
        </Grid>
      </div>
    );
  }
}

export default Filters;
