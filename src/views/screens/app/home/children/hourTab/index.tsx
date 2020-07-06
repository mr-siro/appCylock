import React, {useState} from 'react';
import {View, Text,TextInput} from 'react-native';
import {Metrics, Colors} from '@shared';
import ProgressCircle from 'react-native-progress-circle';

export const HourTab = () => {
  const [timeStart, setTimeStart] = useState('');

  return (
    <View>
      <Text style={{fontSize: Metrics.FontSize.h6, textAlign: 'center'}}>
        {'Select number of hours to block devices'}
      </Text>
      <View
        style={{alignItems: 'center', paddingVertical: Metrics.spacing.huge}}>
        <ProgressCircle
          percent={parseInt(timeStart) / 0.12}
          radius={90}
          borderWidth={8}
          color={Colors.Primary}
          shadowColor={Colors.Gray}
          bgColor="#fff">
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput
              keyboardType={'number-pad'}
              value={timeStart}
              onChangeText={(value) => setTimeStart(value)}
              style={{
                width: 50,
                color: Colors.Primary,
                fontSize: Metrics.FontSize.h3,
              }}
            />
            <Text
              style={{color: Colors.Primary, fontSize: Metrics.FontSize.h3}}>
              HOUR
            </Text>
          </View>
        </ProgressCircle>
      </View>
    </View>
  );
};
