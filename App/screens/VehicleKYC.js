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

export default class VehicleKYC extends Component {
    constructor() {
        super();
        this.state = {
            avatarSource: null
        }
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
                    <Text style={{ textAlign: 'center', color: 'rgba(0,0,0,0.6)' }}>Click to add or capture image</Text>
                    <View>
                        <Icon name='add' style={{ fontSize: 50, color: 'rgba(0,0,0,0.3)' }} />
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
        return (
            <Container>
                <HeaderExport screenName="Vehicle KYC" subTitle="Upload images" navigation={this.props.navigation} />
                <Content style={commonStyles.container}>
                    <Form>
                        <Text style={commonStyles.formElement}>Registation Certificate(RC)</Text>
                        {this.showImage()}
                        <Text style={commonStyles.formElement}>Aadhar Card</Text>
                        {this.showImage()}
                        <Text style={commonStyles.formElement}>Insurance</Text>
                        {this.showImage()}
                        <Item rounded style={commonStyles.formElement}>
                            <Input placeholder='PAN' />
                        </Item>
                        <Button rounded primary block onPress={() => alert('Agent has been created')} style={commonStyles.formElement}>
                            <Text>Add KYC details</Text>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}