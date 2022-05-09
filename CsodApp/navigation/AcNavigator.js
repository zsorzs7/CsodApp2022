import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AcStack } from "./AcStack";

export const AcNavigator = () => {
  return (
    <NavigationContainer>
      <AcStack />
    </NavigationContainer>
  );
};
