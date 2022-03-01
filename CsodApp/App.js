import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RootNavigator } from "./navigation/RootNavigator";
import { CsodAppNavigator } from "./navigation/CsodAppNavigator";
import { AuthenticatedUserProvider } from "./providers";
import { StoreProvider } from "easy-peasy";
import store from "./store/store";

const App = () => {
  return (
    <StoreProvider store={store}>
      <SafeAreaProvider>
        <CsodAppNavigator />
      </SafeAreaProvider>
    </StoreProvider>
  );
};

export default App;
