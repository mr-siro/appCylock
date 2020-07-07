import React, {useState, useEffect} from 'react';
import {View, Text, Switch, FlatList} from 'react-native';
import {CheckBox, Button, Icon} from 'react-native-elements';
import {Images} from '@assets';
import {Metrics, Colors} from '@shared';
import {MainHeader} from '@components';
import {styles} from './styles';
import axios from 'axios';

export interface Devices {
  id: string;
  name: string;
  isCheck: boolean;
}

export enum labelKey {
  connected = 'Connected',
  blocked = 'Blocked',
}
export const HomeScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [listData, setListData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [label, setLabel] = useState(labelKey.connected);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios({
      method: 'get',
      url: 'https://5eec5c4b5e298b0016b69a76.mockapi.io/abcsoft/devices',
    })
      .then((response: any) => setListData(response.data))
      .catch((error) => console.log(error));
  };
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    blockAllDevices();
  };

  const handlerCheckBox = (id: string) => {
    let checkedList = [...listData];
    const filteredData = checkedList.find((item: Devices) => item.id == id);
    if (filteredData) {
      filteredData.isCheck = !filteredData.isCheck;
    }
    setListData(checkedList);
  };

  const blockAllDevices = () => {
    let listCheckAll = [...listData];
    for (let i = 0; i < listCheckAll.length; i++) {
      listCheckAll[i].isCheck = true;
    }

    setListData(listCheckAll);
  };

  const unBlockAllDevices = () => {
    let listCheckAll = [...listData];
    for (let i = 0; i < listCheckAll.length; i++) {
      listCheckAll[i].isCheck = false;
    }

    setListData(listCheckAll);
  };
  //renderItem
  const renderItem = (item: Devices, index: number) => {
    return (
      <View style={styles.listContainer}>
        <Text>{item.name}</Text>
        <CheckBox
          center
          containerStyle={{
            backgroundColor: 'transparent',
            borderWidth: 0,
          }}
          checkedIcon={'check-circle'}
          onIconPress={() => handlerCheckBox(item.id)}
          checked={item.isCheck}
          uncheckedIcon={'circle-o'}
        />
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
              onPress={() => {}}
            />
          }
        />
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

  //render
  return (
    <View>
      <MainHeader title={'cylock'} content={'Block All Devices'}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 30,
            backgroundColor: Colors.Primary,
            width: 53,
            justifyContent: 'space-between',
            height: 20,
          }}>
          <Button
            title={isActive == false ? 'Off' : ''}
            titleStyle={{textAlign: 'center', fontSize: 7}}
            onPress={() => {
              setIsActive(false);
              unBlockAllDevices();
            }}
            style={{borderRadius: 0}}
            buttonStyle={{
              backgroundColor:
                isActive == false
                  ? Colors.Button.BackgroundBlue
                  : Colors.Primary,
              borderRadius: 150,

              width: 26,
              height: isActive == false ? 26 : 20,
            }}
          />
          <Button
            title={isActive == true ? 'On' : ''}
            titleStyle={{textAlign: 'center', fontSize: 7}}
            onPress={() => {
              setIsActive(true);
              blockAllDevices();
            }}
            style={{borderRadius: 0}}
            buttonStyle={{
              backgroundColor:
                isActive == false
                  ? Colors.Primary
                  : Colors.Button.BackgroundBlue,
              borderRadius: 150,

              width: 26,
              height: isActive == true ? 26 : 20,
            }}
          />
        </View>
      </MainHeader>
      <View>
        <View style={styles.labelContainer}>
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
