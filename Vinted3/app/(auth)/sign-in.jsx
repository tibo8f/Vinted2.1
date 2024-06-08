import React, { useState } from 'react';
import { Image, View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text, ScrollView} from 'react-native';
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleLogin = async () => {
    console.log("login")
    router.replace("/home");
    if (!email || !password) {
      Alert.alert('Input Error', 'Please fill in both email and password fields.');
      return;
    }

    try {
      const response = await fetch("http://172.20.10.4:3000/api/mobileconnection", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Login successful, navigate to the next screen
        await AsyncStorage.setItem("token", data.token); // Store the token
        console.log('Login successful, here is the token', data);
        router.replace("/home");
      } else {
        // Login failed, display error message
        Alert.alert('Login Failed', 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'An error occurred during login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#333" />
      </TouchableOpacity> */}
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.title}>Sign In</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholderTextColor="#aaa"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/sign-up')}>
          <Text style={styles.signupText}>
            Don't have an account?
            <Text style={styles.signupLinkText}> Create an account</Text>
          </Text>
        </TouchableOpacity>
        
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f7',
  },
  backButton: {
    position: 'absolute',
    top: 60, // Adjust as necessary for your layout
    left: 20,
    zIndex: 1,
  },
  header: {
    marginTop:200,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#007782',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#333',
  },
  signupLinkText: {
    textDecorationLine: 'underline',
    color: 'gray',
  },
  scrollView: {
    height: "100%",
  },
  
});

export default Login;
