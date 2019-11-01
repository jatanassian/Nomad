import React, { useEffect } from 'react';
import axios from 'axios';
import {
  useParams
} from "react-router-dom";
import './CityPage.scss';
import Map from './Map';
import ActivityList from './ActivityList';
import ActivityGallery from './ActivityGallery';
import CityTripForm from './cityTripForm';
import { Redirect } from 'react-router-dom';

export default function CityPage(props) {
  const { id } = useParams();
  const { city, activities, citiesInTrip, hostel_price, airbnb_price, hotel_price, bus_price, train_price, plane_price, dispatch, trip, SET_CITY_DATA, redirect_id } = props;
  
  useEffect(() => {
    if (trip.id) {
    axios.get(`/trips/${trip.id}/cities/${id}`)
      .then(all => {
        dispatch({ type: SET_CITY_DATA, city: all.data[0], activities: all.data[1], citiesInTrip: all.data[2], hostel_price: all.data[3], airbnb_price: all.data[4], hotel_price: all.data[5], bus_price: all.data[6], train_price: all.data[7], plane_price: all.data[8] })
      })
      .catch(err => console.log(err))}
  }, [trip]);
  
  if (city && city[0].id !== redirect_id) {
    return <Redirect to={`/cities/${redirect_id}`} />
  }
  return (
    <div className="city-page">
      <header className="city-page-header">
        <div className="header-content">
          <h4>Welcome to</h4>
          <h1>{city ? city[0].name : null}</h1>
          <p>SPAIN</p>
          {<CityTripForm submitCityTrip={props.submitCityTrip}/>}
        </div>
        <div className="background-overlay"></div>
        <img className="header-background" src={city ? city[0].image : null} alt="City Background"/>
      </header>
      <section className="city-page-subnav">
        <p className="hvr-grow">OVERVIEW</p>
        <p className="hvr-grow">EXPERIENCES</p>
        <p className="hvr-grow">GALLERY</p>
        <p className="hvr-grow">ABOUT</p>
        <p className="hvr-grow">MORE</p>
      </section>
      <section className="city-page-container">
        <div className="left-side">
          <div className="city-description">
            <h2><img src="https://image.flaticon.com/icons/svg/2150/2150088.svg"/>Description</h2>
            <p>{city ? city[0].description : null}</p>
          </div>
          <div className="city-activity-list">
            <h3>Browse Experiences</h3>
            <ActivityList activities={activities}/>
          </div>
        </div>
        <div className="right-side">
          <div className="city-map">
            <Map citiesInTrip={citiesInTrip} city={city}/>
          </div>
          <h3>Expenses</h3>
          <div className="city-avg-expenses">
            <div className="expense">
              <h5>Hostel</h5>
              <div className="expense-content">
                <img className="hvr-float" src="https://is2-ssl.mzstatic.com/image/thumb/Purple123/v4/76/e9/01/76e901cc-cf66-3d97-d5c2-f318455d992c/AppIcon-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-7.png/246x0w.jpg"></img>
                <p>${hostel_price ? Math.round(hostel_price.avg) : null}</p>
              </div>
            </div>
            <div className="expense">
              <h5>AirBnB</h5>
              <div className="expense-content">
                <img className="hvr-float" src="https://image.flaticon.com/icons/svg/2111/2111320.svg"></img>
                <p>${airbnb_price ? Math.round(airbnb_price.avg) : null}</p>
              </div>
            </div>
            <div className="expense">
              <h5>Hotel</h5>
              <div className="expense-content">
                <img className="hvr-float" src="https://image.flaticon.com/icons/svg/2149/2149307.svg"></img>
                <p>${hotel_price ? Math.round(hotel_price.avg) : null}</p>
              </div>
            </div>
            <div className="expense">
              <h5>Bus</h5>
              <div className="expense-content">
                <img className="hvr-float" src="https://image.flaticon.com/icons/svg/2149/2149123.svg"></img>
                <p>${bus_price ? Math.round(bus_price.avg) : null}</p>
              </div>
            </div>
            <div className="expense">
              <h5>Train</h5>
              <div className="expense-content">
                <img className="hvr-float" src="https://image.flaticon.com/icons/svg/2149/2149329.svg"></img>
                <p>${train_price ? Math.round(train_price.avg) : null}</p>
              </div>
            </div>
            <div className="expense">
              <h5>Plane</h5>
              <div className="expense-content">
                <img  className="hvr-float" src="https://image.flaticon.com/icons/svg/1525/1525933.svg"></img>
                <p>${plane_price ? Math.round(plane_price.avg) : null}</p>
              </div>
            </div>
            <div className="expense">
              <h5>Daily Cost</h5>
              <div className="expense-content">
                <img  className="hvr-float" src="https://image.flaticon.com/icons/svg/2166/2166951.svg"></img>
                <p>${city ? city[0].avg_daily_expense : null}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="gallery">
        <h3>Browse Gallery</h3>
        <div className="photo-gallery-images">
          <ActivityGallery activities={activities} />
        </div>
      </section>
    </div>
  );
};