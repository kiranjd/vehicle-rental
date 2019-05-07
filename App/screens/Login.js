import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
//UI
import { Container, Button, Text, Form, Input, Label, Item, H1 } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//constants
import { baseUrl } from '../common/Constants';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '9880604765',
      password: '123456'
    }
  }

  validateUser = () => {
    let { mobile, password } = this.state;
    if (mobile.length < 10) {
      alert('Enter a 10-digit mobile number');
      return;
    }
    if (password.length < 6) {
      alert('Password should contain 6 charecters');
      return;
    }

    let url = `${baseUrl}/vr/api/login.php?mobile=${mobile}&password=${password}`;
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then((resposeJson) => {
        console.log(resposeJson.ID);
        this.props.navigation.navigate('Home', { ID: resposeJson.ID });
      })
  }
  render() {
    let { mobile, password } = this.state;
    return (
      <Container style={styles.container}>
        <Form>
          <View style={styles.inputGroup}>

            <H1 style={{ textAlign: 'center', marginBottom: 70 }}>Nandhi Enterprises</H1>

            <Item floatingLabel style={styles.input}>
              <Label style={styles.label}>Mobile</Label>
              <Input
                keyboardType='number-pad'
                value={mobile}
                onChangeText={value => this.setState({ mobile: value })}
              />
            </Item>

            <Item floatingLabel style={styles.input}>
              <Label style={styles.label}>Password</Label>
              <Input
                secureTextEntry
                value={password}
                onChangeText={value => this.setState({ password: value })}
              />
            </Item>
          </View>

          <View style={styles.buttonGroup}>
            <Button full dark style={styles.button} onPress={this.validateUser}>
              <Text> Login </Text>
            </Button>
            <Button full style={styles.button} onPress={() => this.props.navigation.navigate('Signup')}>
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