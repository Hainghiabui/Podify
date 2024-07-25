import RoomGrid from '@components/RoomGrid';
import {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {}
const Setting: FC<Props> = props => {
  return <RoomGrid />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Setting;
