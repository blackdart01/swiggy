import React from 'react'
import Navbar from '../Components/Navbar'
import Product from '../Components/Product'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const RestroMenu = () => {



  const [data, setData] = useState(null);
  const [restroData, setRestroData] = useState(null);
  const [restroCouponData, setRestroCouponData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);


  const [totalOpenRestaurants, setTotalOpenRestaurants] = useState(0)
  const { id } = useParams();
  const getCard = async () => {
    try {
      const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.5729847&lng=77.32490430000001&restaurantId=${id}&submitAction=ENTER`;
      const corsProxy = "https://corsProxy.io/?";
      const response = await fetch(corsProxy + url);
      const jsonData = await response.json();
      const res = jsonData.data.cards[0].card.card.info;
      let restroRes = jsonData.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[1].card.card;
      if (restroRes.categories) {
        restroRes = jsonData.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[1].card.card.categories[0].itemCards;
      }
      else {
        let x = jsonData.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards;
        x.map((obj, index) => { 
          if (obj.card.card.title == "Recommended"){
            restroRes = jsonData.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[index].card.card.itemCards;
        }})
      }

      // console.log(jsonData.data.cards[2].groupedCard.cardGroupMap.REGULAR);
      const restroCouponRes = jsonData.data.cards[1].card.card.gridElements.infoWithStyle.offers;
      const restroId = jsonData.data.id;
      setData(res);
      setRestroData(restroRes);
      setRestroCouponData(restroCouponRes);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }



  useEffect(() => {
    getCard();
  }, [])



  return (
    <>
      <Navbar />
      {isLoaded ? (
        <Product isLoaded={isLoaded} data={data} restroData={restroData} restroCouponData={restroCouponData} restroId={id} />
      ) : (<div>Loading Data</div>)}

    </>
  )
}

export default RestroMenu