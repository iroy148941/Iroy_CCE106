import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState('');
  const [message, setMessage] = useState('');

  const calculate = (operator: string) => {
    setMessage('');
    setResult('');

    if (firstNumber.trim() === '' || secondNumber.trim() === '') {
      setMessage('Please enter both numbers.');
      return;
    }

    const num1 = Number(firstNumber);
    const num2 = Number(secondNumber);

    if (isNaN(num1) || isNaN(num2)) {
      setMessage('Please enter valid numbers.');
      return;
    }

    if (operator === '/' && num2 === 0) {
      setMessage('Cannot divide by zero.');
      return;
    }

    let answer = 0;

    if (operator === '+') {
      answer = num1 + num2;
    } else if (operator === '-') {
      answer = num1 - num2;
    } else if (operator === '*') {
      answer = num1 * num2;
    } else if (operator === '/') {
      answer = num1 / num2;
    }

    setResult(answer.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter first number"
        keyboardType="numeric"
        value={firstNumber}
        onChangeText={setFirstNumber}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter second number"
        keyboardType="numeric"
        value={secondNumber}
        onChangeText={setSecondNumber}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => calculate('+')}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => calculate('-')}
        >
          <Text style={styles.buttonText}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => calculate('*')}
        >
          <Text style={styles.buttonText}>×</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => calculate('/')}
        >
          <Text style={styles.buttonText}>÷</Text>
        </TouchableOpacity>
      </View>

      {message !== '' && (
        <Text style={styles.message}>{message}</Text>
      )}

      {result !== '' && (
        <View style={styles.resultBox}>
          <Text style={styles.resultLabel}>Result</Text>
          <Text style={styles.result}>{result}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 25,
    justifyContent: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    marginBottom: 15,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  button: {
    backgroundColor: '#333',
    width: 70,
    height: 55,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },

  message: {
    color: '#d32f2f',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },

  resultBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginTop: 25,
    alignItems: 'center',
  },

  resultLabel: {
    fontSize: 16,
    color: '#666',
  },

  result: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 5,
  },
});