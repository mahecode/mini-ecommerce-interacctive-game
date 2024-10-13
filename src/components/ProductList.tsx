import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import colors from '../styles/colors';

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const navigation = useNavigation(); // Get navigation object

  // Fetch product data from the API
  React.useEffect(() => {
    axios
      .get('http://192.168.1.7:3000/products') // Use localhost or 10.0.2.2 for Android emulator
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Render each product item in the list
  const renderProduct = ({item}: {item: Product}) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', {product: item})}>
      <View style={styles.productContainer}>
        <Image
          source={{uri: item.image}}
          resizeMode="contain"
          style={styles.image}
        />
        <View style={styles.productInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Show loading indicator if data is being fetched
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 16,
  },
  productContainer: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
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
  description: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default ProductList;
