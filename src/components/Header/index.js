import React, { useState } from "react";
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, Modal, Image } from "react-native";
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';


const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export default function Header({ name }) {
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
        <TouchableOpacity activeOpacity={0.9} style={styles.buttonUser} onPress={openModal}>
          {selectedImage ? (
            <Image source={{ uri: selectedImage }} style={styles.userImage} />
          ) : (
            <Feather name="user" size={27} color="black" />
          )}
        </TouchableOpacity>
        <Text style={styles.username}>Pablo Dezuani</Text>
      </View>

      <Modal
        animationType='none'
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha uma opção:</Text>
            <TouchableOpacity style={styles.modalOption} onPress={handleOpenCamera}>
              <Feather name="camera" size={20} color="#4a90e2" />
              <Text style={styles.modalOptionText}>Tirar Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={handleOpenGallery}>
              <Feather name="image" size={20} color="#4a90e2" />
              <Text style={styles.modalOptionText}>Escolher Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => { closeModal(); }}>
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
      backgroundColor:'#171615',
      paddingTop: statusBarHeight,
      flexDirection: 'row',
      paddingStart: 16,
      paddingEnd: 16,
      paddingBottom: 44,
    },
    content: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      color:'pink'
    },
    username: {
      fontSize: 14,
      color :'#FFF',
      fontWeight: 'bold'
    },
    buttonUser: {
      width: 44,
      height: 44,
      backgroundColor: 'rgba(255,255,255,0.5)',
      justifyContent: "center",
      alignItems: 'center',
      borderRadius: 44 / 2,
    },
    modalContainer: {
      flex: 1,
      backgroundColor: 'transparent',
      alignItems:'flex-start',
      justifyContent:'flex-end',
      marginLeft:6
    },
    modalContent: {
      backgroundColor: '#171615',
      width:400,
      padding: 20,
      borderTopLeftRadius:10,
      borderTopRightRadius:10,
      alignItems: 'center',
    
    },
    modalTitle: {
      fontSize: 18,
      marginBottom: 20,
      fontWeight: 'bold',
      color:'white'
      
    },
    modalOption: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 15,
      
    },
    modalOptionText: {
      marginLeft: 10,
      fontSize: 16,
      color: '#4a90e2',
    },
    cancelButton: {
      marginTop: 10,
    },
    cancelButtonText: {
      fontSize: 16,
      color: 'red',
    },
  });
