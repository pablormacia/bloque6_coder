import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import {MAP} from '../constants'

const MapPreview = ({location,children, style}) => {
    //console.log("MapPreview lat",location.lat)
    const mapPreviewUrl = location
        ? `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C${location.lat},${location.lng}&key=${MAP.API_KEY}`
        : '';
    //console.log("MapPreview URL", mapPreviewUrl)
  return (
    <View style={{...styles.mapPreview, ...style}}>
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
        height: '100%'
    }
})