import colors from '@utils/colors';
import {FC} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

interface IconProps {
  name: string;
  color: string;
}
interface Props {
  roomCode: string;
  roomTypeCode: string;
  roomId: number;
  statusColor: string;
  noofGuest: number | null;
  hkStatus: string;
  onPress: () => void;
}

const Card: FC<Props> = props => {
  const {
    roomCode,
    roomTypeCode,
    statusColor,
    noofGuest,
    hkStatus,
    roomId,
    onPress,
  } = props;
  return (
    <Pressable
      style={[styles.card, {borderBottomColor: statusColor}]}
      onPress={onPress}>
      <Text style={[styles.roomText, {color: statusColor}]}>
        {roomCode} - {roomTypeCode}
      </Text>
      <Text style={styles.statusText}>
        {' '}
        {noofGuest ? `(${noofGuest})` : null}
      </Text>
      <View style={styles.line}></View>
      <View style={styles.iconsContainer}>
        <Image
          source={
            hkStatus === 'CLEAN'
              ? require('../assets/clean.png')
              : hkStatus === 'DIRTY'
              ? require('../assets/dirty.png')
              : hkStatus === 'PICK-UP'
              ? require('../assets/pickup.png')
              : require('../assets/inspected.png')
          }
          style={{width: 20, height: 20, marginRight: 8}}
        />
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  card: {
    width: '28%',
    borderBottomWidth: 8,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    padding: 8,
    margin: 10,
    alignItems: 'center',
  },
  roomText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 14,
  },
  iconsContainer: {
    flexDirection: 'row',
    // marginTop: 10,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: colors.GRAYLIGHT,
    marginVertical: 8,
  },
});

export default Card;
