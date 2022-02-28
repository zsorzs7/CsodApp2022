import React, { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CsodAppStack } from "./CsodAppStack";

export const CsodAppNavigator = () => {
  return (
    <NavigationContainer>
      <CsodAppStack />
    </NavigationContainer>
  );
};
