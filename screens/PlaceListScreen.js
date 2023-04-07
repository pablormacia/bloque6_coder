import React, { useState, useEffect} from 'react'
import { FlatList} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import PlaceItem from '../components/PlaceItem'
import { loadAddress,removePlace } from '../store/places.actions'

const PlaceListScreen = ({navigation}) => {
    const places = useSelector(state=>state.places.places)
    //console.log(places)
    const dispatch = useDispatch()

    const onHandleDelete = (id)=> {
        console.log("Remove item:",id )
        dispatch(removePlace(id))
    }


    const renderPlaceItem = (data) => (
        <PlaceItem
            id={data.item.id}  
            title={data.item.title}
            image={data.item.image}
            address={data.item.address}
            onSelect={()=>navigation.navigate("Detalle",{placeId: data.item.id})}
            onDelete={()=>onHandleDelete(data.item.id)}
        />
    )


    useEffect(()=>{
        dispatch(loadAddress())
    },[places])

    return (
        
        <FlatList style={{flex:1}}
            data={places}
            renderItem={renderPlaceItem}
            keyExtractor ={item => item.id}
        />
        
    )
}



export default PlaceListScreen
