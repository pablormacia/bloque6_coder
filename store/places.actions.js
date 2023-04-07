import * as FileSystem from "expo-file-system";
import { insertAddres, fetchAddress } from "../db";

export const ADD_PLACE = "ADD_PLACE"
export const LOAD_PLACES = "LOAD_PLACES"

import { MAP } from "../constants";
//console.log("Map:", MAP)

export const addPlace = (title, image, location) => {
  //return { type: ADD_PLACE, payload: {title}}
  return async (dispatch) => {
    const response =
      await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=
        ${location.lat},${location.lng}&key=${MAP.API_KEY}`);

    if (!response.ok)
      throw new Error("No se ha podido comunicar con Google Maps API");

    const resData = await response.json();
    if (!resData.results)
      throw new Error(
        "No se han encontrado datos para las coordenadas seleccionadas"
      );

    const address = resData.results[0].formatted_address;
    //console.log("Address:", address )

    const fileName = image.split("/").pop();
    const Path = FileSystem.documentDirectory + fileName;

    try {
      FileSystem.moveAsync({
        from: image,
        to: Path,
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
    const resultDb = await insertAddress(
      title,
      Path,
      "Address",
      "13.4",
      "10,5"
    );

    console.log(resultDb);

    dispatch({
      type: ADD_PLACE,
      payload: { id: resultDb.insertId, title, image: Path },
    });

    /* dispatch({type: ADD_PLACE, payload: {
            title, 
            image: Path,
            address,
            lat: location.lat,
            lng: location.lng,
        }}) */
  };
};

export const loadAddress = () => {
    return async dispatch => {
        try {
            const result = await fetchAddress()
            console.log(result)
            dispatch({type: LOAD_PLACES, places:result.rows._array})
        } catch(error) {
            throw error
        }
    }
}
