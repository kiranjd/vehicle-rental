import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, ScrollView, ActivityIndicator } from 'react-native';
//UI
import { Container, List, ListItem, Button, Text, Form, Input, Label, Item, Title, Body, Left, Right, Icon, Card, CardItem, Thumbnail, H1, H3 } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import HeaderExport from '../components/Header';
//styles
import commonStyles from "../common/CommonStyles";
//constants
import { baseUrl } from '../common/Constants';

export default class VehicleDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vehicleId: this.props.navigation.getParam('id', 'none'),
            isLoading: true
        };
        //alert(this.state.vehicleId)
    }

    componentDidMount() {
        let url = `${baseUrl}/vr/api/getVehicle.php?id=${this.state.vehicleId}`;
        console.log(url);

        fetch(url, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
          .then(response => response.json())
          .then(responseJson => {
              this.setState({
                  isLoading: false,
                  regNo: responseJson[0].regNo,
                  modelName: responseJson[0].modelName,
                  modelYear: responseJson[0].modelYear,
                  driverName: responseJson[0].driverName,
                  driverMobile: responseJson[0].driverMobile,
                  hoursWorked: responseJson[0].hoursWorked,
                  imagePath: responseJson[0].imagePath
              })
          })
    }
    render() {
        let {regNo, vehicleId, modelName, modelYear, driverName, driverMobile, hoursWorked, imagePath, isLoading} = this.state;
        if(isLoading) {
            return (
                <Container>
                    <HeaderExport screenName="Vehicle Details" subTitle={regNo} navigation={this.props.navigation} />
                    <ActivityIndicator color="blue" size="large" style={{marginTop: hp('35%')}}/>
                </Container>
            );
        }
        return (
            <Container>
                <HeaderExport screenName="Vehicle Details" subTitle={regNo} navigation={this.props.navigation} />
                <Image source={{ uri: imagePath }} style={{ height: hp('30%'), width: wp('100%') }} />
                <View style={{height: 10}}/>
                <Button
							rounded
							primary
							onPress={() => this.props.navigation.navigate('VehicleKYC', {vehicleId: vehicleId})}
							style={commonStyles.formElement}
						>
							<Text>Click here to add vehicle's KYC details</Text>
						</Button>
                <ScrollView>
                <List>
                    <ListItem first>
                        <H3>Driver Details</H3>
                    </ListItem>
                    <ListItem>
                        <Text><Text note>Driver Name: <Text>{driverName}</Text></Text></Text>
                    </ListItem>
                    <ListItem last>
                        <Text note>Driver Number: <Text selectable>{driverMobile}</Text></Text>
                    </ListItem>
                    <ListItem first>
                        <H3>Vehicle Details</H3>
                    </ListItem>
                    {/* <ListItem >
                        <Text note>Type Of Vehicle: <Text>{typeOfVehicle}</Text></Text>
                    </ListItem> */}
                    <ListItem >
                        <Text note>Total Hours In Work: <Text>{hoursWorked}</Text></Text>
                    </ListItem>
                    <ListItem>
                        <Text note>Model Year: <Text>{modelYear}</Text></Text>
                    </ListItem>
                    <ListItem last>
                        <Text note>Model Name: <Text>{modelName}</Text></Text>
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