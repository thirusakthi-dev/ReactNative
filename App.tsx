import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

import GoalItem from './GoalItem';
import Icon from 'react-native-vector-icons/MaterialIcons';

function App() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [darkMode, setDarkMode] = useState(isDarkMode);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: darkMode ? '#3a506b' : 'white',
    },
    header: {
      padding: 30,
      backgroundColor:  '#01497c',
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontFamily: 'Poppins-Medium',
      fontSize: 21,
      color: 'white',
    }, 
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      
     
    },
    textInput: {
      borderWidth: 1,
      borderColor: darkMode ? 'white' : 'black',
      width: '79%',
      height: '69%',
      marginRight: 10,
      color: darkMode ? 'white' : 'black',
    },
    listContainer: {
      padding: 20,
    },
    goalContainer:
{

},
messageContainer:
{
  flex: 2,
  justifyContent: 'center',
  alignItems: 'center',
  //backgroundColor: 'green'
},

messageText:
{
  color: 'grey',
  fontFamily: 'Poppins-Medium'
},

goalItem:
{
  margin: 8,
  padding: 6,
  borderRadius: 6,
  backgroundColor: 'green',


},

goalText:
{
  color: 'white'

},
inputContainer:
{
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
        
  
},
    darkMode: {
      backgroundColor: '#3a506b',
    },
    button: {
      backgroundColor: '#00b4d8',
      padding: 7,
      borderRadius: 5,
      width: 70,
      alignItems:'center'
    },
    buttonText: {
      color: 'white',
      fontSize: 17, // Adjust the font size as needed
      fontFamily: 'Poppins-Medium', // Specify your custom font family
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 6,
      fontSize: 16,
      width: '80%',
      color: darkMode ? 'white': 'black'
      
    }
  });

  const [goalText, setGoalText] = useState('');
  const [goals, setGoals] = useState<string[]>([]);

  function goalInputHandler(text: string) {
    setGoalText(text);
  }

  function EditItem(index: number, editedText: string) {
    const updatedGoals = [...goals];
    updatedGoals[index] = editedText;
    setGoals(updatedGoals);
  }

  function addGoalHandler() {
    setGoals((currentGoals) => [...currentGoals, goalText]);
    setGoalText('');
  }

  function DeleteItem(index: number) {
    const newGoals = goals.filter((el, i) => i !== index);
    setGoals(newGoals);
  }

  const placeholderColor = darkMode ? '#ced4da' : 'grey';
  return (
    <View style={[styles.mainContainer, darkMode && styles.darkMode]}>
      <View style={styles.header}>
       
        <View style={styles.buttonContainer}>
          <Text style={styles.title}>Build Your Habits</Text>
          <TouchableOpacity onPress={toggleDarkMode} style= {{paddingLeft: '39%'}}>
          <Icon name={darkMode ? 'brightness-7' : 'dark-mode'} size={25} color="white" />
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.listContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={goalInputHandler}
            placeholder="Enter your task"  placeholderTextColor= {placeholderColor}
            style={styles.input} 
            value={goalText}
          />
          {/* <Button onPress={addGoalHandler} title="Add Goal" /> */}
          <TouchableOpacity style={styles.button} 
  onPress={goalText.trim() !== '' ? addGoalHandler : undefined}
  disabled={goalText.trim() === ''}>
            <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
        </View>
        <View style={styles.goalContainer}>
        <Text style = {{paddingTop: 10, paddingBottom: 5, paddingLeft:5, fontFamily: 'Poppins-Medium', fontSize: 17, color: darkMode ? 'white' : 'black', borderBottomWidth: 1, borderBottomColor: 'grey'}}>Today Goals</Text>
          <FlatList
            data={goals}
            renderItem={(itemData) => (
              <GoalItem
                text={itemData.item}
                onDelete={() => DeleteItem(itemData.index)}
                onEdit={(editedText) => EditItem(itemData.index, editedText)} darkMode = {darkMode} 
              />
            )}
          />
        </View>
      </View>
    </View>
  );
}

export default App;
