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
  const { id } = useParams();
  const getCard = async () => {
    try {
      const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.5729847&lng=77.32490430000001&restaurantId=${id}&submitAction=ENTER`;
      const corsProxy = "https://corsProxy.io/?";
      const response = await fetch(corsProxy + url);
      const jsonData = await response.json();
      const res = jsonData.data.cards[0].card.card.info;
      let restroRes = jsonData.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards;
      if (restroRes[1].card.card.categories) {
        const a = restroRes[1].card.card.categories[0].itemCards;
        restroRes=a.map(obj=> obj.card.info)
      }
      else if (restroRes[1].card.card.carousel) {
        const a = restroRes[1].card.card.carousel;
        restroRes=a.map(obj=> obj.dish.info)
      }
      else {
        let x = restroRes[1].card.card.itemCards;
        restroRes = x.map((obj) => obj.card.info)
      }

      const restroCouponRes = jsonData.data.cards[1].card.card.gridElements.infoWithStyle.offers;
      // const restroId = jsonData.data.id;
      setData(res);
      setRestroData(restroRes);
      setRestroCouponData(restroCouponRes);
      setIsLoaded(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(()=>{
    getCard();
  },[])

  return (
    <>
      <Navbar />
      {isLoaded ? (
        <Product isLoaded={isLoaded} data={data} restroData={restroData} restroCouponData={restroCouponData} />
      ) : (
          <div class="d-flex justify-content-center" style={{position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)"}} >
            <div class="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
      )}

    </>
  )
}

export default RestroMenu