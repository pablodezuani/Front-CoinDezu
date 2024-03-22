import { createNativeStackNavigator } from "@react-navigation/native-stack";
import login from "../pages/login";
import welcome from "../pages/welcome";
import principal from "../pages/principal";
import ForgotPasswordScreen from "../pages/reset";
import Create from "../pages/create";
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
    name="principal"
    component={principal}
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