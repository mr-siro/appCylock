import React, {useState} from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {
  TabView,
  SceneMap,
  TabBar,
  SceneRendererProps,
  NavigationState,
} from 'react-native-tab-view';
import {Header, Button} from 'react-native-elements';
import ProgressCircle from 'react-native-progress-circle';
import {Metrics, Colors} from '@shared';

const initialLayout = {width: Dimensions.get('window').width};
type Route = {
  key: string;
  title: string;
};
type State = NavigationState<Route>;

export const SettingScreen = () => {
  const [timeStart, setTimeStart] = useState('');
  const [isActive, setIsActive] = useState(false);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Connected'},
    {key: 'second', title: 'Blocked'},
  ]);

  const FirstRoute = () => <View></View>;

  const SecondRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (
    props: SceneRendererProps & {navigationState: State},
  ) => (
    <TabBar
      {...props}
      activeColor={Colors.Primary}
      inactiveColor={Colors.Text.textAcient}
      indicatorStyle={{backgroundColor: 'white'}}
      style={{backgroundColor: Colors.White}}
    />
  );

  return (
    <View>
      <Header />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
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
          onPress={() => setIsActive(false)}
          style={{borderRadius: 0}}
          buttonStyle={{
            backgroundColor:
              isActive == false ? Colors.Button.BackgroundBlue : Colors.Primary,
            borderRadius: 150,

            width: 26,
            height: isActive == false ? 26 : 20,
          }}
        />
        <Button
          title={isActive == true ? 'On' : ''}
          titleStyle={{textAlign: 'center', fontSize: 7}}
          onPress={() => setIsActive(true)}
          style={{borderRadius: 0}}
          buttonStyle={{
            backgroundColor:
              isActive == false ? Colors.Primary : Colors.Button.BackgroundBlue,
            borderRadius: 150,

            width: 26,
            height: isActive == true ? 26 : 20,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },

  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Metrics.spacing.large,
  },

  buttonStyle: {
    width: 183,
    height: 44,
    borderRadius: 30,
    backgroundColor: Colors.Button.BackgroundGreen,
  },
});
