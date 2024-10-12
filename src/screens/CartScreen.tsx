// src/screens/CartScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useCart } from '../context/CartContext';
import CustomButton from '../components/CustomButton';
import colors from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons'; // Import icons

const CartScreen: React.FC = () => {
    const { state, removeFromCart, adjustQuantity } = useCart();
    const { cartItems } = state;

    // Calculate total price
    const totalPrice = cartItems.reduce((sum, item) => sum + parseInt(item.price.replace('₹', '')) * item.quantity, 0);

    const renderCartItem = ({ item }: { item: any }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productDetails}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>{item.price}</Text>
                <View style={styles.controls}>
                    <Icon name="remove-circle-outline" size={30} color={colors.primary} onPress={() => adjustQuantity(item.id, item.quantity - 1)} />
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <Icon name="add-circle-outline" size={30} color={colors.primary} onPress={() => adjustQuantity(item.id, item.quantity + 1)} />
                    <Icon name="trash-outline" size={30} color="red" onPress={() => removeFromCart(item.id)} />
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {cartItems.length > 0 ? (
                <>
                    <FlatList
                        data={cartItems}
                        renderItem={renderCartItem}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={styles.listContainer}
                    />
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalLabel}>Total: </Text>
                        <Text style={styles.totalAmount}>₹{totalPrice}</Text>
                    </View>
                </>
            ) : (
                <Text style={styles.emptyCartText}>Your cart is empty.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: colors.background,
    },
    listContainer: {
        paddingBottom: 16,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: colors.cardBackground,
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    productDetails: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.textPrimary,
    },
    price: {
        fontSize: 16,
        color: colors.primary,
        marginVertical: 4,
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantity: {
        marginHorizontal: 8,
        fontSize: 18,
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderTopWidth: 1,
        borderTopColor: colors.textSecondary,
    },
    totalLabel: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
    },
    emptyCartText: {
        textAlign: 'center',
        fontSize: 18,
        color: colors.textSecondary,
        marginTop: 100,
    },
});

export default CartScreen;
