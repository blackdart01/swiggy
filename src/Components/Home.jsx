import React from 'react'
import Tabs from '../Tabs'
import Cards from './Cards'
import { useEffect, useState } from 'react'

const Home = () => {

    const [data, setData] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);


    const [totalOpenRestaurants, setTotalOpenRestaurants] = useState(0)
    const getCard = async () => {
        // const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${location.latitude}&lng=${location.longitude}&page_type=DESKTOP_WEB_LISTING`;
        const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.5703&lng=77.3218&page_type=DESKTOP_WEB_LISTING`;
        const corsProxy = "https://corsProxy.io/?";
            try {
                const response = await fetch(corsProxy + url);
                const jsonData = await response.json();
                const res = jsonData.data.cards[2].data.data;
                setData(res.cards);
                setIsLoaded(true);
                setTotalOpenRestaurants(res.totalOpenRestaurants);
               
            } catch (error) {
                console.error('Error fetching data:', error);
            }
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