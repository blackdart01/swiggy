import React from 'react'
import Tabs from './Tabs'
import Cards from './Cards'
import { useEffect, useState } from 'react'

const Home = () => {

    const [data, setData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    // const [placeName, setPlaceName] = useState(null);
    const [location, setLocation] = useState(null);

    // const getLoc = async () => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 setLocation({
    //                     latitude: position.coords.latitude,
    //                     longitude: position.coords.longitude
    //                 });
    //             },
    //             (error) => {
    //                 console.error('Error getting location:', error);
    //             }
    //         );
    //     } else {
    //         console.error('Geolocation is not supported by your browser');
    //     }
    // }

    // useEffect(() => {
    //     if (location == null) {
    //                 getLoc();
    //     }
    //     else {
    //         console.log(location);
    //          getCard();
    //     }
    // },);

    // const fetchPlaceName = async () => {
    //     if (location.latitude && location.longitude) {
    //         try {
    //             const response = await fetch(
    //                 `https://nominatim.openstreetmap.org/reverse?lat=${location.latitude}&lon=${location.longitude}&format=json`
    //             );
    //             const data = await response.json();
    //             if (data && data.display_name) {
    //                 setPlaceName(data.display_name);
    //             }
    //             console.log("placeName", placeName);
    //         } catch (error) {
    //             console.error('Error fetching place name:', error);
    //         }
    //     }
    // };
    // if(location)
    //     fetchPlaceName();

    const [totalOpenRestaurants, setTotalOpenRestaurants] = useState(0)
    const getCard = async () => {
        // const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${location.latitude}&lng=${location.longitude}&page_type=DESKTOP_WEB_LISTING`;
        const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6125&lng=77.3671&page_type=DESKTOP_WEB_LISTING`;
        const corsProxy = "https://corsProxy.io/?";
        // if (location != null) {
            try {
                const response = await fetch(corsProxy + url);
                const jsonData = await response.json();
                console.log(jsonData);
                const res = jsonData.data.cards[2].data.data;
                setData(res.cards);
                setIsLoaded(true);
                setTotalOpenRestaurants(res.totalOpenRestaurants);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        // }
    }

    useEffect(() => {
        getCard();
    }, [])




    return (
        <>
            <Tabs data={totalOpenRestaurants} />
            {isLoaded ? (
                <Cards data={data} isLoaded={isLoaded} />
            ) : (
                <div>Loading data...</div>
            )
            }
        </>
    )
}

export default Home