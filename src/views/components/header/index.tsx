import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  Dimensions
} from 'react-native';
import {Header} from 'react-native-elements';
import {Images} from '@assets';
import {Metrics, Colors} from '@shared';

export interface HeaderProps {
  title: string;
  content?: string;
  children?: React.ReactNode;
}

export const MainHeader = (props: HeaderProps) => {
  const {title, content, children} = props;
  return (
    <ImageBackground
      source={Images.HeaderBackground}
      style={{
        width: '100%',
        height: (Dimensions.get('window').height * 3) / 8,
      }}
      resizeMode={'cover'}>
      <Header
        centerComponent={{
          text: title.toUpperCase(),
          style: {fontSize: Metrics.FontSize.h5, color: Colors.White},
        }}
        containerStyle={{
          borderBottomWidth: 0,
          backgroundColor: 'transparent',
        }}
      />

      <ImageBackground
        source={Images.IconContainer}
        style={{width: 109, height: 109, alignSelf: 'center'}}
        resizeMode={'contain'}>
        <Image
          source={Images.ICLock}
          style={{alignSelf: 'center', flex: 1}}
          resizeMode={'contain'}
        />
      </ImageBackground>

      <Text
        style={{
          fontSize: Metrics.FontSize.h6,
          color: Colors.White,
          textAlign: 'center',
          paddingVertical: Metrics.spacing.large,
        }}>
        {content}
      </Text>
      <View
        style={{
          alignItems: 'center',
        }}>
        {children}
      </View>
    </ImageBackground>
  );
};
