import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {
  HomeNavigatorParams,
  SettingNavigatorParams,
  LocationNavigatorParams,
} from './AppParamList';
import {BottomTabsNavigator} from './BottomTabNavigator';
import {AppRoute} from './AppRoute';

type MainStackNavigatorProps = React.ComponentProps<typeof MainStack.Navigator>;

export type AppNavigatorParams = {
  [AppRoute.HOMESCREEN]: undefined;
} & HomeNavigatorParams &
  SettingNavigatorParams &
  LocationNavigatorParams;

const MainStack = createStackNavigator<AppNavigatorParams>();

export const AppNavigator = (
  props: Partial<MainStackNavigatorProps>,
): React.ReactElement => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={AppRoute.HOMESCREEN}
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        {...props}
        headerMode="none">
        <MainStack.Screen
          name={AppRoute.HOMESCREEN}
          component={BottomTabsNavigator}
          options={{gestureEnabled: false}}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};
