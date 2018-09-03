import React, { Component,Fragment } from 'react';
import  { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {addUserAsync,addUser} from '../store/user';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.defaultState = {
      username: '',
      password: '',
      role:'',
      email:'',
      isAuthenticated:false,
      redirect:false,
    };
    const initialState = this.defaultState;
    this.state =  {...initialState};
  }
      onSubmit = event => {
        event.preventDefault();
        this.props.addUserAsync(this.state).then((response)=>{
          console.log('token',response);
          this.setState({ ...this.defaultState });
          this.setState({redirect: true}); 
        });
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
    &nbsp;
              <div className="group">      
                <input value = {this.state.username}onChange={this.onChange} name="username" type="text" required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>User Name</label>
              </div>
              <div className="group">      
                <input value = {this.state.email} onChange={this.onChange} placeholder="           foo@bar.com" name="email" type="email" required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Email</label>
              </div>
              <div className="group">      
                <input value = {this.state.role} onChange={this.onChange} placeholder="           editor" name="role" type="text" required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Role</label>
              </div>
              <div className="group"> 
                <input value = {this.state.password} onChange={this.onChange} name="password" type="password" required />
                <span className="highlight"></span>
                <span className="bar"></span>
                <label>Password</label>
              </div>  
              {/* <div className="group"> 
      <input name="confirm" type="text" required />
      <span className="highlight"></span>
      <span className="bar"></span>
      <label>Confirm Password</label>
      </div>   */}
              <button className="btn">Signup</button>  
            </form>{
              this.state.redirect && <Redirect to="/" />
            }
          </Fragment>
        );
      }
}
const mapStateToProps = ({ userState }) => ({ users: userState });
const mapDispatchToProps = { addUser, addUserAsync };

export default connect(mapStateToProps, mapDispatchToProps)(Signup);