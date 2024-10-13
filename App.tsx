// App.tsx
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import CartScreen from './src/screens/CartScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import {CartProvider, useCart} from './src/context/CartContext';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}} // Remove header from HomeScreen
    />
    <Stack.Screen
      name="ProductDetails"
      component={ProductDetailsScreen}
      options={({route}) => ({
        title: route.params.product.name,
        headerStyle: {
          backgroundColor: '#4CAF50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    />
  </Stack.Navigator>
);

const App: React.FC = () => {
  return (
    <CartProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen
              name="Home"
              component={HomeStack}
              options={{
                headerShown: false, // Remove header from Home tab
                tabBarIcon: ({color, size}) => (
                  <Icon name="home-outline" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Game"
              component={GameScreen}
              options={{
                headerShown: false, // Remove header from Game tab
                tabBarIcon: ({color, size}) => (
                  <Icon
                    name="game-controller-outline"
                    color={color}
                    size={size}
                  />
                ),
              }}
            />
            <Tab.Screen
              name="Cart"
              component={CartScreen}
              options={({route}) => {
                const {state} = useCart();
                const cartItemsCount = state.cartItems.reduce(
                  (total, item) => total + item.quantity,
                  0,
                );

                return {
                  headerShown: false, // Remove header from Cart tab
                  tabBarIcon: ({color, size}) => (
                    <Icon name="cart-outline" color={color} size={size} />
                  ),
                  tabBarBadge: cartItemsCount > 0 ? cartItemsCount : undefined,
                };
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </CartProvider>
  );
};

export default App;
