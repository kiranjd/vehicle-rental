import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
//UI
import { Container, Button, Text, Form, Input, Label, Item, H1 } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//constants
import { baseUrl } from '../common/Constants';
//funtionalities
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
  constructor(props) {
    super(props);
    //this.props.navigation.navigate('AddVehicle');
    this.state = {
      mobile: '9880604765',
      password: 'asd123'
    }
  }

  async componentWillMount() {
    const userId = await AsyncStorage.getItem('@vh_id');
    if (userId) {
      this.setState({
        userId,
      });
      this.props.navigation.navigate('Home', {ID: userId});
    }
  }

  storeData = async (id) => {
    try {
      await AsyncStorage.setItem('@vh_id', `${id}`);
      console.log('set');
    } catch (e) {
      console.log(e);
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
    console.log(url);
    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        let id = responseJson.ID;
        this.storeData(id);
        this.props.navigation.navigate('Home', { ID: id });
      })
      .catch(error => alert(error))
  }
  render() {
    let { mobile, password } = this.state;
    return (
      <Container style={styles.container}>
        <Form>
          <View style={styles.inputGroup}>
            <View style={styles.logoContainer}>
              <Image source={require('../images/logo.png')} resizeMode='contain' style={styles.logo}/>
            </View>


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
  },
  logo: {
    width: 150, 
    height: 150
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  }
})