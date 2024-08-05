import HkStatusButton from '@components/HkStatusButton';
import StatusModal from '@components/StatusModal';
import colors from '@utils/colors';
import {FC, Key, SetStateAction, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useQuery} from 'react-query';
import {fetchHkStatus} from 'src/api/fetchHkStatus';

interface Props {}
interface HkStatus {
  text: string;
  value: string;
}
const getStatusColor = (status: string) => {
  switch (status) {
    case 'DIRTY':
      return colors.RED;
    case 'CLEAN':
      return colors.BLUE;
    case 'INSPECTED':
      return colors.GREEN;
    case 'PICK-UP':
      return colors.YELLOW;
    default:
      return colors.GRAY;
  }
};

const getStatusColorLight = (status: string) => {
  switch (status) {
    case 'DIRTY':
      return colors.REDLIGHT;
    case 'CLEAN':
      return colors.BLUELIGHT;
    case 'INSPECTED':
      return colors.GREENLIGHT;
    case 'PICK-UP':
      return colors.YELLOWLIGHT;
    default:
      return colors.GRAYLIGHT;
  }
};

const Setting: FC<Props> = props => {
  const {data, error, isLoading} = useQuery('status', fetchHkStatus);
  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching data</Text>;
  const [selectedStatus, setSelectedStatus] = useState('');
  const [isSelected, setIsSelected] = useState(false);

  const handleStatusButtonPress = (status: string) => {
    setSelectedStatus(status);
    setIsSelected(!isSelected);
  };

  return (
    <View style={styles.container}>
      {data?.map((status: HkStatus, index: Key | null | undefined) => (
        <HkStatusButton
          key={index}
          color={
            selectedStatus === status.value
              ? getStatusColorLight(status.text)
              : getStatusColor(status.text)
          }
          title={status.text}
          lightColor={
            selectedStatus === status.value
              ? getStatusColor(status.text)
              : getStatusColorLight(status.text)
          }
          onPress={() => handleStatusButtonPress(status.value)}
          isSelected={selectedStatus === status.value}
          textColor={
            selectedStatus === status.value
              ? colors.WHITE
              : getStatusColor(status.text)
          }
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
});

export default Setting;
