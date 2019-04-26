import { createAppContainer, createStackNavigator, createDrawerNavigator, createSwitchNavigator } from "react-navigation";
//components
import SideMenu from './components/SideMenu';
//UI
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//screens
import Login from './screens/Login';
import Home from './screens/Home';
import VehicleDetails from "./screens/VehicleDetails";
import AddVehicle from "./screens/AddVehicle";
import CreateAgent from "./screens/CreateAgent";
import VehicleKYC from "./screens/VehicleKYC";
import Signup from "./screens/Signup";
import VerifyMobile from "./screens/VerifyMobile";

const LoginStack = createStackNavigator({
  Login: { screen: Login},
  Signup: Signup,
  VerifyMobile: VerifyMobile
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
   //for navigation
   "VehicleDetails": VehicleDetails,
   "AddVehicle": AddVehicle,
   "CreateAgent": CreateAgent,
   "VehicleKYC": VehicleKYC
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