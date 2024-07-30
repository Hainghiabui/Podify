import colors from '@utils/colors';
import {FC} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

interface IconProps {
  name: string;
  color: string;
}
interface Props {
  roomCode: string;
  roomTypeCode: string;
  statusColor: string;
  noofGuest: number | null;
  hkStatus: string;
}

const Card: FC<Props> = props => {
  const {roomCode, roomTypeCode, statusColor, noofGuest, hkStatus} = props;
  return (
    <View style={[styles.card, {borderBottomColor: statusColor}]}>
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
            hkStatus === 'clean'
              ? require('../assets/clean.png')
              : hkStatus === 'dirty'
              ? require('../assets/dirty.png')
              : hkStatus === 'pickup'
              ? require('../assets/pickup.png')
              : require('../assets/inspected.png')
          }
          style={{width: 20, height: 20, marginRight: 8}}
        />
      </View>
    </View>
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
