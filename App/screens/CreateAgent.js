import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Image, Alert, ActivityIndicator } from 'react-native';
//UI
import { Container, Button, Text, Picker, Content, Form, Input, Label, Item, Title, Body, Left, Right, Icon, Card, CardItem, Thumbnail, H2 } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import HeaderExport from '../components/Header';
//styles
import commonStyles from '../common/CommonStyles';
//constants
import { baseUrl } from '../common/Constants';
//functionalities
import AsyncStorage from '@react-native-community/async-storage';

export default class CreateAgent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ID: '',
            firstName: '',
            lastName: '',
            mobile: '',
            email: '',
        }
    }

    async componentDidMount() {
        const userId = await AsyncStorage.getItem('@vh_id');
        if (userId) {
            alert(userId);
          this.setState({
            ID: userId
          });
        }
    }

    postData = () => {
        let {firstName, lastName, mobile, email, ID} = this.state;

        if(firstName == '' || lastName == '' || mobile == '') {
            alert('Field cannot be empty');
            return;
        }

        if(mobile.length != 10) {
            alert('Enter a valid 10-digit mobile number');
            return;
        }
        this.setState({posting: true});
        let password = mobile.substr(mobile.length - 6);
        let url = `${baseUrl}/vr/api/addUserData.php?name=${firstName} ${lastName}&mobile=${mobile}&email=${email}&password=${password}&userType=2&ownerID=${ID}`;
        console.log(url);
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if(response.status == 201) {
                alert('Agent account has been created.');
                this.props.navigation.navigate('Home')
                return response.json();
            }    
        })
        .then((resposeJson) => {
            let id = resposeJson.ID;
            console.log(id);
        })
        .catch((error) => {
            alert(error);
            this.setState({posting: false});
        })
    }

    render() {
        let {firstName, lastName, mobile, email, posting} = this.state;
        return (
            <Container>
                <HeaderExport screenName="Create Agent" subTitle="Enter the details" navigation={this.props.navigation} />
                <Content style={commonStyles.container}>
                    <Form>
                    <Item rounded style={commonStyles.formElement}>
                            <Input 
                                placeholder='First Name' 
                                value={firstName}
                                onChangeText={value => this.setState({ firstName: value })}
                            />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Input 
                                placeholder='Last Name' 
                                value={lastName}
                                onChangeText={value => this.setState({ lastName: value })}
                            />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Input 
                                placeholder='Email' 
                                value={email}
                                onChangeText={value => this.setState({ email: value })}
                            />
                        </Item>
                        <Item rounded style={commonStyles.formElement}>
                            <Input 
                                placeholder='10-digit mobile number' 
                                value={mobile}
                                keyboardType='number-pad'
                                onChangeText={value => this.setState({ mobile: value })}
                            />
                        </Item>
                        <Button disabled={posting} rounded primary block onPress={() => this.postData()} style={commonStyles.formElement}>
                            {posting? <ActivityIndicator color='white' size='large'/>:<Text>Create Agent</Text>}
                        </Button>

                        <View style={{borderWidth: 1, borderColor: 'red', width: wp('90%'), borderRadius: 5}}>
                        <Text style={{fontSize: 18, textAlign: 'center'}}>NOTE: On adding an agent, the agent can login using the above mobile number and 'last 6 digits of mobile number' as password.</Text>
                        </View>
                    </Form>
                </Content>
            </Container>

        );
    }
}