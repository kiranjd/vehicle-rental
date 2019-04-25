import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator } from "react-navigation";
//screens
import Login from './screens/Login';
import Home from './screens/Home';
//components
import SideMenu from './components/SideMenu';
//UI
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import VehicleDetails from "./screens/VehicleDetails";

const LoginStack = createStackNavigator({
  Login: { screen: Login},
}, {
      headerMode: 'none',
      navigationOptions: {
      headerVisible: false,
    }
   }
);

const MainStack = createDrawerNavigator({
  //visible
   Home: Home,
   "Add Vehicle": Home,
   "Create Agent": Home,
   "Update KYC": Home,
   //for navigation
   "VehicleDetails": VehicleDetails
}, {
  contentComponent: SideMenu,
  drawerWidth: wp('69%'),
}
);

const AppNavigator = createSwitchNavigator(
  {
    BeforeLogin: {
      screen: LoginStack,
    },
    
    LoggedIn: { 
      screen: MainStack,
    }
  }
);

export default createAppContainer(AppNavigator);