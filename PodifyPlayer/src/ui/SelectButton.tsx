import colors from '@utils/colors';
import {FC} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  isSelected: boolean;
}

const SelectButton: React.FC<Props> = ({title, onPress, isSelected}) => {
  return (
    <Pressable
      style={[styles.floorButton, isSelected && styles.selectedButton]}
      onPress={onPress}>
      <Text style={[styles.floorText, isSelected && styles.selectedText]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  floorButton: {
    backgroundColor: colors.GRAYLIGHT,
    padding: 10,
    borderRadius: 8,
    margin: 5,
    width: '30%',
    alignItems: 'center',
  },

  floorText: {
    color: colors.DARKEST,
    fontWeight: '600',
  },
  selectedButton: {
    backgroundColor: colors.GREEN,
  },
  selectedText: {
    color: colors.WHITE,
    fontWeight: '600',
  },
});

export default SelectButton;
