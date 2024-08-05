import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const statusData = [
  {text: 'Drity', color: '#E74C3C'},
  {text: 'Clean', color: '#3498DB'},
  {text: 'Inspected', color: '#2ecc708e'},
  {text: 'Pick - up', color: '#F39C12'},
];
const lightColor = [
  {text: 'Drity', color: '#e74d3c2b'},
  {text: 'Clean', color: '#3498db74'},
  {text: 'Inspected', color: '#2ecc7034'},
  {text: 'Pick - up', color: '#f39d1256'},
];

const StatusButton = ({
  text,
  color,
  onPress,
}: {
  text: string;
  color: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color}]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const ListOrder = () => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const handlePress = (status: React.SetStateAction<string | null>) => {
    setSelectedStatus(status);
  };

  return (
    <View style={styles.container}>
      {statusData.map((status, index) => {
        const isSelected = selectedStatus === status.text;
        const backgroundColor = isSelected
          ? status.color
          : lightColor[index].color;

        return (
          <StatusButton
            key={index}
            text={status.text}
            color={backgroundColor}
            onPress={() => handlePress(status.text)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderWidth: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ListOrder;
