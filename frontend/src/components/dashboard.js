import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { addThing, addThingAsync,removeThingAsync,fetchThingsAsync } from '../store/thing';
import ThingForm from './ThingForm';
import cookie from 'react-cookies';
import styled from 'styled-components';
import Things from './ThingItem';
const Div = styled.div`
  margin: 40px;
  align-content: center;
  width:175px;
  background-color: rgb(153, 204, 255);
  border-radius: 25px;
  border: 5px outset rgb(84, 83, 83);
  &:hover {
   background-color: rgb(153, 204, 255);
 }
`;

class Dashboard extends Component {
  constructor(props){
    super(props);

    this.state={
      capabilities:'',
    };
  }
  
  componentDidMount(){
    this.setCapabilities();
    this.props.fetchThingsAsync();
  }

  setCapabilities(){
    
    let token = cookie.load('Login-Cookie');
    let role = JSON.parse(atob(token.split('.')[1]));
    let capabilities = role.capabilities;
    this.setState({capabilities});
  }
  
  clearCookie(){
    cookie.remove('Login-Cookie');
    window.location.reload();
  }
  
  render() {

    return (
      <Fragment>
        <Link onClick={this.clearCookie} className="btn" to="/">Signout</Link>
        <h1>Dashboard</h1>
        <h2>Thing count: {this.props.things.length}</h2>
        {this.state.capabilities.includes('create') &&
          <ThingForm onComplete={this.props.addThingAsync} buttonText="Add" />
        }
        <br></br>
        <br></br>
        {this.props.things.length && this.state.capabilities.includes('read') ?
          <ul>
            {this.props.things.map((thing,i)=> <Div key={i}><Things key={thing.id || i } thing={thing}/></Div>)}
          </ul>
          
          :
          
          <h2>No things :(</h2>
        }
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({ things: state.thingState, token:state.authState });
const mapDispatchToProps = { addThing, addThingAsync,removeThingAsync,fetchThingsAsync };

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);