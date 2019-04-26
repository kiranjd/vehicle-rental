import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, Alert } from 'react-native';
//UI
import { Container, Button, Text, Picker, Content, Form, Input, Label, Item, Title, Body, Left, Right, Icon, Card, CardItem, Thumbnail, Header } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import HeaderExport from '../components/Header';
//styles
import commonStyles from '../common/CommonStyles';

export default class VerifyMobile extends Component {
    constructor() {
        super();
        this.state = {
            OTPSent: false,
            numberVerified: false
        }
    }
    sendOTP() {
        let {OTPSent, numberVerified } = this.state;
        if(!OTPSent) {
        return (
            <Form>
            <Item rounded style={commonStyles.formElement}>
                <Input placeholder='Mobile' />
            </Item>
            <Button rounded primary block style={commonStyles.formElement} 
                onPress={() => {
                    this.setState({OTPSent: true});
                    alert('OTP Sent');
                    }} >
                <Text>Send OTP</Text>
            </Button>
        </Form>
        );
        }
        else {
            return (
                <Form>
                <Item rounded style={commonStyles.formElement}>
                    <Input placeholder='Enter the OTP' />
                </Item>
                <Button rounded primary block style={commonStyles.formElement} 
                onPress={() => {
                    this.setState({numberVerified: true});
                    //alert('Number has been successfully verified');
                    this.props.navigation.navigate('Signup');
                    }} >
                    <Text>Continue</Text>
                </Button>
            </Form>
            );
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button onPress={() => this.props.navigation.navigate('Login')}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Verify Mobile Number</Title>
                    </Body>
                </Header>
                <Content style={commonStyles.container}>
                    {this.sendOTP()}
                </Content>
            </Container>
        );
    }
}