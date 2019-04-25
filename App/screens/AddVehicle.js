import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, Alert } from 'react-native';
//UI
import { Container, Button, Text, Picker, Content, Form, Input, Label, Item, Title, Body, Left, Right, Icon, Card, CardItem, Thumbnail } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import HeaderExport from '../components/Header';
//styles
import commonStyles from '../common/CommonStyles';
//functionalities
import ImagePicker from 'react-native-image-picker';

const options = {
    title: 'Vehicle Image',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  
export default class AddVehicle extends Component {
    constructor() {
        super();
        this.state = {
            avatarSource: null
        }
    }

    showImage() {
        const imageSource = this.state.avatarSource;
        if(imageSource) {
            return (
                <TouchableOpacity onPress={() => this.pickImage()} >
                <Image source={this.state.avatarSource} style={commonStyles.imagePicker}/>
                </TouchableOpacity>
            );
        }
        else {
            return (
                <TouchableOpacity style={commonStyles.imagePicker} onPress={() => this.pickImage()}>
                    <Text style={{textAlign: 'center', color: 'rgba(0,0,0,0.6)'}}>Click to add or capture vehicle image</Text>
                    <View>
                        <Icon name='add' style={{fontSize: 50, color: 'rgba(0,0,0,0.3)'}}/>
                    </View>
                </TouchableOpacity>
            );
        }
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
           
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
           
              this.setState({
                avatarSource: source,
              });
            }
          });
    }

    render() {
        //console.log(this.state.avatarSource);
        //const imageSource = this.state.avatarSource? this.state.avatarSource: '';
        return (
            <Container>
                <HeaderExport screenName="Add Vehicle" subTitle="Enter the details" navigation={this.props.navigation} />
                <Content style={commonStyles.container}>
                    <Form>
                        <Item rounded style={commonStyles.formElement}>
                            <Input placeholder='Vehicle Registration Number' />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Picker
                                mode="dropdown"
                                placeholder="Select your SIM"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                            //style={{ width: undefined }}
                            //selectedValue={this.state.selected}
                            //onValueChange={this.onValueChange.bind(this)}
                            >
                                <Picker.Item label="Type of vehicle" value="key0" />
                                <Picker.Item label="JCB" value="key1" />
                                <Picker.Item label="Bulldozer" value="key2" />
                                <Picker.Item label="Borewell" value="key3" />
                                <Picker.Item label="Driller" value="key4" />
                            </Picker>
                        </Item>

                        <Item rounded style={commonStyles.formElement}>
                            <Input placeholder='Model Number' />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Input placeholder='Model Year' />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Input placeholder='Driver Name' />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Input placeholder='Driver Number' />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Input placeholder='Model Number' />
                        </Item>
                        {this.showImage()}
                        <Button rounded primary block onPress={() => alert('Vehicle has been added')} style={commonStyles.formElement}>
                            <Text>Add Vehicle</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}