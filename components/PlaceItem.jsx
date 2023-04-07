import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native'
import React from 'react'

import { COLORS } from '../constants'

const PlaceItem = ({ id, title, image, address, onSelect, onDelete }) => {
    //console.log(id)
    const onHandleDeletePlace = () => {
        onDelete(id)
    }
    return (
        <TouchableOpacity onPress={onSelect} style={styles.placeItem}>
            <Image style={styles.image} source={{ uri: image }} />
            <View style={styles.info}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.address}>{address}</Text>
            </View>
            <Button title="Eliminar" onPress={onHandleDeletePlace} />
        </TouchableOpacity>
    )
}

export default PlaceItem

const styles = StyleSheet.create({
    placeItem: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 16,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: COLORS.PEACH_PUFF
    },
    info: {
        marginLeft: 25,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    title: {
        color: COLORS.BLUSH,
        fontSize: 18,
        marginBottom: 6
    },
    address: {
        color: '#777',
        fontSize: 16,
    }
})