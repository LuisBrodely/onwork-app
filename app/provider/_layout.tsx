import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import Constants from "expo-constants";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const Layout = () => {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#fff",
          paddingTop: Constants.statusBarHeight + 10,
        },
        tabBarActiveTintColor: "#EF3166",
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "500",
          textTransform: "capitalize",
        },
        tabBarInactiveTintColor: "#4D4D4D",
        tabBarIndicatorStyle: { backgroundColor: "#EF3166", height: 3 },
      }}
    >
      <MaterialTopTabs.Screen name="home" options={{ title: "Perfil" }} />
      <MaterialTopTabs.Screen
        name="services"
        options={{ title: "Servicios" }}
      />
      <MaterialTopTabs.Screen
        name="valorations"
        options={{ title: "Opiniones" }}
      />
    </MaterialTopTabs>
  );
};

export default Layout;
