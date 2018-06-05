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
  paper: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  popperClose: {
    pointerEvents: 'none',
  },
  portal: {
    zIndex: 100,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.04)',
  },
  hoverList: {
    padding: '0 20px 0 12px',
    '&:hover': {
      background: theme.palette.background.default,
    },
  },
});

/**
 * 纯信息展示面板包含统一的样式，标题和详情内容
 * @param {string} [title=''] - 面板标题
 * @param {Node} [children] - 详情内容
 */
@withStyles(styles)
class TabShowList extends React.Component {
  static propTypes = {
    changeTabTitle: func.isRequired,
    classes: object,
    columns: array.isRequired,
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
   * [handleChange description]
   * @param {object} column - Table 头部分类内容
   */
  handleChange(column) {
    this.props.changeTabTitle(column);
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
      columns,
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
                        columns.map((column, index) => (
                          <div key={index} className={classes.hoverList}>
                            <Checkbox
                              checked={column.isCheck}
                              onChange={this.handleChange.bind(this, column)}
                              value="checked"
                              color='primary'
                            />
                            {column.label}
                          </div>
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

export default TabShowList;
