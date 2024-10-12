// App.tsx
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import CartScreen from './src/screens/CartScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen';
import { CartProvider } from './src/context/CartContext'; // Import CartProvider

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
);

const App: React.FC = () => {
    return (
        <CartProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <NavigationContainer>
                    <Tab.Navigator>
                        <Tab.Screen
                            name="Home"
                            component={HomeStack}
                            options={{ headerShown: false }}
                        />
                        <Tab.Screen name="Game" component={GameScreen} />
                        <Tab.Screen name="Cart" component={CartScreen} />
                    </Tab.Navigator>
                </NavigationContainer>
            </GestureHandlerRootView>
        </CartProvider>
    );
};

export default App;
