import {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {}
const ListOrder: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <Text>ListOrder</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListOrder;
