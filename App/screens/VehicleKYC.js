import React, { Component } from "react";
import { View, Image } from "react-native";
//UI
import {
	Container,
	Button,
	Text,
	Content,
	Form,
	Input,
	Item,
	Icon
} from "native-base";
import {
	TouchableOpacity
} from "react-native-gesture-handler";
import HeaderExport from "../components/Header";
//styles
import commonStyles from "../common/CommonStyles";
//constants
import { baseUrl } from "../common/Constants";
//functionalities
import ImagePicker from "react-native-image-picker";
import RNFetchBlob from "rn-fetch-blob";

export default class VehicleKYC extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vehicleId: this.props.navigation.getParam('vehicleId', '67'),
			avatarSourceRC: null,
			imageSourceRC: null,
			dataRC: "",
			avatarSourceDL: null,
			imageSourceDL: null,
			dataDL: "",
			avatarSourceAC: null,
			imageSourceAC: null,
			data: ""
		};
		//alert(this.state.vehicleId);
	}

	postAll() {
		this.setState({posting: true});
		this.uploadImage('RCImageID');
		this.uploadImage('AadharImageID');
		this.uploadImage('InsuranceImageID');
		this.props.navigation.navigate('Home');
	}

	uploadImage = imageType => {
		let {vehicleId} = this.state;
		let url = `${baseUrl}/vr/api/imageUpload.php`;
		//alert(url);
		//console.log('Image upload Url:', url);
		RNFetchBlob.fetch(
			"POST",
			url,
			{
				"Content-Type": "multipart/form-data"
			},
			[
				{
					name: "image",
					filename: "image.png",
					type: "image/png",
					data: this.state.data
				},
				{ name: "imageType", data: imageType },
				{ name: "id", data: vehicleId }
			]
		)
			.then(() => {
				alert('Uploaded successfully');
				this.setState({ posting: false });
			})
			.catch(err => {
				console.log(err);
			});
	};

	pickImage(type) {
		//this.uploadImage('vehicle');
		ImagePicker.showImagePicker(options(type), response => {
			console.log("Picker Response = ", response);

			if (response.didCancel) {
				console.log("User cancelled image picker");
			} else if (response.error) {
				console.log("ImagePicker Error: ", response.error);
			} else {
				const source = { uri: response.uri };
				if (type == 'RC') {
					//alert('ifrc');
					this.setState({
						ImageSourceRC: source,
						dataRC: response.data,
						avatarSourceRC: source
					});
				}
				if (type == 'DL') {
					//alert('ifdl');
					this.setState({
						ImageSourceDL: source,
						dataDL: response.data,
						avatarSourceDL: source
					});
				}
				if (type == 'AC') {
					//alert('ifac');
					this.setState({
						ImageSourceAC: source,
						dataAC: response.data,
						avatarSourceAC: source
					});
				}

		}
		});
	}

	showImage(source, type) {
		const imageSource = source;
		console.log(imageSource, type);
		if (imageSource) {
			return (
				<TouchableOpacity onPress={() => this.pickImage(type)}>
					<Image
						source={imageSource}
						style={commonStyles.imagePicker}
					/>
				</TouchableOpacity>
			);
		} else {
			return (
				<TouchableOpacity
					style={commonStyles.imagePicker}
					onPress={() => this.pickImage(type)}
				>
					<Text style={{ textAlign: "center", color: "rgba(0,0,0,0.6)" }}>
						Click to add or capture image
         			</Text>
					<View>
						<Icon
							name="add"
							style={{ fontSize: 50, color: "rgba(0,0,0,0.3)" }}
						/>
					</View>
				</TouchableOpacity>
			);
		}
	}

	render() {
		let {
			data,
			dataDL,
			dataRC,
			imageSourceAC,
			imageSourceDL,
			imageSourceRC,
			avatarSourceAC,
			avatarSourceDL,
			avatarSourceRC,
			posting
		} = this.state;
		//console.log('RC =', ava)
		return (
			<Container>
				<HeaderExport
					screenName="Vehicle KYC"
					subTitle="Upload images"
					navigation={this.props.navigation}
				/>
				<Content style={commonStyles.container}>
					<Form>
						<Text style={commonStyles.formElement}>Registation Certificate(RC)</Text>
						{this.showImage(avatarSourceRC, 'RC')}
						<Text style={commonStyles.formElement}>Aadhar Card</Text>
						{this.showImage(avatarSourceAC, 'AC')}
						<Text style={commonStyles.formElement}>Insurance</Text>
						{this.showImage(avatarSourceDL, 'DL')}
						{/* <Item rounded style={commonStyles.formElement}>
							<Input placeholder="PAN" />
						</Item> */}
						<Button
							rounded
							primary
							block
							disabled={this.state.posting}
							onPress={() => this.postAll()}
							style={commonStyles.formElement}
						>
							{posting? <ActivityIndicator color='white'/>:<Text>Add KYC details</Text>}
						</Button>
					</Form>
				</Content>
			</Container>
		);
	}
}

const options = type => {
	const options = {
		title: `Upload ${type} image`,
		storageOptions: {
			skipBackup: true,
			path: "images"
		}
	};
	return options;
};
