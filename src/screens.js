import {
  createStackNavigator,
  StackActions,
  NavigationActions,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import {
  componentWithNoHeader,
  componentWithHeader
} from "./styles/HeaderComponents";
import MoviesDashboard from "./components/MoviesDashboard";
import MovieDetails from "./components/MovieDetails";

const StackModalNavigator = (routeConfigs, navigatorConfig) => {
  const CardStackNavigator = createStackNavigator(
    routeConfigs,
    navigatorConfig
  );
  const modalRouteConfig = {};
  const routeNames = Object.keys(routeConfigs);

  for (let i = 0; i < routeNames.length; i++) {
    modalRouteConfig[`${routeNames[i]}Modal`] = routeConfigs[routeNames[i]];
  }

  const ModalStackNavigator = createStackNavigator(
    {
      CardStackNavigator: { screen: CardStackNavigator },
      ...modalRouteConfig
    },
    {
      headerMode: "none",
      mode: "modal"
    }
  );
  return ModalStackNavigator;
};

const NewUserStack = StackModalNavigator(
  {
    MoviesDashboard: {
      screen: MoviesDashboard,
      navigationOptions: componentWithNoHeader
    },
    MovieDetails: {
      screen: MovieDetails,
      navigationOptions: componentWithHeader
    }
  },
  {
    initialRouteName: "MoviesDashboard"
  }
);

export const AppContainer = createAppContainer(NewUserStack);
