import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Header, Content, List, Button, ListItem, Text, Icon, Left, Body, Right, Switch, Title, Footer } from 'native-base';
//functionalities
import AsyncStorage from '@react-native-community/async-storage';

export default class SideMenu extends Component {
    clearAsyncStorage = async() => {
      alert('did');
      AsyncStorage.clear();
    }

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
          <ListItem icon onPress={() => this.props.navigation.navigate('CreateAgent')}>
            <Left>
              <Button style={{ backgroundColor: "blue" }}>
                <Icon active name="people" />
              </Button>
            </Left>
            <Body>
              <Text>Create Agent</Text>
            </Body>
          </ListItem>
          {/* <ListItem icon onPress={() => this.props.navigation.navigate('VehicleKYC')}>
            <Left>
              <Button style={{ backgroundColor: "blue" }}>
                <Icon active name="md-bookmark" />
              </Button>
            </Left>
            <Body>
              <Text>Vehicle KYC</Text>
            </Body>
          </ListItem> */}
          <ListItem icon onPress={() => {
              this.clearAsyncStorage();
              this.props.navigation.navigate('Login');
            }}>
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