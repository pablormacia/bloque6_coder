import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React, { useState } from "react";
import * as Location from 'expo-location'

import { COLORS } from "../constants";
import MapPreview from "./MapPreview";

const LocationSelector = ({onLocation}) => {
    const [pickedLocation, setPickedLocation] = useState()

    const handleGetLocation = async () => {
        const isLocationOk = await veryPermissions()
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

    const veryPermissions = async () => {
        const {status} = await Location.requestForegroundPermissionsAsync()

        if (status !=='granted') {
            Alert.alert('Permisos insuficientes')
            return false;
        }
        return true
    }

  return (
    <View style={styles.container}>
        <MapPreview style={styles.preview}>
            {pickedLocation
                ? <Text>{pickedLocation.lat},{pickedLocation.lng}</Text>
                : <Text>Esperando ubicación...</Text>
            }
        </MapPreview>
        <Button
            title="Obtener ubicación"
            color={COLORS.PEACH_PUFF}
            onPress={handleGetLocation}
        />
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
    }
});
