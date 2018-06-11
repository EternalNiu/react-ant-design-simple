import React from 'react';
import {
  object,
  number,
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
class EditRoute extends React.Component {
  static propTypes = {
    classes: object,
    count: number,
    form: formShape,
  };

  /**
   * [handleSubmit description]
   * @param  {[type]} e [description]
   */
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        console.log('ok', values);
      } else {
        console.log('error', error, values);
      }
    });
  }

  /**
   * Render List Page
   * @return {Component}
   */
  render() {
    const {getFieldProps, getFieldError} = this.props.form;
    const errors = getFieldError('routeName');
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
            <div>
              <Input {...getFieldProps('routeName', {
                rules: [
                  {
                    required: true,
                  },
                  {
                    type: 'email',
                    message: '错误的 routeName 格式',
                  },
                ],
              })}
              /></div>
            <div className='error'>
              {errors ? errors.join(',') : null}
            </div>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default createForm()(EditRoute);
