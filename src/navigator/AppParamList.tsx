import {AppNavigatorParams} from './AppNavigator';
import {AppRoute} from './AppRoute';

export type TabsNavigatorParams = {
  [AppRoute.HOMESCREEN]: undefined;
  [AppRoute.SETTING]: undefined;
  [AppRoute.LOCATION]: undefined;
};

export type HomeNavigatorParams = {
  [AppRoute.HOMESCREEN]: undefined;
};

export type SettingNavigatorParams = {
  [AppRoute.SETTING]: undefined;
};

export type LocationNavigatorParams = {
  [AppRoute.LOCATION]: undefined;
};
