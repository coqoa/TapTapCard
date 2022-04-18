import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack" 

import Login from "../screens/Login";
import Signup from "../screens/Signup";
import MenuStack from "./MenuStack";

const NativeStack = createNativeStackNavigator();

// 스택네비게이터 (Login, Signup, MenuStack을 Screen으로 가진다)
const Stack = () => {
    return(
    <NativeStack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}} >
        <NativeStack.Screen name="Login" component={Login} />
        {/* <NativeStack.Screen name="Signup" component={Signup} /> */}
    </NativeStack.Navigator>
    );
}
export default Stack;