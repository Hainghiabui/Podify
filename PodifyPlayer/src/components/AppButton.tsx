import colors from '@utils/colors';
import {FC} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
}
const AppButton: FC<Props> = props => {
  const {title, onPress} = props;
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.btnTitle}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.GREEN,
    paddingVertical: 12,
    borderRadius: 4,
  },
  btnTitle: {
    color: colors.WHITE,
    fontWeight: '500',
    fontSize: 14,
  },
});

export default AppButton;
