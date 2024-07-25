import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import colors from '@utils/colors';
import CustomerOrder from '@views/CustomerOrder';
import Home from '@views/Home';
import ListOrder from '@views/ListOrder';
import Setting from '@views/Setting';
import {FC} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {}

const TabNavigator: FC<Props> = props => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarStyle: styles.bottomContainer,
          tabBarIcon: ({focused}) => {
            let iconName: string;
            let IconComponent = Ionicons;

            switch (route.name) {
              case 'Home':
                iconName = 'home';
                break;
              case 'CustomerOrder':
                iconName = 'file-account-outline';
                IconComponent = MaterialCommunityIcons;
                break;
              case 'ListOrder':
                iconName = 'file-document-multiple-outline';
                IconComponent = MaterialCommunityIcons;
                break;
              case 'Setting':
                iconName = 'settings-outline';
                break;
              default:
                iconName = 'home';
                break;
            }

            return (
              <IconComponent
                name={iconName}
                color={focused ? colors.GREEN : colors.GRAY}
                size={22}
              />
            );
          },
          tabBarLabel: ({focused}) => {
            const title = getTitle(route.name);
            return (
              <Text
                style={{
                  color: focused ? colors.GREEN : colors.GRAY,
                  fontSize: 11,
                }}>
                {title}
              </Text>
            );
          },
        })}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="CustomerOrder" component={CustomerOrder} />
        <Tab.Screen name="ListOrder" component={ListOrder} />
        <Tab.Screen name="Setting" component={Setting} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const getTitle = (routeName: string) => {
  switch (routeName) {
    case 'Home':
      return 'Trang chủ';
    case 'CustomerOrder':
      return 'Đơn khách hàng';
    case 'ListOrder':
      return 'Danh sách đơn';
    case 'Setting':
      return 'Thiết lập';
    default:
      return routeName;
  }
};

const styles = StyleSheet.create({
  bottomContainer: {
    paddingBottom: 4,
    paddingTop: 12,
    height: 60,
  },
});

export default TabNavigator;
