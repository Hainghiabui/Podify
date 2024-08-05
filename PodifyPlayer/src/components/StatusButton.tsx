import {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {}

const color = [
  {
    text: 'Drity',
    color: '#E74C3C',
  },
  {
    text: 'Clean',
    color: '#3498DB',
  },
  {
    text: 'Inspected',
    color: '#2ecc708e',
  },
  {
    text: 'Pick - up',
    color: '#F39C12',
  },
];

const lightColor = [
  {
    text: 'Drity',
    color: '#e74d3c2b',
  },
  {
    text: 'Clean',
    color: '#3498db74',
  },
  {
    text: 'Inspected',
    color: '#2ecc7034',
  },
  {
    text: 'Pick - up',
    color: '#f39d1256',
  },
];
const StatusButton: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <View style={styles.btn}>
        <Text>StatusButton</Text>
      </View>
      <View>
        <Text>StatusButton</Text>
      </View>
      <View>
        <Text>StatusButton</Text>
      </View>
      <View>
        <Text>StatusButton</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: lightColor[0].color,
    padding: 10,
    borderRadius: 10,
    margin: 10,
    borderColor: color[0].color,
    borderWidth: 2,
  },
});

export default StatusButton;
