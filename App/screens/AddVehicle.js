import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, Picker, Alert, ActivityIndicator } from 'react-native';
//UI
import { Container, Button, Text, Content, Form, Input, Label, Item, Title, Body, Left, Right, Icon, Card, CardItem, Thumbnail } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import HeaderExport from '../components/Header';
//styles
import commonStyles from '../common/CommonStyles';
//functionalities
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
//constants
import { baseUrl } from '../common/Constants';

const options = {
    title: 'Vehicle Image',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

export default class AddVehicle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            avatarSource: null,
            regNo: '',
            vehicleType: '',
            modelName: '',
            modelYear: '',
            driverName: '',
            driverNo: '',
            imageSource: '',
            data: '',
            posting: false
        }
    }
    
    async componentWillMount() {
        const userId = await AsyncStorage.getItem('@vh_id');
        if (userId) {
            //alert(userId);
          this.setState({
            id: userId
          });
        }
      }

    addVehicle = () => {
        this.setState({posting: true});
        let { regNo, vehicleType, modelName, modelYear, driverName, driverNo, id } = this.state;

        if(regNo == '' || modelName == '' || modelYear == '' || driverName == '' || driverNo == '') {
            alert('Fields cannot be empty. Make sure you have filled all the details');
            return;
        }

        if(driverNo.length != 10) {
            alert('Enter a valid mobile number');
            return;
        }

        let url = `${baseUrl}/vr/api/addVehicle.php?id=${id}&regNo=${regNo}&vehicleType=${vehicleType}&modelName=${modelName}&modelYear=${modelYear}&driverName=${driverName}&driverNo=${driverNo}`;
        console.log(url);
        fetch(url, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.status == 201) {
                  return response.json();
            }
          })
            .then(responseJson => {
                console.log(responseJson);
                if (true) {
                    let vehicleId = responseJson.id;
                    
                    console.log(vehicleId);
                    let url = `${baseUrl}/vr/api/imageUpload.php`;
                    alert(url);
                    console.log('Image upload Url:', url);
                    
                    RNFetchBlob.fetch('POST', url, {
                      'Content-Type': 'multipart/form-data',
                    }, [
                        { name: 'image', filename: 'image.png', type: 'image/png', data: this.state.data },
                        { name: 'imageType', data: 'VehicleImageID' },
                        { name: 'id', data: vehicleId }
                      ]).then((resp) => {
                            this.setState({posting: false});
                 
                      }).catch((err) => {
                        // ...
                      })

                    Alert.alert(
                        'Your vehicle has been added',
                        '',
                        [
                            { text: 'OK', onPress: () => this.props.navigation.navigate('Home', {id: id}) },
                        ],
                        { cancelable: false },
                    );

                }
            })
    }

    showImage() {
        const imageSource = this.state.avatarSource;
        if (imageSource) {
            return (
                <TouchableOpacity onPress={() => this.pickImage()} >
                    <Image source={this.state.avatarSource} style={commonStyles.imagePicker} />
                </TouchableOpacity>
            );
        }
        else {
            return (
                <TouchableOpacity style={commonStyles.imagePicker} onPress={() => this.pickImage()}>
                    <Text style={{ textAlign: 'center', color: 'rgba(0,0,0,0.6)' }}>Click to add or capture vehicle image</Text>
                    <View>
                        <Icon name='add' style={{ fontSize: 50, color: 'rgba(0,0,0,0.3)' }} />
                    </View>
                </TouchableOpacity>
            );
        }
    }

uploadImageToServer = () => {

 
  }

    pickImage() {
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                this.setState({
                    ImageSource: source,
                    data: response.data,
                    avatarSource: source  
                  });
            }
        });
    }

    render() {
        let { id, avatarSource, regNo, vehicleType, modelName, modelYear, driverName, driverNo, posting } = this.state;
        //console.log(this.state.avatarSource);
        const imageSource = this.state.avatarSource? this.state.avatarSource: '';
        return (
            <Container>
                <HeaderExport screenName="Add Vehicle" subTitle="Enter the details" navigation={this.props.navigation} />
                <Content style={commonStyles.container}>
                    <Form>
                        <Item rounded style={commonStyles.formElement}>
                            <Input
                                placeholder='Vehicle Registration Number'
                                value={regNo}
                                onChangeText={value => this.setState({ regNo: value })}
                                returnKeyType='next'
                            />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Picker
                                selectedValue={this.state.vehicleType}
                                style={{ height: 50, width: wp('90%') }}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.setState({ vehicleType: itemValue })
                                }>
                                <Picker.Item label="Choose Vehicle Type" value="0" />
                                <Picker.Item label="Borewell" value="1" />
                                <Picker.Item label="Harvester" value="2" />
                                <Picker.Item label="JCB" value="3" />
                                <Picker.Item label="Tractor" value="4" />
                                <Picker.Item label="Others" value="5" />
                            </Picker>
                        </Item>

                        <Item rounded style={commonStyles.formElement}>
                            <Input
                                placeholder='Model Name'
                                value={modelName}
                                onChangeText={value => this.setState({ modelName: value })}
                            />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Input
                                placeholder='Model Year'
                                keyboardType='number-pad'
                                value={modelYear}
                                onChangeText={value => this.setState({ modelYear: value })}
                            />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Input
                                placeholder='Driver Name'
                                value={driverName}
                                onChangeText={value => this.setState({ driverName: value })}
                            />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Input
                                placeholder='Driver Number(10-digit mobile number)'
                                keyboardType='number-pad'
                                value={driverNo}
                                onChangeText={value => this.setState({ driverNo: value })}
                            />
                        </Item>
                        {this.showImage()}
                        <Button rounded primary block onPress={this.addVehicle}
                            style={commonStyles.formElement}>
                            <Text>Add Vehicle</Text><ActivityIndicator size="large" color="#fff" animating={posting}/>
                        </Button>

                        
                    </Form>
                </Content>
            </Container>
        );
    }
}