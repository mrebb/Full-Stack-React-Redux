import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeThingAsync } from '../store/thing'; 

class ThingItem extends Component {
  
  onDelete = () => {
    this.props.removeThingAsync(this.props.thing);
  }

  render() {
    return (
      <li>
        <p>
          {this.props.thing.name}
        </p>
        {
          this.props.role.includes('delete') &&
          <p>
            <button onClick={this.onDelete}>x</button>
          </p>
        }
      </li>
     
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  removeThingAsync: thing => dispatch(removeThingAsync(thing)),
});

ThingItem.propTypes = {
  removeThingAsync: PropTypes.func,
  thing: PropTypes.object,
};

export default connect(null, mapDispatchToProps)(ThingItem);


