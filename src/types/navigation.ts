// src/types/navigation.ts
export type RootStackParamList = {
    Home: undefined;
    ProductDetails: { product: { id: number; name: string; price: string; description: string; image: string } };
};
