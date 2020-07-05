import {StackNavigationProp} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {RouteProp} from '@react-navigation/native';
import {AppRoute} from './AppRoute';
import {
  TabsNavigatorParams,
  SettingNavigatorParams,
  LocationNavigatorParams
} from './AppParamList';

// BottomTabs
export type HomeTabNavigationProp = BottomTabNavigationProp<TabsNavigatorParams, AppRoute.HOMESCREEN>;
export type SettingTabNavigationProp = BottomTabNavigationProp<TabsNavigatorParams, AppRoute.SETTING>;
export type LocationTabNavigationProp = BottomTabNavigationProp<TabsNavigatorParams, AppRoute.LOCATION>;
