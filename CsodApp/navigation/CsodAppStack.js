import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { CsodAppListenScreen, CsodAppReadScreen, HomeScreen } from "../screens";
import { CsodAppHomeScreen } from "../screens";

const Stack = createStackNavigator();

export const CsodAppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="CsodAppHomeScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="CsodAppHomeScreen" component={CsodAppHomeScreen} />
      <Stack.Screen name="CsodAppReadScreen" component={HomeScreen} />
      <Stack.Screen name="CsodAppListenScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
};
