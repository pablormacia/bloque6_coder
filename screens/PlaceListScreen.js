import React, { useEffect} from 'react'
import { FlatList} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import PlaceItem from '../components/PlaceItem'
import { loadAddress } from '../store/places.actions'

const PlaceListScreen = ({navigation}) => {
    const places = useSelector(state=>state.places.places)
    //console.log(places)
    const dispatch = useDispatch()
    const renderPlaceItem = (data) => (
        <PlaceItem  
            title={data.item.title}
            image={data.item.image}
            address={data.item.address}
            onSelect={()=>navigation.navigate("Detalle",{placeId: data.item.id})}
        />
    )


    useEffect(()=>{
        dispatch(loadAddress())
    },[])

    return (
        
        <FlatList style={{flex:1}}
            data={places}
            renderItem={renderPlaceItem}
            keyExtractor ={item => item.id}
        />
        
    )
}



export default PlaceListScreen
