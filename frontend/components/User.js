import React, { Component } from 'react';
import { ListGroupItem, Header, Button } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';

class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ListGroup>
        <ListGroupItem>Username: </ListGroupItem>
        <ListGroupItem>Email: </ListGroupItem>
        <ListGroupItem>Lessons: </ListGroupItem>
      </ListGroup>
    );
  } 
}

export default User;