import React, { useRef, useState } from 'react';
import { View, StyleSheet, Alert, ScrollView, Linking } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system'; // Handles file saving
import validator from 'validator';
import { SocialIcon } from '@rneui/themed'; // Import SocialIcon

export default function App() {
  const [inputText, setInputText] = useState('');
  const [showQRCode, setShowQRCode] = useState(false);
  const qrCodeRef = useRef(null); // Reference for QRCode

  const generateQRCode = () => {
    if (!inputText.trim()) {
      Alert.alert('Error', 'Please enter text or a URL to generate a QR code.');
      return;
    }

    if (!validator.isURL(inputText) && inputText.includes(' ')) {
      Alert.alert('Error', 'Please enter a valid URL or meaningful text.');
      return;
    }

    setShowQRCode(true);
  };

  const clearInput = () => {
    setInputText('');
    setShowQRCode(false);
  };

  const saveQRCodeToGallery = async () => {
    if (!qrCodeRef.current) {
      Alert.alert('Error', 'No QR code to save.');
      return;
    }

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Error', 'Permission to access media library is required.');
        return;
      }

      qrCodeRef.current.toDataURL(async (data) => {
        const fileUri = `${FileSystem.cacheDirectory}qrcode.png`;

        await FileSystem.writeAsStringAsync(fileUri, data, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const asset = await MediaLibrary.createAssetAsync(fileUri);
        await MediaLibrary.createAlbumAsync('QR Codes', asset, false);

        Alert.alert('Success', 'QR code saved to gallery!');
      });
    } catch (error) {
      console.error('Error saving QR code:', error);
      Alert.alert('Error', 'Failed to save QR code.');
    }
  };

  // Function to open external links
  const openLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url); // Open the URL in the browser
      } else {
        Alert.alert('Error', `Can't open this URL: ${url}`);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="headlineLarge" style={styles.title}>
        QR Code Generator
      </Text>

      <TextInput
        mode="outlined"
        label="Enter text or URL"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
        style={styles.input}
      />

      <Button mode="contained" onPress={generateQRCode} style={styles.button}>
        Generate QR Code
      </Button>

      <Button mode="outlined" onPress={clearInput} style={styles.clearButton}>
        Clear Input
      </Button>

      {showQRCode && inputText.trim() && (
        <Card style={styles.qrContainer}>
          <QRCode value={inputText} size={200} getRef={(c) => (qrCodeRef.current = c)} />
          <Button mode="contained" onPress={saveQRCodeToGallery} style={styles.saveButton}>
            Save to Gallery
          </Button>
          <Text>QR Code Generated Successfully!</Text>
        </Card>
      )}

      {/* Social Media Icons */}
      <View style={styles.socialIconsContainer}>
        {/* GitHub Icon */}
        <SocialIcon
          type="github"
          onPress={() => openLink('https://github.com/Asithakanchana1')} // My Github Account
        />
        
        {/* LinkedIn Icon */}
        <SocialIcon
          type="linkedin"
          onPress={() => openLink('https://linkedin.com/in/asithakanchana')} // My Linkdn Account
        />
        
        {/* Add more icons if needed */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
  },
});
