import { createNativeStackNavigator } from "@react-navigation/native-stack";
import login from "../pages/login";
import welcome from "../pages/welcome";
import ForgotPasswordScreen from "../pages/reset";
import Create from "../pages/create";

const Stack = createNativeStackNavigator();
 function AuthRoutes(){

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
    name="ForgotPasswordScreen"
    component={ForgotPasswordScreen}
    options={{headerShown: false}}
    />

<Stack.Screen
    name="Create"
    component={Create}
    options={{headerShown: false}}
    />

</Stack.Navigator>

)
}

export default AuthRoutes;


