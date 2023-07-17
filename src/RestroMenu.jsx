import React from 'react'
import Navbar from './Navbar'
import Product from './Product'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const RestroMenu = () => {

    

  const [data, setData] = useState(null);
  const [restroData, setRestroData] = useState(null);
  const [restroCouponData, setRestroCouponData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
 

  const [totalOpenRestaurants, setTotalOpenRestaurants] = useState(0)
  const { id } = useParams();
    console.log(id);
  const getCard = async () => {
    // console.log("restro id = ");
    const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.5729847&lng=77.32490430000001&restaurantId=${id}&submitAction=ENTER`;
    const corsProxy = "https://corsProxy.io/?";
    try {
      const response = await fetch(corsProxy + url);
      const jsonData = await response.json();
      const res = jsonData.data.cards[0].card.card.info;
      const restroRes = jsonData.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards;
      const restroCouponRes = jsonData.data.cards[1].card.card.gridElements.infoWithStyle.offers;
      const restroId = jsonData.data.id;
      // console.log(jsonData.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[2].card.card.itemCards);
      setData(res);
      setRestroData(restroRes);
      setRestroCouponData(restroCouponRes);
      console.log(restroData);
      setIsLoaded(true);
      // console.log(restroRes.length);
      // console.log(restroData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  

  useEffect(() => {
    // console.log("working");
    getCard();
  }, [])



  return (
    <>
        <Navbar />
        {isLoaded? (
          <Product isLoaded={isLoaded} data={data} restroData={restroData} restroCouponData={restroCouponData} restroId={id} />
        ) : (<div>Loading the data which is slow</div>)}
    
    </>
  )
}

export default RestroMenu