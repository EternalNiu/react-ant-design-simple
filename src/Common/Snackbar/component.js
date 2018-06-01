import React from 'react';
import {
  bool,
  func,
  number,
  string,
} from 'prop-types';
import IbusSnackbar from 'ibuscloud-ui/Snackbar';

/**
 * @param {string} [action=CLOSE] - 当前Snackbar接收到的事件
 * @param {boolean} [isOpen=false] - 是否显示Snackbar
 * @param {string} [message=''] - Snackbar文案
 * @param {function} onClose - 关闭Snackbar事件
 * @param {number} [timeout=3000] - 延时关闭时长(ms)
 */
export default class Snackbar extends React.Component {
  static propTypes = {
    action: string,
    isOpen: bool,
    message: string,
    onClose: func.isRequired,
    timeout: number,
  };

  static defaultProps = {
    action: 'CLOSE',
    isOpen: false,
    message: '',
    timeout: 3000,
  };

  timeoutId = void 0;

  /**
   * 如果action字段变成了OPEN,延时关闭时长到达之后自动关闭Snackbar
   * @param {Object} prevProps
   */
  componentDidUpdate(prevProps) {
    const {action: prevAction} = prevProps;
    const {action: nextAction, onClose, timeout} = this.props;

    if (nextAction === 'OPEN' && prevAction !== nextAction) {
      if (this.timeoutId !== void 0) {
        window.clearTimeout(this.timeoutId);
      }

      this.timeoutId = window.setTimeout(() => {
        onClose();

        this.timeoutId = void 0;
      }, timeout);
    }
  }

  /**
   * @return {Element}
   */
  render() {
    const {
      isOpen,
      message,
    } = this.props;

    return <IbusSnackbar message={message} open={isOpen} />;
  }
}
