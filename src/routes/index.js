import React from "react";
import { View, ActivityIndicator } from 'react-native';
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { useContext } from 'react';
import {AuthContext} from '../contexts/AuthContext'

function  Routes(){
const {isAuthenticated,loading} = useContext(AuthContext);


if(loading)
return(
    <View style={{ flex:1,
    backgroundColor:'FFFFFF',
    justifyContent:'center',
    alignItems:'center'
    }}>
        <ActivityIndicator size={60} color="red"/>
    </View>
)


return(
isAuthenticated ? <AppRoutes/> : <AuthRoutes/>

)

}

export default Routes;