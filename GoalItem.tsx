import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Modal, TextInput, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface GoalItemProps {
  text: string;
  onDelete: () => void;
  onEdit: (editedText: string) => void; 
  darkMode: boolean;
}

const GoalItem: React.FC<GoalItemProps> = (props) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedText, setEditedText] = useState<string>(props.text);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  
    const toggleCheckBox = () => {
      setIsChecked(!isChecked);
    };
  
    const handleEditPress = () => {
      setEditedText(props.text);
      setIsModalVisible(true);
    };
  
    const handleEditDone = () => {
      setIsModalVisible(false);
      props.onEdit(editedText);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

     const modalBackgroundColor = props.darkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.5)';
     const modalColor = props.darkMode ? '#457b9d'   :'white' ;
     const modalFontColor = props.darkMode ? 'white' :  'black' ;
     const moderBottom = props.darkMode ? 'white'  :  'grey';
  
    return (
      <View>
        <TouchableOpacity
          style={[
            styles.goalItem,
            isChecked ? styles.checkItem : styles.uncheckItem,
          ]}
          onPress={toggleCheckBox}
          onLongPress={handleEditPress}
        >
          {isChecked ? (
            <Icon name="check-box" size={30} color="#fff" />
          ) : (
            <Icon name="check-box-outline-blank" size={30} color="#fff" />
          )}
          <Text style={styles.goalText}>{props.text}</Text>
          <TouchableOpacity>
          <Icon name="delete" size={30} color="#fff" onPress={props.onDelete}/>
          </TouchableOpacity>
        
        </TouchableOpacity>
  
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsModalVisible(false)}
        >
             <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBackground, { backgroundColor: modalBackgroundColor } ]}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalContent, {backgroundColor: modalColor}]}>
              <TextInput
                style={[styles.editInput, {color: modalFontColor} , {borderBottomColor: moderBottom}]}
                value={editedText}
                onChangeText={(text) => setEditedText(text)}
                autoFocus
              />
               <TouchableOpacity style={styles.button} onPress={handleEditDone}>
            <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
            </TouchableWithoutFeedback>
          </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  };


const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        padding: 6,
        borderRadius: 6,
        backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 5
    },
    goalText: {
        color: 'white',
        fontSize: 17,
        fontFamily: 'Poppins-Medium',
        
    },
    checkBox: {
        height: 25,
        width: 25,
        borderColor: 'white',
        borderWidth: 5
    },
    checkItem:
    {
        backgroundColor: '#29bf12'
    },
    uncheckItem:
    {
        backgroundColor: '#f27059'
    },
      modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        width: '80%',
        
      },
      editInput: {
        color: 'black',
        fontSize: 16,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        textAlign: 'center',
        fontFamily: 'Poppins-Medium'
        
      },

      button: {
        backgroundColor: 'blue',
        padding: 9,
        borderRadius: 5,
        alignItems:'center'
      },
      buttonText: {
        color: 'white',
        fontSize: 18, // Adjust the font size as needed
        fontFamily: 'Poppins-Medium', // Specify your custom font family
        textAlign: 'center',
      }

    });

export default GoalItem;
