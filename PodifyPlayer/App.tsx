import React, {FC} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabNavigator from '@components/navigation/TabNavigator';
import store from 'src/store';
import {Provider} from 'react-redux';
import {QueryClient, QueryClientProvider} from 'react-query';

interface Props {}

const queryClient = new QueryClient();

const App: FC<Props> = props => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TabNavigator />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
