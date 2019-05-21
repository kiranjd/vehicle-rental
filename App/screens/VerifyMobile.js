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
    constructor(props) {
        super(props);
        this.state = {
            codeSent: false,
            codeVerified: false,
            apiKey: 'f30710c9-6fe9-11e9-ade6-0200cd936042',
            sessionId: '',
            codeInput: '',
            phoneNumber: '+91'
        }
    }

    sendOTP() {
        let { codeSent, numberVerified, phoneNumber, codeInput } = this.state;
        if (!codeSent) {
            return (
                <Form>
                    <Item rounded style={commonStyles.formElement}>
                        <Input
                            placeholder='Mobile'
                            keyboardType="number-pad"
                            value={phoneNumber}
                            onChangeText={value => this.setState({ phoneNumber: value })}
                        />
                    </Item>
                    <Button rounded primary block style={commonStyles.formElement}
                        onPress={this.sendSMS} >
                        <Text>Send OTP</Text>
                    </Button>
                </Form>
            );
        }
        else {
            return (
                <Form>
                    <Item rounded style={commonStyles.formElement}>
                        <Input
                            placeholder='Enter the OTP'
                            keyboardType="number-pad"
                            value={codeInput}
                            onChangeText={value => this.setState({ codeInput: value })}
                        />
                    </Item>
                    <Button rounded primary block style={commonStyles.formElement}
                        onPress={this.confirmCode} >
                        <Text>Verify OTP</Text>
                    </Button>
                </Form>
            );
        }
    }

    sendSMS = () => {
        const { phoneNumber, apiKey } = this.state;
        let url = `https://2factor.in/API/V1/${apiKey}/SMS/${phoneNumber}/AUTOGEN`;
        //alert(url);
        //Alert.alert(url);
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.Status == 'Success') {
                    this.setState({ codeSent: true, sessionId: responseJson.Details })
                }
                console.log(responseJson.Status);
            })
    }

    confirmCode = () => {
        const { codeInput, sessionId, apiKey, phoneNumber } = this.state;

        let url = `https://2factor.in/API/V1/${apiKey}/SMS/VERIFY/${sessionId}/${codeInput}`;
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.Status == 'Success') {
                    Alert.alert(
                        'OTP verified',
                        'Press \'OK\' to continue...',
                        [
                            { text: 'OK', onPress: () => this.props.navigation.navigate('Signup', {phone: phoneNumber}) }
                        ]
                    )
                }
                else {
                    alert('Incorrect OTP. Please re-enter');
                }
                console.log(responseJson);
            })
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