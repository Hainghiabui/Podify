import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabNavigator from '@components/navigation/TabNavigator';
import store from 'src/store';
import {Provider} from 'react-redux';

interface Props {}

const App: FC<Props> = props => {
  return (
    <Provider store={store}>
      <TabNavigator />
    </Provider>
  );
};

export default App;
