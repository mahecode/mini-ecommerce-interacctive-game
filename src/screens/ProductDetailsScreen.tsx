// src/screens/ProductDetailsScreen.tsx
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../types/navigation';
import CustomBannerSlider from '../components/CustomBannerSlider'; // Import the reusable carousel
import CustomButton from '../components/CustomButton';
import {useCart} from '../context/CartContext';
import colors from '../styles/colors';

type ProductDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetails'
>;

const ProductDetailsScreen: React.FC = () => {
  const route = useRoute<ProductDetailsScreenRouteProp>();
  const {product} = route.params;
  const {addToCart} = useCart();

  return (
    <ScrollView style={styles.container}>
      {/* Carousel for product images */}
      <CustomBannerSlider
        banners={product.images.map((image, index) => ({id: index, image}))}
      />

      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>

        <CustomButton title="Add to Cart" onPress={() => addToCart(product)} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  productInfo: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 24,
  },
});

export default ProductDetailsScreen;
