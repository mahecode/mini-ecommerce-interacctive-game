// src/screens/GameScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GameScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Game Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    },
});

export default GameScreen;
