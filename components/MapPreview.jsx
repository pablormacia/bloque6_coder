import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {MAP} from '../constants'

const MapPreview = ({location,children, style}) => {
    const mapPreviewUrl = location
        ? `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}
        &zoom=13&size=600x300&mapType=roadmap&markers=color:blue%7label:S%7C${location.lat},${location.lng}
        &key=${MAP.API_KEY}`
        : '';
  return (
    <View style={{...styles.MapPreview, ...style}}>
      {location
        ?<Image style={styles.mapImage} source={{uri:mapPreviewUrl}} />
        : (children)}
        </View>
  )
}

export default MapPreview

const styles = StyleSheet.create({
    mapPreview: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    mapImage: {
        width: '100%',
        width: '100%'
    }
})