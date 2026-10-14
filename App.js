import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity, Button, Animated, Text } from 'react-native';

const RADIUS = 100;
const SNAPSHOT = 50;
const DURATION = 1000;

function circularTranslate(animated, { radius, snapshot, axis }) {
  const inputRange = [];
  const outputRange = [];

  for (let i = 0; i <= snapshot; i++) {
    const progress = i / snapshot;
    const angle = progress * Math.PI * 2;
    const offset = axis === 'x' ? Math.sin(angle) * radius : -Math.cos(angle) * radius;
    inputRange.push(progress);
    outputRange.push(offset);
  }

  return animated.interpolate({ inputRange, outputRange });
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.animated = new Animated.Value(0);
    this.translateX = circularTranslate(this.animated, {
      radius: RADIUS,
      snapshot: SNAPSHOT,
      axis: 'x',
    });
    this.translateY = circularTranslate(this.animated, {
      radius: RADIUS,
      snapshot: SNAPSHOT,
      axis: 'y',
    });
  }

  animate = () => {
    this.animated.setValue(0);
    Animated.timing(this.animated, {
      toValue: 1,
      duration: DURATION,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const transform = [{ translateY: this.translateY }, { translateX: this.translateX }];

    return (
      <View style={styles.container}>
        <Animated.View style={{ transform }}>
          <TouchableOpacity style={styles.btn}>
            <Text>hallo</Text>
          </TouchableOpacity>
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
    height: 50,
  },
});
