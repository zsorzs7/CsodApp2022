import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RootNavigator } from "./navigation/RootNavigator";
import { CsodAppNavigator } from "./navigation/CsodAppNavigator";
import { AuthenticatedUserProvider } from "./providers";

const App = () => {
  return (
    <SafeAreaProvider>
      <CsodAppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
