// src/game/GameIntroScreen.tsx
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import GameScreen from './GameScreen';

const GameIntroScreen: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openGame = () => setIsModalVisible(true);
  const closeGame = () => setIsModalVisible(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spin & Win Game</Text>
      <Text style={styles.description}>
        Stick arrows to the spinning wheel without hitting others! The more arrows you stick, the higher your score.
      </Text>
      <Text style={styles.rewards}>
        Rewards: {"\n"}- Score 50: 10% Discount {"\n"}- Score 100: 20% Discount {"\n"}- Score 150+: 30% Discount
      </Text>

      <TouchableOpacity onPress={openGame} style={styles.startButton}>
        <Text style={styles.startButtonText}>Start Game</Text>
      </TouchableOpacity>

      {/* Game Modal */}
      <Modal visible={isModalVisible} animationType="slide" onRequestClose={closeGame}>
        <GameScreen onClose={closeGame} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  rewards: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameIntroScreen;
