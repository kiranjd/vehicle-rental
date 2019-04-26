import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
//UI
import {Container, Button, Text, Form, Input, Label, Item, H1} from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class Login extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <View style={styles.inputGroup}>

              <H1 style={{textAlign: 'center', marginBottom: 70}}>APP NAME</H1>

              <Item floatingLabel style={styles.input}>
                <Label style={styles.label}>Email</Label>
                <Input />
              </Item>
            
            <Item floatingLabel style={styles.input}>
              <Label style={styles.label}>Password</Label>
              <Input secureTextEntry={true} />
            </Item>
          </View>

          <View style={styles.buttonGroup}>
            <Button full dark style={styles.button} onPress={() => this.props.navigation.navigate('LoggedIn')}>
              <Text> Login </Text>
            </Button>
            <Button full style={styles.button} onPress={() => this.props.navigation.navigate('VerifyMobile')}>
              <Text> Sign Up </Text>
            </Button>
          </View>
        </Form>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  inputGroup: {
    marginTop: hp('20%'),
    borderRadius: 15,
    padding: 0,
    
  },
  input: {
    paddingBottom: 5,
    borderRadius: 5,
    backgroundColor: 'rgba(173, 216, 230, 1)',
    borderColor: 'transparent',
    justifyContent: 'center',
  },
  buttonGroup: {
    marginTop: hp('10%'),
  },
  button: {
    margin: 10,
    borderRadius: 10
  },
  label: {
    marginLeft: 10,
    color: 'rgba(0,0,0, 0.9)',
  }
})