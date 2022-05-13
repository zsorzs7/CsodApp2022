import * as React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {AcHomeScreen} from "../screens";
import {AcProgressScreen} from "../screens/AcProgressScreen";
import {AcSettingsScreen} from "../screens/AcSettingsScreen";

const Stack = createStackNavigator();

export const AcStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'red'}}}
        >
            <Stack.Screen name="Home" component={AcHomeScreen} options={{animationEnabled: false}} />
            <Stack.Screen name="Progress" component={AcProgressScreen} options={{animationEnabled: false}} />
            <Stack.Screen name="Settings" component={AcSettingsScreen} options={{animationEnabled: false}} />
        </Stack.Navigator>
    );
};
