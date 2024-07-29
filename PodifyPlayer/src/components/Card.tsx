import colors from '@utils/colors';
import {FC} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

interface IconProps {
  name: string;
  color: string;
}
interface Props {
  // icons: IconProps[];
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
      <Text style={styles.statusText}>{noofGuest}</Text>
      <View style={styles.line}></View>
      <View style={styles.iconsContainer}>
        {/* {icons.map((icon, index) => (
          <Icon key={index} name={icon.name} size={30} color={icon.color} />
        ))} */}
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

/*import colors from '@utils/colors';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IconProps {
  name: string;
  color: string;
}

interface CardProps {
  room: string;
  statusColor: string;
  icons: IconProps[];
}

const Card: React.FC<CardProps> = ({room, statusColor, icons}) => (
  <View style={[styles.card, {borderBottomColor: statusColor}]}>
    <Text style={[styles.roomText, {color: statusColor}]}>{room}</Text>
    <Text style={styles.statusText}>(02)</Text>
    <View style={styles.iconsContainer}>
      {icons.map((icon, index) => (
        <Icon key={index} name={icon.name} size={30} color={icon.color} />
      ))}
    </View>
  </View>
);

const RoomGrid: React.FC = () => {
  return (
    <View style={styles.container}>
      <Card
        room="101 - DL1"
        statusColor="orange"
        icons={[
          {name: 'broom', color: 'blue'},
          {name: 'broom', color: 'orange'},
        ]}
      />
      <Card
        room="102 - DL1"
        statusColor="orange"
        icons={[
          {name: 'exchange', color: 'green'},
          {name: 'broom', color: 'orange'},
        ]}
      />
      <Card
        room="103 - DL1"
        statusColor="green"
        icons={[{name: 'broom', color: 'yellow'}]}
      />
      <Card
        room="104 - DL1"
        statusColor="orange"
        icons={[
          {name: 'user', color: 'red'},
          {name: 'broom', color: 'orange'},
        ]}
      />
      <Card
        room="109 - DL1"
        statusColor="blue"
        icons={[
          {name: 'lock', color: 'gray'},
          {name: 'broom', color: 'orange'},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  card: {
    width: '30%',
    borderBottomWidth: 8,
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
  },
  roomText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 14,
  },
  iconsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
});

export default RoomGrid;
*/
