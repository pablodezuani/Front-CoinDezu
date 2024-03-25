import { createNativeStackNavigator } from "@react-navigation/native-stack";
import login from "../pages/login";
import welcome from "../pages/welcome";
import home from "../pages/home";
import ForgotPasswordScreen from "../pages/reset";
import Create from "../pages/create";
import box from "../components/box";
const Stack = createNativeStackNavigator();
export default function Routes(){

return(

<Stack.Navigator>
    <Stack.Screen
    name="welcome"
    component={welcome}
    options={{headerShown: false}}
    />

<Stack.Screen
    name="login"
    component={login}
    options={{headerShown: false}}
    />

<Stack.Screen
    name="home"
    component={home}
    options={{headerShown: false}}
    />


<Stack.Screen
    name="ForgotPasswordScreen"
    component={ForgotPasswordScreen}
    options={{headerShown: false}}
    />

<Stack.Screen
    name="Create"
    component={Create}
    options={{headerShown: false}}
    />

<Stack.Screen
    name="box"
    component={box}
    options={{headerShown: false}}
    />
</Stack.Navigator>

)

box
}