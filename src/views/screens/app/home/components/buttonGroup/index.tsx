import React from 'react';
import {View, Text, ViewStyle} from 'react-native';
import {CheckBox, Button, Icon, ButtonGroup} from 'react-native-elements';
import {Colors} from '@shared';

export interface BroupButtonProps {
  listButton: Array<any>;
  containerStyle?: ViewStyle;
}
class GroupButton extends React.Component<BroupButtonProps> {
  constructor(props: BroupButtonProps) {
    super(props);
    this.state = {
      selectedIndex: 2,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({selectedIndex});
  }

  render() {
    const {listButton, containerStyle} = this.props;

    const {selectedIndex} = this.state;

    return (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={listButton}
        buttonContainerStyle={{
          width: 30,
          height: 30,
        }}
        innerBorderStyle={{width: 0}}
        containerStyle={containerStyle}
        buttonStyle={{
          width: 30,
          height: 30,
          borderRadius: 150,
          borderWidth: 1,
          borderColor: Colors.Text.textAcient,
        }}
      />
    );
  }
}
export default GroupButton;
