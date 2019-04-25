import React, { Component } from 'react';
import { Container, Button, Text, Form, Input, Label, Item, Title, Header, Body, Left, Right, Icon, Subtitle, View, Content } from 'native-base';
import { TouchableOpacity } from 'react-native';

export default class HeaderExport extends Component {
    render() {
        return (
            <Header>
                <Left>
                    <Button onPress={() => this.props.navigation.toggleDrawer()}>
                        <Icon name='menu' />
                    </Button>
                </Left>
                <Body>
                    <Title>{this.props.screenName}</Title>
                    {this.props.subTitle? <Subtitle>{this.props.subTitle}</Subtitle>: <Text style={{height:0}}></Text>}
                </Body>
                <Right>
                        <Button onPress={() => this.props.navigation.navigate('Home')}>
                            <Icon name='home' />
                        </Button>
                </Right>
            </Header>
        );
    }
}
