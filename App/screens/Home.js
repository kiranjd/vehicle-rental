import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, Alert, ActivityIndicator } from 'react-native';
//UI
import { Container, Button, Text, Form, Input, Label, Item, Title, Body, Left, Right, Icon, Card, CardItem, Thumbnail, H1, H3 } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import HeaderExport from '../components/Header';
//constants
import { baseUrl } from '../common/Constants';
//functionalities
import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            dataSource: [],
            isLoading: true
        }
        //alert(this.state.ID)
    }

    async componentWillMount() {
        const userId = await AsyncStorage.getItem('@vh_id');
        if (userId) {
            //alert(userId);
          this.setState({
            ID: userId
          });
        }

        let url = `${baseUrl}/vr/api/getVehicleInfo.php?id=${this.state.ID}`;
        console.log(url);

        fetch(url, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              if (response.status == 200) {
                  this.setState({isLoading: false});
                    return response.json();
              }
              else {
                  this.setState({isLoading: false});
              }
            })
            .then((resposeJson) => {
                console.log(resposeJson);
              this.setState({dataSource: resposeJson})
            })
            .catch(error => {
                alert(error);
                this.setState({isLoading: false});  
            })
    }

    render() {
        let { dataSource, isLoading, ID } = this.state;
        if(isLoading) {
            return (
                <Container>
                    <HeaderExport screenName="Your Vehicles" navigation={this.props.navigation} />
                    <ActivityIndicator color="blue" size="large" style={{marginTop: hp('35%')}}/>
                </Container>
            );
        }
        if(!isLoading && dataSource.length == 0) {
            return (
            <Container>
                <HeaderExport screenName="Your Vehicles" navigation={this.props.navigation} />
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AddVehicle', {ID: ID})}>
                    <H3 color="black" style={{marginTop: hp('35%'), textAlign: 'center'}}>No vehicles added. Click here to add your vehicles</H3>
                </TouchableOpacity>
            </Container>
            );
        }
        return (
            <Container>
                <HeaderExport screenName="Your Vehicles" navigation={this.props.navigation} />
                <FlatList
                    data={dataSource}
                    renderItem={({ item, index }) =>
                        <Card >
                            <CardItem button onPress={() => this.props.navigation.navigate('VehicleDetails', {id: item.id})}>
                                <View style={{backgroundColor: 'white', borderRadius: 10}}>
                                    <Image source={{ uri: item.imagePath }} style={{ height: 100, width: 100, borderRadius: 10, marginRight: 10 }} />
                                </View>
                                <Body><Text uppercase>{item.regNo}</Text>
                                <View style={{flexDirection: 'row'}}>
                                <Text note>Hours Worked:</Text> 
                                     <Text>{item.hoursWorked? item.hoursWorked: 0}</Text>    
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                    <Text note>Driver Name:</Text> 
                                    <Text>{item.driverName}</Text>
                                    </View>
                                    <View style={{flexDirection: 'row'}}>
                                    <Text note>Driver Mobile:</Text> 
                                    <Text>{item.driverMobile}</Text>
                                    </View>
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

const dataSource1 = [
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