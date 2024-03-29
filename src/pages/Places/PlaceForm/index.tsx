import React, { useEffect, useState } from 'react';

import { getPlaceDetail, getAllPlacesWithTitle, getAllContinents } from 'api/api-place';
import CityForm from './CityForm';
import CountryForm from './CountryForm';
import ChildPlaceForm from './ChildPlaceForm';
import HomePageForm from './HomePageForm';
import usePlace from 'modules/place/place.hook';


const PlaceForm = ({match, placeType}:any) => {


    const placeId = match.params.placeId;
    console.log('placeId -->', placeId);
    const [placeDetail, setPlaceDetail] = useState<any>({});
    const [allPlaces, setAllPlaces] = useState<any>([]);
    const [continents, setAllcontinents] = useState<any>([]);

    const { setPlace } = usePlace();


    useEffect(()=>{
        if(parseInt(placeId) > 0){
            getAllPlacesWithTitle(match.params.placeId).then(data=>{
                setAllPlaces(data.body);
                getPlaceDetail(match.params.placeId).then(data=>{
                    setPlaceDetail(data.body);
                    setPlace(data.body);
                });
            });
            getAllContinents().then(res=>{
                setAllcontinents(res.body);
            }).catch(error=>console.log);
        }

        return ()=>{
            setPlace({});
        };
        
    }, [placeId]);


     if(placeDetail.place_type == 'city'){
         return <CityForm  placeDetail = {placeDetail} allPlaces = {allPlaces} />;
     }
     if(placeDetail.place_type == 'country'){
        return <CountryForm  placeDetail = {placeDetail} continents = {continents} />;
     }

     if(placeDetail.place_type == 'homepage'){
        return <HomePageForm  placeDetail = {placeDetail} />;
     }

    return (
        <>
          <ChildPlaceForm placeDetail = {placeDetail} />
        </>
    );
};

export default PlaceForm; 