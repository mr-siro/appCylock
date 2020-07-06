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
  StyleSheet,
} from 'react-native';
import {TabView, SceneMap,TabBar,SceneRendererProps, NavigationState} from 'react-native-tab-view';
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

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Connected'},
    {key: 'second', title: 'Blocked'}
  ]);

  const FirstRoute = () => (
    <View>
     
    </View>
  );

  const SecondRoute = () => (
    <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props: SceneRendererProps & { navigationState: State }) => (
    <TabBar
      {...props}
      activeColor={Colors.Primary}
      inactiveColor={Colors.Text.textAcient}
      indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: Colors.White }}
    />
  );

  return (
    <View style={{flex: 1}}>
      <Header />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
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
