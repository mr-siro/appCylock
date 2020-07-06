import React from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';
import {Metrics, Colors} from '@shared';

export const ArrowDash = () => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Icon
        color={Colors.Gray}
        type={'material-community'}
        name={'window-minimize'}
      />
      <Icon
        color={Colors.Gray}
        type={'material-community'}
        name={'window-minimize'}
      />
      <Icon
        color={Colors.Gray}
        type={'material-community'}
        name={'arrow-right-bold'}
      />
    </View>
  );
};
