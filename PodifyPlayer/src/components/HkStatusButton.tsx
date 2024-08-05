import colors from '@utils/colors';
import {FC} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  color: string;
  lightColor: string;
  title: string;
  onPress: () => void;
  isSelected?: boolean;
  textColor: string;
}

const HkStatusButton: FC<Props> = props => {
  const {color, title, lightColor, onPress, isSelected, textColor} = props;

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.btnContainer,
          {backgroundColor: lightColor, borderColor: color},
        ]}
        onPress={onPress}>
        {isSelected && (
          <>
            <AntDesign name="check" size={18} color={textColor} />
            <View style={{width: 4}} />
          </>
        )}

        <Text style={[styles.btnTitle, {color: textColor}]}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 100,
    borderWidth: 1,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
});

export default HkStatusButton;
