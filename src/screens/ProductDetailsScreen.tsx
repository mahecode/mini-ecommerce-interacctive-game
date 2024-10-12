// src/screens/ProductDetailsScreen.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/navigation';
import { useCart } from '../context/CartContext'; // Import CartContext
import colors from '../styles/colors';

type ProductDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;

const ProductDetailsScreen: React.FC = () => {
    const route = useRoute<ProductDetailsScreenRouteProp>();
    const { product } = route.params;
    const { addToCart } = useCart(); // Get addToCart function

    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>{product.price}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Button title="Add to Cart" onPress={() => addToCart(product)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.background,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 8,
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.textPrimary,
        marginBottom: 8,
    },
    price: {
        fontSize: 20,
        color: colors.primary,
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: colors.textSecondary,
    },
});

export default ProductDetailsScreen;
