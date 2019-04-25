import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, ScrollView } from 'react-native';
//UI
import { Container, List, ListItem, Button, Text, Form, Input, Label, Item, Title, Body, Left, Right, Icon, Card, CardItem, Thumbnail, H1, H3 } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import HeaderExport from '../components/Header';

export default class VehicleDetails extends Component {
    render() {
        return (
            <Container>
                <HeaderExport screenName="Vehicle Details" subTitle={details.vehicleNumber} navigation={this.props.navigation} />
                <Image source={{ uri: details.photoUrl }} style={{ height: hp('30%'), width: wp('100%') }} />
                <ScrollView>
                <List>
                    <ListItem first>
                        <H3>Driver Details</H3>
                    </ListItem>
                    <ListItem>
                        <Text><Text note>Driver Name: <Text>{details.driverName}</Text></Text></Text>
                    </ListItem>
                    <ListItem last>
                        <Text note>Driver Number: <Text selectable>{details.driverNumber}</Text></Text>
                    </ListItem>
                    <ListItem first>
                        <H3>Vehicle Details</H3>
                    </ListItem>
                    <ListItem >
                        <Text note>Type Of Vehicle: <Text>{details.typeOfVehicle}</Text></Text>
                    </ListItem>
                    <ListItem >
                        <Text note>Total Hours In Work: <Text>{details.totalHours}</Text></Text>
                    </ListItem>
                    <ListItem>
                        <Text note>Model Year: <Text>{details.modelYear}</Text></Text>
                    </ListItem>
                    <ListItem last>
                        <Text note>Model Name: <Text>{details.modelName}</Text></Text>
                    </ListItem>
                </List>
                </ScrollView>
            </Container>
        );
    }
}

const details = {
    photoUrl: 'https://borewelltrichy.com/images/drilling.png',
    vehicleNumber: "KA 19 PN 9076",
    driverName: "Rajesh",
    driverNumber: "7656755434",
    totalHours: "16",
    modelName: "Deep Driller",
    modelYear: "2005",
    typeOfVehicle: "Driller"
}