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
    paddingVertical: Metrics.spacing.huge,
  },

  buttonStyle: {
    width: 183,
    height: 44,
    borderRadius: 30,
    backgroundColor: Colors.Button.BackgroundGreen,
  },

  modalContainer: {
    padding: Metrics.spacing.large,
    backgroundColor: Colors.White,
    borderRadius: 15,
    justifyContent: 'center',
  },

  labelContainer: {
    borderBottomColor: Colors.Text.textAcient,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: Metrics.spacing.medium,
  },

  blockedDevice: {
    fontSize: Metrics.FontSize.h6,
    color: Colors.Primary,
    textAlign: 'center',
    flex: 1,
  },

  loadingStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Metrics.spacing.medium,
  },
});
export {styles};
