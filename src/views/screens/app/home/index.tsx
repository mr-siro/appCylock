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
} from 'react-native';
import {CheckBox, Button, Icon} from 'react-native-elements';
import {Images} from '@assets';
import {Metrics, Colors} from '@shared';
import {MainHeader} from '@components';
import {listDevices} from '@services';
import {styles} from './styles';
import Modal from 'react-native-modal';
import ProgressCircle from 'react-native-progress-circle';

export interface Devices {
  id: string;
  title: string;
  isBlocked: boolean;
  checked: boolean;
}

export const HomeScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [listData, setListData] = useState(listDevices);
  const [checked, setChecked] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [timeStart, setTimeStart] = useState('');
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    setChecked(!checked);
  };

  const handlerCheckBox = (id: string) => {
    let checkedList = [...listData];
    const filteredData = checkedList.find((item: Devices) => item.id == id);
    if (filteredData) {
      setChecked(!checked);
    }
    console.log(filteredData);
  };

  const renderItem = (item: Devices, index: number) => {
    return (
      <View style={styles.listContainer}>
        <Text>{item.title}</Text>
        <CheckBox
          center
          containerStyle={{
            backgroundColor: 'transparent',
            borderWidth: 0,
          }}
          checkedIcon={'check-circle'}
          onIconPress={() => handlerCheckBox(item.id)}
          checked={checked}
          uncheckedIcon={'circle-o'}
        />
      </View>
    );
  };

  const renderModal = () => {
    return (
      <Modal isVisible={isModalVisible}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              padding: Metrics.spacing.large,
              backgroundColor: Colors.White,
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name={'close'}
                color={'#848484'}
                onPress={() => setModalVisible(!isModalVisible)}
              />
              <Text
                style={{
                  fontSize: Metrics.FontSize.h6,
                  color: Colors.Primary,
                  textAlign: 'center',
                  flex: 1,
                }}>
                {'Block Devices'}
              </Text>
            </View>
            <ProgressCircle
              percent={parseInt(timeStart) / 0.12}
              radius={50}
              borderWidth={8}
              color={Colors.Primary}
              shadowColor="#999"
              bgColor="#fff">
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextInput
                  value={timeStart}
                  onChangeText={(value) => setTimeStart(value)}
                  style={{width: 25, color: Colors.Primary}}
                />
                <Text style={{color: Colors.Primary}}>HOUR</Text>
              </View>
            </ProgressCircle>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  return (
    <View>
      <MainHeader title={'cylock'} content={'Block All Devices'}>
        <Switch
          trackColor={{false: '#767577', true: Colors.Primary}}
          thumbColor={isEnabled ? Colors.Button.BackgroundBlue : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </MainHeader>
      <View>
        <View
          style={{
            borderBottomColor: Colors.Text.textAcient,
            borderBottomWidth: 0.5,
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: Metrics.spacing.medium,
          }}>
          <Text style={{fontSize: Metrics.FontSize.h6}}>{'Connected'}</Text>
          <Text style={{fontSize: Metrics.FontSize.h6}}>{'Blocked'}</Text>
        </View>

        <FlatList
          data={listData}
          renderItem={({item, index}) => renderItem(item, index)}
          ListFooterComponent={
            <Button
              style={styles.buttonContainer}
              buttonStyle={styles.buttonStyle}
              title={'Blocked Devices'}
              onPress={() => setModalVisible(!isModalVisible)}
            />
          }
        />
        {renderModal()}
      </View>
    </View>
  );
};
