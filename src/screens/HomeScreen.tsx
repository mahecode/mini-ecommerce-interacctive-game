// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ProductList from '../components/ProductList';
import globalStyles from '../styles/global';
import CustomBannerSlider from '../components/CustomBannerSlider';

const HomeScreen: React.FC = () => {
    return (
        <ScrollView style={globalStyles.container}>
            <Text style={globalStyles.heading}>Welcome to the Store</Text>
            <CustomBannerSlider />
            <ProductList />
        </ScrollView>
    );
};

export default HomeScreen;
