import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Switch,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {CheckBox, Button, Icon} from 'react-native-elements';
import {Images} from '@assets';
import {Metrics, Colors} from '@shared';
import {MainHeader} from '@components';
import {listDevices} from '@services';
import {styles} from '../../styles';
import Modal from 'react-native-modal';
import ProgressCircle from 'react-native-progress-circle';
import GroupButton from '../../components/buttonGroup';
import {ArrowDash} from '../../components/arrowDash';

export const ScheduleTab = React.memo(() => {
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const listButton = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  return (
    <View>
      <Text style={{fontSize: Metrics.FontSize.h6, textAlign: 'center'}}>
        {'Select days to block'}
      </Text>
      <GroupButton
        listButton={listButton}
        containerStyle={{
          borderColor: 'white',
          borderWidth: 0,
          marginVertical: Metrics.spacing.huge,
        }}
      />
      <Text style={{fontSize: Metrics.FontSize.h6, textAlign: 'center'}}>
        {'Set time block'}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: Metrics.spacing.huge,
        }}>
        <ProgressCircle
          percent={parseInt(timeStart) / 0.12}
          radius={50}
          borderWidth={8}
          color={Colors.Primary}
          shadowColor={Colors.Gray}
          bgColor="#fff">
          <TextInput
            keyboardType={'number-pad'}
            value={timeStart}
            onChangeText={(value) => setTimeStart(value)}
            style={{
              width: 50,
              color: Colors.Primary,
              fontSize: Metrics.FontSize.h3,
              textAlign: 'center',
            }}
          />
          <Text style={{color: Colors.Primary, fontSize: Metrics.FontSize.h3}}>
            PM
          </Text>
        </ProgressCircle>
        <ArrowDash />
        <ProgressCircle
          percent={parseInt(timeEnd) / 0.12}
          radius={50}
          borderWidth={8}
          color={Colors.Primary}
          shadowColor={Colors.Gray}
          bgColor="#fff">
          <TextInput
            keyboardType={'number-pad'}
            value={timeEnd}
            onChangeText={(value) => setTimeEnd(value)}
            style={{
              width: 50,
              color: Colors.Primary,
              fontSize: Metrics.FontSize.h3,
              textAlign: 'center',
            }}
          />
          <Text style={{color: Colors.Primary, fontSize: Metrics.FontSize.h3}}>
            AM
          </Text>
        </ProgressCircle>
      </View>
    </View>
  );
});
