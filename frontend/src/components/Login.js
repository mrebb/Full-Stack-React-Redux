import React, { Component, Fragment } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchAllUsers} from '../store/user';
import {login} from '../store/auth';
import cookie from 'react-cookies';
class Login extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      username: '',
      password: '',
      redirect:false,
    };
    const initialState = this.defaultState;
    this.state =  {...initialState};
  }
  componentDidMount(){
    fetchAllUsers();
  }
      onSubmit = event => {
        event.preventDefault();
        this.props.login(this.state).then((token)=>{
          cookie.save('Login-Cookie', token, { path: '/' });
          this.setState({ ...this.defaultState });
          this.setState({redirect: true}); 
        })
          .catch(err=>{this.setState({ ...this.defaultState });
            alert(`${err}`); });
      };   
    
      onChange = event => {
        const changedValue = {
          [event.target.name]: event.target.value,
        };
        this.setState(changedValue);
      };
      render(){
        return(
          <Fragment>     
            <form onSubmit={this.onSubmit}>
      &nbsp;  &nbsp;
              <div className="group">      
                <input value = {this.state.username}onChange={this.onChange} name="username" type="text" required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>User Name</label>
              </div>
              <div className="group"> 
                <input value = {this.state.password} onChange={this.onChange} name="password" type="password" required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Password</label>
              </div>  
              <button className="btn">Signin</button> &nbsp;&nbsp;    
              <Link className="btn" to="/signup">Signup as a New User</Link>
            </form>
            {
              this.state.redirect && <Redirect to="/dashboard" />
            }
          </Fragment> 
        );
      }
}
const mapStateToProps = ({ userState }) => ({ users: userState });
const mapDispatchToProps = { login,fetchAllUsers };

export default connect(mapStateToProps, mapDispatchToProps)(Login);