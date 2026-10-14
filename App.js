import React, { Component } from 'react';
import { Animated, Button, StyleSheet, Text, View } from 'react-native';

const SNAPSHOT_COUNT = 50;
const ORBIT_RADIUS = 100;
const ANIMATION_DURATION = 1000;

const inputRange = Array.from(
  { length: SNAPSHOT_COUNT + 1 },
  (_, index) => index / SNAPSHOT_COUNT
);

function createOrbitInterpolation(animatedValue, coordinate) {
  const outputRange = inputRange.map(value =>
    coordinate === 'x'
      ? Math.sin(value * Math.PI * 2) * ORBIT_RADIUS
      : -Math.cos(value * Math.PI * 2) * ORBIT_RADIUS
  );

  return animatedValue.interpolate({ inputRange, outputRange });
}

export default class App extends Component {
  constructor(props) {
    super(props);

    this.animated = new Animated.Value(0);
    this.animate = this.animate.bind(this);
    this.translateX = createOrbitInterpolation(this.animated, 'x');
    this.translateY = createOrbitInterpolation(this.animated, 'y');
  }

  animate() {
    this.animated.setValue(0);
    Animated.timing(this.animated, {
      toValue: 1,
      duration: ANIMATION_DURATION,
    }).start();
  }

  render() {
    const transform = [
      { translateY: this.translateY },
      { translateX: this.translateX },
    ];

    return (
      <View style={styles.container}>
        <Animated.View style={{ transform }}>
          <View style={styles.btn}>
            <Text>hallo</Text>
          </View>
        </Animated.View>
        <Button title="Test" onPress={this.animate} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  btn: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },
});
