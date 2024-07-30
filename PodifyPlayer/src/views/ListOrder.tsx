import AppButton from '@components/AppButton';
import SelectButton from '@ui/SelectButton';
import {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props {}
const ListOrder: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <View
        style={{
          borderWidth: 3,
          borderRadius: 10,
          padding: 2,
          borderColor: 'green',
        }}>
        <AppButton
          title={'hello'}
          onPress={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
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
});

export default ListOrder;
