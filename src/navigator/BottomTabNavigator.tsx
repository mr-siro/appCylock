import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TabsNavigatorParams} from './AppParamList';
import {AppRoute} from './AppRoute';
import {Colors, Metrics} from '@shared';

import {HomeScreen, SettingScreen, LocationScreen} from '@screens';
import {Icon} from 'react-native-elements';

const BottomTab = createBottomTabNavigator<TabsNavigatorParams>();

export const BottomTabsNavigator = (): React.ReactElement => {
  return (
    <React.Fragment>
      <BottomTab.Navigator
        initialRouteName={AppRoute.HOMESCREEN}
        tabBarOptions={{
          activeTintColor: Colors.tabBar.Active,
          showLabel: false,
          tabStyle: styles.barStyle,
        }}>
        <BottomTab.Screen
          name={AppRoute.HOMESCREEN}
          component={HomeScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon
                name={'home'}
                type={'foundation'}
                color={color}
                size={Metrics.icons.medium}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name={AppRoute.SETTING}
          component={SettingScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon
                name={'gear'}
                type={'evilicon'}
                color={color}
                size={Metrics.icons.medium}
              />
            ),
          }}
        />
        <BottomTab.Screen
          name={AppRoute.LOCATION}
          component={LocationScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon
                name={'location'}
                type={'evilicon'}
                color={color}
                size={Metrics.icons.large}
              />
            ),
          }}
        />
      </BottomTab.Navigator>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  barStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
