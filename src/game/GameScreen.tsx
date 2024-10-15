// GameScreen.tsx

import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Alert,
  Dimensions,
  Easing,
  Image
} from 'react-native';

const { width, height } = Dimensions.get('window');

const collisionThreshold = 15; // Adjust for collision sensitivity
const wheelSize = 200; // Size of the spinning wheel

interface ArrowType {
  id: number;
  angle: number | null;
}

const GameScreen: React.FC = () => {
  const [arrows, setArrows] = useState<ArrowType[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setGameOver] = useState<boolean>(false);
  const rotation = useRef(new Animated.Value(0)).current;
  const fixedArrowPositionY = useRef(new Animated.Value(height - 100)).current;
  const navigation = useNavigation()
  const currentRotation = useRef(0);

  // Start wheel rotation and set up listener
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
        easing: Easing.linear,
      })
    ).start();

    const id = rotation.addListener(({ value }) => {
      currentRotation.current = value;
    });

    return () => {
      rotation.removeListener(id);
    };
  }, [rotation]);

  const launchArrow = () => {
    if (!isGameOver) {
      setArrows([...arrows, { id: arrows.length, angle: null }]);
      moveFixedArrow();
    }
  };

  const moveFixedArrow = () => {
    Animated.timing(fixedArrowPositionY, {
      toValue: height / 2 - wheelSize / 2,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      onArrowReachWheel();
    });
  };

  const onArrowReachWheel = () => {
    // Get the current rotation angle of the wheel
    const wheelRotation = currentRotation.current || 0;
    const currentWheelAngle = ((wheelRotation * 360) % 360);

    // Check for collision with existing arrows
    const collision = arrows.some(
      (arrow) =>
        arrow.angle !== null &&
        Math.abs(arrow.angle - currentWheelAngle) < collisionThreshold
    );

    if (collision) {
      setGameOver(true);
      generateDiscount(score);
    } else {
      // Attach arrow to wheel
      setArrows((prevArrows) =>
        prevArrows.map((arrow) =>
          arrow.angle === null ? { ...arrow, angle: currentWheelAngle } : arrow
        )
      );
      setScore(score + 1);
    }
  };

  const generateDiscount = (finalScore: number) => {
    const discount = finalScore * 2; // Example calculation
    Alert.alert('Game Over', `Your discount is ${discount}%`, [
      { text: 'Exit', onPress: resetGame },
    ]);
  };

  const resetGame = () => {
    navigation.goBack()
    setArrows([]);
    setScore(0);
    setGameOver(false);
    fixedArrowPositionY.setValue(height - 100);
  };

  // Arrow component
  const Arrow: React.FC<{ arrowId: number }> = ({ arrowId }) => {
    const positionY = useRef(new Animated.Value(height - 100)).current;

    useEffect(() => {
      Animated.timing(positionY, {
        toValue: height / 2 - wheelSize / 2,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onArrowReachWheel(arrowId);
      });
    }, [positionY]);

    return (
      <Animated.Image
        source={require('./assets/arrow.png')}
        style={[
          styles.arrow,
          {
            transform: [{ translateY: positionY }],
          },
        ]}
      />
    );
  };

  // Render attached arrows
  const renderAttachedArrows = () => {
    return arrows
      .filter((arrow) => arrow.angle !== null)
      .map((arrow) => {
        const rotateInterpolation = rotation.interpolate({
          inputRange: [0, 1],
          outputRange: [`${arrow.angle}deg`, `${arrow.angle + 360}deg`],
        });

        return (
          <Animated.Image
          key={arrow.id}
          source={require('./assets/arrow.png')}
          style={[
            styles.attachedArrow,
            {
              transform: [
                { rotate: rotateInterpolation },
                { translateY: wheelSize / 2 },
              ],
            },
          ]}
          />
        )
      });
  };

  return (
    <TouchableWithoutFeedback onPress={launchArrow}>
      <View style={styles.container}>
        <View style={styles.gameArea}>
          {/* Spinning Wheel */}
          <Animated.View
            style={[
              styles.wheel,
              {
                transform: [
                  {
                    rotate: rotation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '360deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <Image source={require('./assets/tree-trunk.png')} style={{
              width: wheelSize,
              height: wheelSize,
            }} />
            {/* Render attached arrows */}
            {renderAttachedArrows()}
          </Animated.View>

          {/* Launching Arrows */}
          {arrows
            .filter((arrow) => arrow.angle === null)
            .map((arrow) => (
              <Arrow key={arrow.id} arrowId={arrow.id} />
            ))}

          {/* Fixed Arrow at Bottom */}
          <Image source={require('./assets/arrow.png')} style={styles.fixedArrow} />

          {/* Score */}
          <Text style={styles.score}>Score: {score}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1D',
  },
  gameArea: {
    flex: 1,
    alignItems: 'center',

  },
  wheel: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrow: {
    position: 'absolute',
    width: 10,
    height: 50,
    backgroundColor: '#6F2232',
    bottom: 100,
    left: width / 2 - 5,
    borderRadius: 5,
  },
  attachedArrow: {
    position: 'absolute',
    width: 100,
    height: 150
  },
  fixedArrow: {
    position: 'absolute',
    width: 100,
    height: 150,
    bottom: 50,
  },
  score: {
    position: 'absolute',
    bottom: 20,
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default GameScreen;
