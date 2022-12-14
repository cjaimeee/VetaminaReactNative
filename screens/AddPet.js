import React, { useState, useEffect } from 'react';
import {View, Button, Image, Text, StyleSheet, TextInput, ScrollView, Alert, TouchableOpacity} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

const AddPetScreen = ( {navigation} ) => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [sex, setSex] = useState('');
    const [breed, setBreed] = useState('');
    const [date, setBirthdate] = useState(new Date());
    const [weight, setWeight] = useState('');
    const [description, setDescription] = useState('');

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    //dropdown
    const petType = [
        { label: 'Dog', value: 'Dog' },
        { label: 'Cat', value: 'Cat' },
    ];
    const [isFocuspetType, setIsFocuspetType] = useState(false);

    const petSex = [
        { label: 'M', value: 'M' },
        { label: 'F', value: 'F' },
    ];
    const [isFocuspetSex, setIsFocuspetSex] = useState(false);

    const petDogBreed = [
        { label: 'Aspin', value: 'Aspin' },
        { label: 'Australian Shepherd', value: 'Australian Shepherd' },
        { label: 'Beagle', value: 'Beagle' },
        { label: 'Boxer', value: 'Boxer' },
        { label: 'Bulldog', value: 'Bulldog' },
        { label: 'Chow Chow', value: 'Chow Chow' },
        { label: 'Dachshund', value: 'Dachshund' },
        { label: 'Doberman Pincher', value: 'Doberman Pincher' },
        { label: 'French Bulldog', value: 'French Bulldog' },
        { label: 'German Shepherd', value: 'German Shepherd' },
        { label: 'Golden Retriever', value: 'Golden Retriever' },
        { label: 'Great Dane', value: 'Great Dane' },
        { label: 'Labrador Retriever', value: 'Labrador Retriever' },
        { label: 'Miniature Schnauzer', value: 'Miniature Schnauzer' },
        { label: 'Pembroke Welsh Corgi', value: 'Pembroke Welsh Corgi' },
        { label: 'Pointers (German Shorthaired)', value: 'Pointers (German Shorthaired)' },
        { label: 'Poodle', value: 'Poodle' },
        { label: 'Rottweiler', value: 'Rottweiler' },
        { label: 'Siberian Husky', value: 'Siberian Husky' },
        { label: 'Shih Tzu', value: 'Shih Tzu' },
        { label: 'Yorkshire Terrier', value: 'Yorkshire Terrier' },
    ];
    const petCatBreed = [
        { label: 'Abyssinian', value: 'Abyssinian' },
        { label: 'American Curl', value: 'American Curl' },
        { label: 'American Shorthair', value: 'American Shorthair' },
        { label: 'Bengal', value: 'Bengal' },
        { label: 'Birman', value: 'Birman' },
        { label: 'British Shorthair', value: 'British Shorthair' },
        { label: 'Devon Rex', value: 'Devon Rex' },
        { label: 'Exotic Shorthair', value: 'Exotic Shorthair' },
        { label: 'Himalayan', value: 'Himalayan' },
        { label: 'Maine Coon', value: 'Maine Coon' },
        { label: 'Oriental Shorthair', value: 'Oriental Shorthair' },
        { label: 'Persian', value: 'Persian' },
        { label: 'Philippine Shorthair (Puspin)', value: 'Philippine Shorthair (Puspin)' },
        { label: 'Ragdoll', value: 'Ragdoll' },
        { label: 'Russian Blue', value: 'Russian Blue' },
        { label: 'Siamese', value: 'Siamese' },
        { label: 'Sphynx', value: 'Sphynx' },
    ];
    const [isFocuspetBreed, setIsFocuspetBreed] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setBirthdate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        }, 
        );
    };

    const showDatepicker = () => {
        showMode('date');
    };

    var userID = global.id;

    const AddPetBtn = async () => {
        try{
            const response = await fetch('http://10.0.2.2:8000/api/add-pets', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user_id: userID,
                    pet_name: name,
                    pet_type: type,
                    pet_sex: sex,
                    pet_breed: breed,
                    pet_birthdate: date.toLocaleDateString(),
                    pet_weight: weight,
                    pet_description: description
                })
            });
            if ((response).status === 201) {
                setName('');
                setType('');
                setSex('');
                setBreed('');
                setWeight('');
                setDescription('');
                Alert.alert('Pet Added!')
                navigation.navigate('Pets');
            } else {
                Alert.alert('Please Complete The Form')
            }
        const json = await response.json();
        setData(json.pets);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }

    return (
    <View style = {{ flex: 1, padding: 30 }}>
        <ScrollView style = { styles.square }>
        <Text style = { styles.header }>Pet Information</Text>

        <View style={{borderBottomColor: 'gray', borderBottomWidth: StyleSheet.hairlineWidth, marginTop: 10}}></View>
        
        <TextInput 
        style = { styles.input }
        onChangeText = { (text) => [setName(text)] }
        placeholder='Enter Name'
        placeholderTextColor= 'gray'
        maxLength={15} 
        />
        <Dropdown
        style={[styles.input, isFocuspetType && { borderColor: 'green' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={petType}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocuspetType ? 'Select Pet Type' : '...'}
        value={type}
        onFocus={() => setIsFocuspetType(true)}
        onBlur={() => setIsFocuspetType(false)}
        onChange={item => {
            setType(item.value);
            setIsFocuspetType(false);
        }}
        />
        <Dropdown
        style={[styles.input, isFocuspetSex && { borderColor: 'green' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={petSex}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocuspetSex ? 'Select Sex' : '...'}
        value={sex}
        onFocus={() => setIsFocuspetSex(true)}
        onBlur={() => setIsFocuspetSex(false)}
        onChange={item => {
            setSex(item.value);
            setIsFocuspetSex(false);
        }}
        />
        <Dropdown
        style={[styles.input, isFocuspetBreed && { borderColor: 'green' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={type == 'Dog' ? petDogBreed : petCatBreed}
        maxHeight={300}
        labelField="label"
        valueField="value"
        search
        placeholder={!isFocuspetBreed ? 'Select Breed' : '...'}
        value={breed}
        onFocus={() => setIsFocuspetBreed(true)}
        onBlur={() => setIsFocuspetBreed(false)}
        onChange={item => {
            setBreed(item.value);
            setIsFocuspetBreed(false);
        }}
        />

        <Text style = {styles.birthdateText}>{date.toLocaleDateString()}</Text>
        <TouchableOpacity style = {styles.btnBirthdate} onPress={showDatepicker} title="Show date picker!">
            <Text style = {styles.btnText}>Select Birthdate</Text>
        </TouchableOpacity>
        
        <TextInput 
        style = { styles.input }
        onChangeText = { (text) => [setWeight(text)] }
        placeholder='Enter Weight(kg)'
        placeholderTextColor= 'gray'
        maxLength={15} 
        keyboardType={'number-pad'}
        />
        <TextInput 
        style = { styles.input }
        onChangeText = { (text) => [setDescription(text)] }
        placeholder='Enter Description'
        placeholderTextColor= 'gray'
        maxLength={15} 
        />
        <TouchableOpacity style = {styles.btn} onPress = { AddPetBtn }>
            <Text style = { styles.btnText }>Finish</Text>
        </TouchableOpacity>

        </ScrollView>

    </View>
    );
}

const styles = StyleSheet.create({
    pic: {
    width: 150,
    height: 150,
    borderRadius: 10,
    },
    header: {
    fontSize: 30,
    color: 'rgb(73, 80, 74)',
    fontWeight: 'bold'
    },
    input: {
    padding: 2,
    height: 40,
    marginBottom: 5,
    marginTop: 5,
    borderColor: 'gray',
    borderBottomWidth: 1.5,
    shadowRadius: 10,
    fontSize: 16,
    color: 'black',
    },
    inputDate: {
    padding: 2,
    width: 90,
    height: 40,
    marginBottom: 5,
    marginTop: 5,
    borderColor: 'gray',
    borderBottomWidth: 1.5,
    shadowRadius: 10,
    fontSize: 16,
    color: 'black',
    },
    inputDateRow: {
    padding: 2,
    width: 90,
    height: 40,
    marginBottom: 5,
    marginTop: -45,
    marginLeft: 105,
    borderColor: 'gray',
    borderBottomWidth: 1.5,
    shadowRadius: 10,
    fontSize: 16,
    color: 'black',
    },
    inputDateRow2: {
    padding: 2,
    width: 90,
    height: 40,
    marginBottom: 5,
    marginTop: -45,
    marginLeft: 210,
    borderColor: 'gray',
    borderBottomWidth: 1.5,
    shadowRadius: 10,
    fontSize: 16,
    color: 'black',
    },
    btnText:{
    color: 'white',
    fontSize: 14,
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    },
    btn:{
    backgroundColor: 'rgb(80, 140, 2)',
    color: 'white',
    width: 250,
    height: 35,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
    },
    dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    },
    placeholderStyle: {
    fontSize: 16,
    color: 'gray',
    },
    selectedTextStyle: {
    fontSize: 16,
    color: 'black',
    },
    square:{
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    borderTopColor: 'green',
    borderTopWidth: 5
    },
    btnBirthdate:{
    backgroundColor: 'rgb(80, 140, 2)',
    color: 'white',
    width: 150,
    height: 35,
    borderRadius: 5,
    marginLeft: 110,
    marginTop: 20,
    marginBottom: 10,
    },
    birthdateText:{
    color: 'gray',
    fontSize: 16,
    marginLeft: 10,
    marginBottom: -45,
    marginTop: 20,
    },
    btnText:{
    color: 'white',
    fontSize: 14,
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    },
})

export default AddPetScreen;