import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type CounterProps = {
  increment?: number;
};

export default function CounterApp({ increment = 1 }: CounterProps) {
  const [count, setCount] = useState(0);

  const increase = () => {
    setCount(count + increment);
  };

  const decrease = () => {
    if (count > 0) {
      setCount(Math.max(0, count - increment));
    }
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter App</Text>

      <Text style={styles.counter}>{count}</Text>

      <View style={styles.buttonRow}>
        <Pressable style={styles.button} onPress={decrease}>
          <Text style={styles.buttonText}>−</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={increase}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>

      <Pressable style={styles.resetButton} onPress={reset}>
        <Text style={styles.resetText}>Reset</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  counter: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 30,
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 20,
  },

  button: {
    width: 70,
    height: 60,
    backgroundColor: '#222',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },

  resetButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: '#ddd',
    borderRadius: 10,
  },

  resetText: {
    fontSize: 18,
    fontWeight: '600',
  },
});