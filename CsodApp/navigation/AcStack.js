import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AcHomeScreen } from "../screens";

const Stack = createStackNavigator();

export const AcStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AcHomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AcHomeScreen" component={AcHomeScreen} />
    </Stack.Navigator>
  );
};
