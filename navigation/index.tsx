/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, Fontisto } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import { View } from '../components/Themed';
import { Octicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/ChatsScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { RootStackParamList, MainTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import ChatsScreen from '../screens/ChatsScreen';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.tint,
        },
        headerTintColor: Colors.light.background,
        headerTitleStyle: {
          fontWeight: 'bold'
        }
    }}>
      <Stack.Screen 
        name="Root" 
        component={MainTabNavigator}
        options={{
          title: "WhatsApp",
          headerRight: () => (
            <View style={{
                flexDirection: 'row', 
                backgroundColor: '#0C6157', 
                width: 60, 
                justifyContent: 'space-between',
                marginRight: 10}}>
              <Octicons name='search' size={21} color={'white'}/>
              <MaterialCommunityIcons name='dots-vertical' size={22} color={'white'} />
            </View>
          ),
          headerShadowVisible: false
        }}
      />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      {/* <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group> */}
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const MainTab = createMaterialTopTabNavigator<MainTabParamList>();

function MainTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <MainTab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].background,
        tabBarStyle: {
          backgroundColor: '#0C6157',
        },
        tabBarIndicatorStyle:{
          backgroundColor: Colors[colorScheme].background,
          height: 4
        },
        tabBarLabelStyle:{
          fontWeight: 'bold'
        }
      }}>
      <MainTab.Screen
        name="Camera"
        component={TabTwoScreen}
        options={{title: 'camera',
        tabBarIcon: ({ color }) => <Fontisto name="camera" color={color} size={18}/>,
        tabBarLabel: () => null
      }}
      />
      <MainTab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{title: 'Chats'}}
      />
      <MainTab.Screen
        name="Status"
        component={TabTwoScreen}
        options={{title: 'Status'}}
      />
      <MainTab.Screen
        name="Calls"
        component={TabTwoScreen}
        options={{title: 'Calls'}}
      />
    </MainTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
