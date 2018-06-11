import React from 'react';
import {
  object,
} from 'prop-types';
import {hot} from 'react-hot-loader';
import {Form, Input} from 'antd';
const FormItem = Form.Item;
import {createForm, formShape} from 'rc-form';
import './editRoute.less';

/**
 * EditRoute Page
 */
@hot(module)
class FormRoute extends React.Component {
  static propTypes = {
    classes: object,
    form: formShape,
  };

  /**
   * [handleSubmit description]
   * @param  {[type]} e [description]
   */
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  /**
   * Render List Page
   * @return {Component}
   */
  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 2},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 8},
      },
    };
    return (
      <div>
        <div className='title'>新增线路</div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormItem
            {...formItemLayout}
            label="线路名称"
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input />
            )}
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default createForm()(FormRoute);
