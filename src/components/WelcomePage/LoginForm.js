import { Form, Icon, Input, Button, Checkbox } from "antd";
import React from "react";
import { connect } from "react-redux";
import { login, signup } from "../../redux/actions";

class NormalLoginForm extends React.Component {
  state = {
    type: "login"
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (this.state.type == "login") {
        this.props.login(values);
      } else {
        this.props.signup(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please enter your username!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
            />
          )}
        </Form.Item>
        {this.state.type == "register" && (
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "Please enter your email!" }]
            })(
              <Input
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
              />
            )}
          </Form.Item>
        )}
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [
              { required: true, message: "Please enter the password!" },
              { min: 6, message: "Password must be at least 6 characters" }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button btn-block"
          >
            {this.state.type == "login" ? "Log in" : "Register"}
          </Button>
          Or{" "}
          {this.state.type == "login" ? (
            <a
              onClick={() => {
                this.setState({ type: "register" });
                this.props.clearLoginError();
              }}
            >
              register now!
            </a>
          ) : (
            <a
              onClick={() => {
                this.setState({ type: "login" });
                this.props.clearSignupError();
              }}
            >
              Login now!
            </a>
          )}
          <Button
            type="dashed"
            onClick={() => this.props.history.replace("/game")}
            className="login-form-button btn-block"
            style={{ whiteSpace: "normal", height: "auto", minHeight: 30 }}
          >
            Play as a guest (your scores will not be saved)
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
  NormalLoginForm
);

const mapStateToProps = state => {
  return {
    error: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //Syntax
    login: values => dispatch(login(values)),
    signup: values => dispatch(signup(values)),
    clearLoginError: () => dispatch({ type: "CLEAR_LOGIN_ERROR" }),
    clearSignupError: () => dispatch({ type: "CLEAR_SIGNUP_ERROR" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLoginForm);
