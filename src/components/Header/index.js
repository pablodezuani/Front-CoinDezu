import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, Modal, Image } from "react-native";
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/AuthContext';
import * as ImagePicker from 'expo-image-picker';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export default function Header() {
  const { signOut, user } = useContext(AuthContext); // Obtenha as informações do usuário do contexto
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleOpenCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("A permissão para acessar a câmera é necessária!");
      return;
    }
    
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  const handleOpenGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("A permissão para acessar a galeria é necessária!");
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync();
    
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.userInfo}>
          <TouchableOpacity activeOpacity={0.9} style={styles.buttonUser} onPress={openModal}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.userImage} />
            ) : (
              <Feather name="user" size={27} color="black" />
            )}
          </TouchableOpacity>
          <View style={styles.userText}>
            <Text style={styles.username}>{user?.name}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
          <Feather name="log-out" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha uma opção:</Text>
            <TouchableOpacity style={styles.modalOption} onPress={handleOpenCamera}>
              <Feather name="camera" size={16} color="#4a90e2" />
              <Text style={styles.modalOptionText}>Tirar Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={handleOpenGallery}>
              <Feather name="image" size={16} color="#4a90e2" />
              <Text style={styles.modalOptionText}>Escolher Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#004853',
    paddingTop: statusBarHeight,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userText: {
    marginLeft: 10,
  },
  username: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
    paddingLeft: 8,
  },
  userEmail: {
    fontSize: 12,
    color: '#FFF',
    paddingLeft: 8,
  },
  buttonUser: {
    width: 44,
    height: 44,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
  logoutButton: {
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    height: 180,
    width: 200,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 65,
    marginVertical: 50,
  },
  modalTitle: {
    fontSize: 14,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#121212',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    fontWeight:'bold',
    marginBottom: 15,
  },
  modalOptionText: {
    marginLeft: 10,
    fontSize: 12,
       fontWeight:'bold',
    color: '#4a90e2',
  },
  cancelButton: {
    marginTop: 10,
    fontWeight:'bold',
  },
  cancelButtonText: {
    fontSize: 16,
    color: 'red',
  },
});
