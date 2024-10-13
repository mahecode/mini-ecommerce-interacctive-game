// src/screens/HomeScreen.tsx
import React from 'react';
import {Text, ScrollView} from 'react-native';
import ProductList from '../components/ProductList';
import globalStyles from '../styles/global';
import CustomBannerSlider from '../components/CustomBannerSlider';

const banners = [
  {id: 1, image: 'https://via.placeholder.com/600x300?text=Product+1+Image+1'},
  {id: 2, image: 'https://via.placeholder.com/600x300?text=Product+1+Image+2'},
  {id: 3, image: 'https://via.placeholder.com/600x300?text=Product+1+Image+3'},
];

const HomeScreen: React.FC = () => {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.heading}>Welcome to the Store</Text>
      <CustomBannerSlider banners={banners} />
      <ProductList />
    </ScrollView>
  );
};

export default HomeScreen;
