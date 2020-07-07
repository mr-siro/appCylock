import React, {useState, useEffect} from 'react';
import {View, Text, Switch, FlatList, ActivityIndicator} from 'react-native';
import {CheckBox, Button, Icon} from 'react-native-elements';
import {Images} from '@assets';
import {Metrics, Colors} from '@shared';
import {MainHeader} from '@components';
import {styles} from './styles';
import axios from 'axios';
import Toast from 'react-native-tiny-toast';

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
  const [label, setLabel] = useState(labelKey.connected);
  const [loading, setLoading] = useState(false);
  const [listBlock, setListBlock] = useState([]);

  useEffect(() => {
    setLoading(true);
    getData();
  }, []);

  const getData = () => {
    axios({
      method: 'get',
      url: 'https://5eec5c4b5e298b0016b69a76.mockapi.io/abcsoft/devices',
    })
      .then((response) => {
        setListData(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  const toggleSwitch = (state: boolean) => {
    setIsEnabled((previousState) => !previousState);
    blockAllDevices(state);
  };

  const handlerCheckBox = (id: string) => {
    let checkedList = [...listData];
    const filteredData = checkedList.find((item: Devices) => item.id == id);
    if (filteredData) {
      filteredData.isCheck = !filteredData.isCheck;
    }
    setListData(checkedList);
  };

  const blockAllDevices = (bool: boolean) => {
    let listCheckAll = [...listData];
    for (let i = 0; i < listCheckAll.length; i++) {
      listCheckAll[i].isCheck = bool;
    }
    setListData(listCheckAll);
  };

  const handlerBlockDevice = () => {
    const filteredData = listData.filter(
      (item: Devices) => item.isCheck == true,
    );
    if (filteredData.length == 0) {
      Toast.show('Please select!'),
        {
          position: Toast.position.CENTER,
        };
    } else {
      Toast.show('Blocked!'),
        {
          position: Toast.position.CENTER,
        };
    }
    setListBlock(filteredData);
    return filteredData;
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

  const renderBlocked = (item: Devices, index: number) => {
    return (
      <View style={styles.listContainer}>
        <Text style={{paddingVertical: Metrics.spacing.large}}>
          {item.name}
        </Text>
      </View>
    );
  };
  const ConnectedTab = () => {
    return (
      <View>
        {loading ? (
          <View style={styles.loadingStyle}>
            <Text style={{color: Colors.Primary}}>Loading...</Text>
            <ActivityIndicator size="large" color={Colors.Primary} />
          </View>
        ) : (
          <FlatList
            data={listData}
            renderItem={({item, index}) => renderItem(item, index)}
          />
        )}

        <View style={styles.buttonContainer}>
          <Button
            buttonStyle={styles.buttonStyle}
            title={'Blocked Devices'}
            onPress={() => {handlerBlockDevice()}}
          />
        </View>
      </View>
    );
  };

  const BlockedTab = () => {
    return (
      <View>
        {loading ? (
          <View style={styles.loadingStyle}>
            <Text style={{color: Colors.Primary}}>Loading...</Text>
            <ActivityIndicator size="large" color={Colors.Primary} />
          </View>
        ) : (
          <FlatList
            data={listBlock}
            renderItem={({item, index}) => renderBlocked(item, index)}
          />
        )}
      </View>
    );
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
        <Switch
          trackColor={{false: '#767577', true: Colors.Primary}}
          thumbColor={isEnabled ? Colors.Button.BackgroundBlue : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
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
