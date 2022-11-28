import React, { useEffect, useState } from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, FlatList} from 'react-native';

const MedicalRecordScreen = ( {navigation, route} ) => {
    var pet_ID = route.params.petID;
    var pet_NAME = route.params.petNAME;

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getRecords = async () => {
        try {
        const response = await fetch(`http://localhost:8000/api/medicalrecord/${pet_ID}`);
        const json = await response.json();
        setData(json.medical_records);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }

    const refresh =  () => {
        setLoading(true);
        getRecords();
    }

    const testFunc = () => {
        while(isLoading){
          return (<ActivityIndicator size="large" color="green"></ActivityIndicator>);
        }
        if ( data.length == 0 ) {
          return (
            <Text style = {{ fontSize: 20, color: 'gray', justifyContent: 'center', textAlign: 'center', marginTop: 150 }}> No Medical Record Yet :{'('}</Text>
          )
        } else {
          return (
            <FlatList
            style = {{ height: 450 }}
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
            <View style = {{ margin: 5 }}>
                <Text style = {styles.date}>{item.Date}</Text>
                <Text style = {styles.weight}>{item.Weight} kg</Text>
                <Text style = {styles.lotNo}>{item.Against_Manufacturer_LotNo}</Text>
                <Text style = {styles.vet}>{item.vet_name}</Text>
            </View>
            )}
            />
          )
        }
      }

    useEffect(() => {
        getRecords();
    }, []); 

    return(
        <View style = { styles.body }>
            <TouchableOpacity onPress={ () => navigation.goBack(null)}>
                <Image source = { require('../images/back.png')} style = {styles.back}/>
            </TouchableOpacity>

            <View style = {styles.whiteBox}>
                <Text style = { styles.header }>Medical Record</Text>
                {testFunc()}
            </View>
            <TouchableOpacity style = {styles.refresh} onPress={ refresh }>
                <Text style = {{ fontSize: 16, color: 'white' }}>Refresh</Text>
            </TouchableOpacity>
            

        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        backgroundColor: 'rgb(109, 169, 22)',
        flex: 1,
        fontFamily: 'Roboto',
    },
    back: {
        width: 30,
        height: 30,
        marginLeft: 15,
        marginTop: 30
    },
    header: {
        fontSize: 30,
        color: '#504949',
        fontWeight: 'bold'
    },
    weight:{
        fontSize: 16,
        color: 'black',
    },
    date:{
        color:'gray',
        fontSize: 14,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
    },
    lotNo:{
        fontSize: 16,
        color: 'black',
        marginTop: -20,
        marginLeft: 60
    },
    vet:{
        fontSize: 16,
        color: 'black',
        marginTop: -20,
        marginLeft: 220
    },
    whiteBox: {
        width: 360,
        flex: 1,
        marginTop: 180,
        padding: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowOffset: {width: 6, height: 6},
        shadowRadius: 10,
        shadowColor: 'white',
        shadowOpacity: 1,
        backgroundColor: 'white',
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
        width: 300,
        height: 35,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 20,
    },
    refresh: {
        position: 'absolute',
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        left: 30,
        bottom: 20,
        backgroundColor: 'brown',
        borderRadius: 50,
    },
})

export default MedicalRecordScreen;