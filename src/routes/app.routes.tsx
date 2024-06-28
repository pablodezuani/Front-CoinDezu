import { createNativeStackNavigator } from "@react-navigation/native-stack";

import home from "../pages/home";
import box from "../pages/box";
import Trips from "../pages/trips";
import GoalDetailScreen from "../pages/GoalDetailScreen";
import expenses from "../pages/expenses";
import DetalhesScreen from "../pages/detalhesdespesas";

const Stack = createNativeStackNavigator();
 function AppRoutes(){

return(
<Stack.Navigator>
   < Stack.Screen
    name="home"
    component={home}
    options={{headerShown: false}}
    />
	
	<Stack.Screen
    name="box"
    component={box}
    options={{headerShown: false}}
    />

<Stack.Screen
    name="Trips"
    component={Trips}
    options={{headerShown: false}}
    />
    
    <Stack.Screen
    name="GoalDetailScreen"
    component={GoalDetailScreen}
    options={{headerShown: false}}
    />

<Stack.Screen
    name="expenses"
    component={expenses}
    options={{headerShown: false}}
    />

<Stack.Screen
    name="DetalhesDespesas"
    component={DetalhesScreen}
    options={{headerShown: false}}
    />

</Stack.Navigator>

)
}

export default AppRoutes;


