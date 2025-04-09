import React, { useRef, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system'; // Handles file saving
import validator from 'validator';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const qrCodeRef = useRef(null); // Reference for QRCode

  const generateQRCode = () => {
    if (!inputText.trim()) {
      Alert.alert('Error', 'Please enter text or a URL to generate a QR code.');
      return;
    }

    // Validate input (check if it's a valid URL or meaningful text)
    if (!validator.isURL(inputText) && inputText.includes(' ')) {
      Alert.alert('Error', 'Please enter a valid URL or meaningful text.');
      return;
    }

    setShowQRCode(true); // Show the QR Code after validation
  };

  const clearInput = () => {
    setInputText(''); // Clear the input field
    setShowQRCode(false); // Hide the QR Code when clearing the input
  };

  const saveQRCodeToGallery = async () => {
    if (!qrCodeRef.current) {
      Alert.alert('Error', 'No QR code to save.');
      return;
    }

    try {
      // Request media library permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Error', 'Permission to access media library is required.');
        return;
      }

      // Get QR code as Base64 string using `toDataURL` method
      qrCodeRef.current.toDataURL(async (data) => {
        const fileUri = `${FileSystem.cacheDirectory}qrcode.png`; // Define file path in cache directory

        // Save Base64 image as a file
        await FileSystem.writeAsStringAsync(fileUri, data, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Save the file to the gallery
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        await MediaLibrary.createAlbumAsync('QR Codes', asset, false);

        Alert.alert('Success', 'QR code saved to gallery!');
      });
    } catch (error) {
      console.error('Error saving QR code:', error);
      Alert.alert('Error', 'Failed to save QR code.');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        QR Code Generator
      </Text>

      {/* Input field for text or URL */}
      <TextInput
        mode="outlined"
        label="Enter text or URL"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
        style={styles.input}
      />

      {/* Generate QR Code Button */}
      <Button mode="contained" onPress={generateQRCode} style={styles.button}>
        Generate QR Code
      </Button>

      {/* Clear Input Button */}
      <Button mode="outlined" onPress={clearInput} style={styles.clearButton}>
        Clear Input
      </Button>

      {/* Display generated QR Code */}
      {showQRCode && inputText.trim() && ( // Only render QRCode if input is valid and not empty
        <Card style={styles.qrContainer}>
          <QRCode value={inputText} size={200} getRef={(c) => (qrCodeRef.current = c)} />
          <Button mode="contained" onPress={saveQRCodeToGallery} style={styles.saveButton}>
            Save to Gallery
          </Button>
          <Text>QR Code Generated Successfully!</Text>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  button: {
    marginBottom: 20,
  },
  clearButton: {
    marginBottom: 20,
  },
  qrContainer: {
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
  saveButton: {
    marginTop: 10,
  },
});
