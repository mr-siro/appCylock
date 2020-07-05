import {StyleSheet} from 'react-native';
import {Metrics, Colors} from '@shared';

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Metrics.spacing.large,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.Text.textAcient,
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
export {styles};
