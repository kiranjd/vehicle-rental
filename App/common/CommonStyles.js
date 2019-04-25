import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const commonStyles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginHorizontal: wp('5%')
    },
    formElement: {
        marginBottom: wp('3.6%')
    },
    imagePicker: {
        width: wp('90%'),
        backgroundColor: '#d3d3d3',
        justifyContent: 'center',
        alignItems: 'center',
        height: hp('25%'),
        width: wp('50%'),
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: wp('3.6%')
    },
    roundedIcon: {
        borderRadius: 100 / 2,
        borderWidth: 2, 
    }
})

export default commonStyles;