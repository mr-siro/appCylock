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
import {styles} from './styles';
import Modal from 'react-native-modal';
import ProgressCircle from 'react-native-progress-circle';
import GroupButton from './components/buttonGroup';
import {ArrowDash} from './components/arrowDash';
import {HourTab,ScheduleTab} from './children';

export interface Devices {
  id: string;
  title: string;
  isBlocked: boolean;
  checked: boolean;
}

export enum TabKey {
  hour = 'Hour',
  shcedule = 'Schedule',
  advanced = 'Advanced',
}

export enum labelKey {
  connected = 'Connected',
  blocked = 'Blocked',
}
export const HomeScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [listData, setListData] = useState(listDevices);
  const [checked, setChecked] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [keyTab, setKeyTab] = useState(TabKey.hour);
  const [label, setLabel] = useState(labelKey.connected);

  const listButton = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

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

  //renderItem
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

  //tab1
  const hourTab = () => {
    return (
      <HourTab/>
    );
  };

  //tab2
  const ScheduleTab = () => {
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
            <Text
              style={{color: Colors.Primary, fontSize: Metrics.FontSize.h3}}>
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
            <Text
              style={{color: Colors.Primary, fontSize: Metrics.FontSize.h3}}>
              AM
            </Text>
          </ProgressCircle>
        </View>
      </View>
    );
  };

  //Tab3
  const AdvancedTab = () => {
    return (
      <View>
        <Text>3</Text>
      </View>
    );
  };

  const ConnectedTab = () => {
    return (
      <View>
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
    );
  };

  const BlockedTab = () => {
    return <View></View>;
  };

  //renderLabel
  const renderLabel = () => {
    if (label == labelKey.connected) {
      return ConnectedTab();
    } else {
      return BlockedTab();
    }
  };
  //rendertab
  const renderTab = () => {
    if (keyTab == TabKey.hour) {
      return hourTab();
    } else if (keyTab == TabKey.shcedule) {
      return ScheduleTab();
    } else {
      return AdvancedTab();
    }
  };

  //modal
  const renderModal = () => {
    return (
      <Modal isVisible={isModalVisible}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                name={'close'}
                color={'#848484'}
                onPress={() => setModalVisible(!isModalVisible)}
              />
              <Text
                style={styles.blockedDevice}>
                {'Block Devices'}
              </Text>
            </View>

            <View
              style={{
                height: 44,
                backgroundColor: Colors.Gray,
                borderRadius: 30,
                marginVertical: Metrics.spacing.huge,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Button
                titleStyle={{
                  fontSize: Metrics.FontSize.large,
                  marginHorizontal: Metrics.spacing.medium,
                  color:
                    keyTab == TabKey.hour
                      ? Colors.White
                      : Colors.Text.textAcient,
                }}
                buttonStyle={{
                  borderRadius: 30,
                  height: 44,
                  backgroundColor:
                    keyTab == TabKey.hour
                      ? Colors.Button.BackgroundBlue
                      : Colors.Gray,
                }}
                title={'By Hour'}
                onPress={() => setKeyTab(TabKey.hour)}
              />
              <Button
                titleStyle={{
                  fontSize: Metrics.FontSize.large,
                  color:
                    keyTab == TabKey.shcedule
                      ? Colors.White
                      : Colors.Text.textAcient,
                }}
                buttonStyle={{
                  borderRadius: 30,
                  height: 44,
                  backgroundColor:
                    keyTab == TabKey.shcedule
                      ? Colors.Button.BackgroundBlue
                      : Colors.Gray,
                }}
                title={'By Schedule'}
                onPress={() => setKeyTab(TabKey.shcedule)}
              />
              <Button
                titleStyle={{
                  fontSize: Metrics.FontSize.large,
                  marginHorizontal: Metrics.spacing.medium,
                  color:
                    keyTab == TabKey.advanced
                      ? Colors.White
                      : Colors.Text.textAcient,
                }}
                buttonStyle={{
                  borderRadius: 30,
                  height: 44,
                  backgroundColor:
                    keyTab == TabKey.advanced
                      ? Colors.Button.BackgroundBlue
                      : Colors.Gray,
                }}
                title={'Advanced'}
                onPress={() => setKeyTab(TabKey.advanced)}
              />
            </View>
            {renderTab()}
            <Button
              style={styles.buttonContainer}
              buttonStyle={styles.buttonStyle}
              title={'Block Now'}
              onPress={() => {}}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };

  //render
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
          style={styles.labelContainer}>
          <Text
            onPress={() => setLabel(labelKey.connected)}
            style={{
              fontSize: Metrics.FontSize.h6,
              color:
                label == labelKey.connected
                  ? Colors.Primary
                  : Colors.Text.textAcient,
            }}>
            {'Connected'}
          </Text>
          <Text
            onPress={() => setLabel(labelKey.blocked)}
            style={{
              fontSize: Metrics.FontSize.h6,
              color:
                label == labelKey.blocked
                  ? Colors.Primary
                  : Colors.Text.textAcient,
            }}>
            {'Blocked'}
          </Text>
        </View>
        {renderLabel()}
      </View>
    </View>
  );
};
