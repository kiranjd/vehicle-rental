import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, Alert } from 'react-native';
//UI
import { Container, Button, Text, Picker, Content, Form, Input, Label, Item, Title, Body, Left, Right, Icon, Card, CardItem, Thumbnail } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import HeaderExport from '../components/Header';
//styles
import commonStyles from '../common/CommonStyles';

export default class CreateAgent extends Component {
    render() {
        return (
            <Container>
                <HeaderExport screenName="Create Agent" subTitle="Enter the details" navigation={this.props.navigation} />
                <Content style={commonStyles.container}>
                    <Form>
                        <Item rounded style={commonStyles.formElement}>
                            <Input placeholder='First Name' />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Input placeholder='Last Name' />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Input placeholder='Mobile' />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Input placeholder='Email' />
                        </Item>
                        <Button rounded primary block onPress={() => alert('Agent has been created')} style={commonStyles.formElement}>
                            <Text>Create Agent</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>

        );
    }
}