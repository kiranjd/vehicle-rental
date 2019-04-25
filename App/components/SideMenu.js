import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, List, Button, ListItem, Text, Icon, Left, Body, Right, Switch, Title, Footer } from 'native-base';


export default class SideMenu extends Component {
    render() {
        return (
            <Container>
        <Header>
            <Title style={{marginTop: 10}}>Vehicle Rentals</Title>
        </Header>
        <Content>
          <ListItem icon onPress={() => this.props.navigation.navigate('AddVehicle')}>
            <Left>
              <Button style={{ backgroundColor: "blue" }}>
                <Icon active name="car" />
              </Button>
            </Left>
            <Body>
              <Text>Add Vehicle</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={() => this.props.navigation.navigate('Login')}>
            <Left>
              <Button style={{ backgroundColor: "red" }}>
                <Icon active name="close" />
              </Button>
            </Left>
            <Body>
              <Text>Logout</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
        );
    }
}