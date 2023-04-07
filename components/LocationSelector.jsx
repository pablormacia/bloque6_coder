import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React, { useState } from "react";
import * as Location from 'expo-location'

import { COLORS } from "../constants";
import MapPreview from "./MapPreview";

import { useNavigation,useRoute } from "@react-navigation/native";
import { useEffect } from "react";

import MapView from 'react-native-maps'

const LocationSelector = ({onLocation}) => {
    const [pickedLocation, setPickedLocation] = useState()
    const navigation = useNavigation();
    const route = useRoute()

    const handleGetLocation = async () => {
        const isLocationOk = await verifyPermissions()
        if (!isLocationOk) return;
        
        const location = await Location.getCurrentPositionAsync({
            timeout: 5000,
        })

        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        })

       onLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        })
    }

    const verifyPermissions = async () => {
        const {status} = await Location.requestForegroundPermissionsAsync()

        if (status !=='granted') {
            Alert.alert('Permisos insuficientes')
            return false;
        }
        return true
    }

    const handlePickOnMap= async () => {
        const isLocationOk = await verifyPermissions()
        if (!isLocationOk) return

        navigation.navigate("Map")
    }

    const mapLocation = route?.params?.mapLocation;
    //console.log("mapLocation:", mapLocation)

    useEffect(()=>{
        if(mapLocation) {
            setPickedLocation(mapLocation)
            onLocation(mapLocation)
        }
    })
    //console.log("pickedLocation: ", pickedLocation)
  return (
    <View style={styles.container}>
        <MapPreview style={styles.preview} location={pickedLocation}>
            <Text>Esperando ubicación...</Text>
        </MapPreview>
        <View style={styles.action}>
            <Button
                title="Obtener ubicación"
                color={COLORS.PEACH_PUFF}
                onPress={handleGetLocation}
            />
            <Button 
                title="Elegir del mapa"
                color={COLORS.LIGTH_PINK}
                onPress={handlePickOnMap}
            />
        </View>
    </View>
  );
};

export default LocationSelector;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    preview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.BLUSH,
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});
