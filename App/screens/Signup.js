import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, Alert } from 'react-native';
//UI
import { Container, Button, Text, Picker, Content, Form, Input, Label, Item, Title, Body, Left, Right, Icon, Card, CardItem, Thumbnail, Header } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import HeaderExport from '../components/Header';
//styles
import commonStyles from '../common/CommonStyles';

export default class Signup extends Component {
    render() {
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
                            <Input placeholder='First Name' />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Input placeholder='Last Name' />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Input placeholder='Email' />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Input placeholder='Mobile' />
                        </Item>
                        <Button rounded primary block onPress={() => this.props.navigation.navigate('LoggedIn')} style={commonStyles.formElement}>
                            <Text>Signup</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}
