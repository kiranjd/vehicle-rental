import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, Alert } from 'react-native';
//UI
import { Container, Button, Text, Picker, Content, Form, Input, Label, Item, Title, Body, Left, Right, Icon, Card, CardItem, Thumbnail, Header } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import HeaderExport from '../components/Header';
//styles
import commonStyles from '../common/CommonStyles';
//constants
import { baseUrl } from '../common/Constants';
//functionalities
import AsyncStorage from '@react-native-community/async-storage';

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            mobile: this.props.navigation.getParam('phone', '9709798799'),
            email: '',
            password: '',
            confirmPassword: ''
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
    
    postData = () => {
            let {firstName, lastName, mobile, email, password, confirmPassword} = this.state;
            if(password.length < 6) {
                alert('Password is too small. Choose a 6 charecter password');
            }
            if(password != confirmPassword) {
                alert('Password and confirm password do not match');
                return;
            }
            let url = `${baseUrl}/vr/api/signup.php?name=${firstName} ${lastName}&mobile=${mobile}&email=${email}&password=${password}&userType=1`;
            console.log(url);
            fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {
                if(response.status == 201) {
                    alert('Your account has been created');
                    return response.json();
                }    
            })
            .then((resposeJson) => {
                let id = resposeJson.ID;
                console.log(id);
                this.storeData(id);
                this.props.navigation.navigate('Home', {ID: id});
            })
        }
        
    render() {
        let {firstName, lastName, mobile, email, password, confirmPassword} = this.state;
        
        return (
            <Container>
                <Header>
                    <Left>
                        <Button onPress={() => this.props.navigation.navigate('VerifyMobile')}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Signup</Title>
                    </Body>
                </Header>
                <Content style={commonStyles.container}>
                    <Form>
                        <Item rounded style={commonStyles.formElement}>
                            <Input 
                                placeholder='First Name' 
                                value={firstName}
                                onChangeText={value => this.setState({ firstName: value })}
                            />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Input 
                                placeholder='Last Name' 
                                value={lastName}
                                onChangeText={value => this.setState({ lastName: value })}
                            />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Input 
                                placeholder='Email' 
                                value={email}
                                onChangeText={value => this.setState({ email: value })}
                            />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Input 
                                secureTextEntry
                                placeholder='Password' 
                                value={password}
                                onChangeText={value => this.setState({ password: value })}
                            />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Input 
                                secureTextEntry
                                placeholder='Confirm Password' 
                                value={confirmPassword}
                                onChangeText={value => this.setState({ confirmPassword: value })}
                            />
                        </Item>
                        <Button rounded primary block onPress={this.postData} style={commonStyles.formElement}>
                            <Text>Signup</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}
