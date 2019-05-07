import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, Alert } from 'react-native';
//UI
import { Container, Button, Text, Form, Input, Label, Item, Title, Body, Left, Right, Icon, Card, CardItem, Thumbnail } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import HeaderExport from '../components/Header';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: this.props.navigation.getParam('ID', '99'),
        }
        alert(this.state.ID)
    }
    render() {
        return (
            <Container>
                <HeaderExport screenName="Your Vehicles" navigation={this.props.navigation} />
                <FlatList
                    data={dataSource}
                    renderItem={({ item, index }) =>
                        <Card >
                            <CardItem button onPress={() => this.props.navigation.navigate('VehicleDetails')}>
                                <View style={{backgroundColor: 'white', borderRadius: 10}}>
                                    <Image source={{ uri: item.photoUrl }} style={{ height: 100, width: 100, borderRadius: 10, marginRight: 10 }} />
                                </View>
                                <Body>
                                    <Text uppercase>{item.vehicleNumber}</Text>
                                    <Text note>Hours Worked: {item.totalHours}</Text>
                                    <Text note>Driver Name: {item.driverName}</Text>
                                    <Text note>Driver Number: {item.driverNumber}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    }
                    keyExtractor={item => item.id}
                />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    imageView: {
        width: wp('10%'),
        height: hp('10%'),
        margin: 7,
        borderRadius: 7
    }
})

const dataSource = [
    {
        id: '12',
        photoUrl: 'https://borewelltrichy.com/images/drilling.png',
        vehicleNumber: "KA 19 PN 9076",
        driverName: "Rajesh",
        driverNumber: "7656755434",
        totalHours: "16",
    },
    {
        id: '13',
        photoUrl: 'http://www.citytruckdriving.com/img/pics/frontend_img.png',
        vehicleNumber: "KA 22 G 9016",
        driverName: "Edwin",
        driverNumber: "9876544980",
        totalHours: "36",
    },
    {
        id: '14',
        photoUrl: 'https://borewelltrichy.com/images/drilling.png',
        vehicleNumber: "KA 14 PE 1564",
        driverName: "Claymore",
        driverNumber: "7656798766",
        totalHours: "112",
    }
];