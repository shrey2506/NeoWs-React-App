import React, { useState, useEffect } from "react";
import {Container} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import Layout from '../../components/Layout';
import { getNeoFeed } from "./API_endPoint";
import Error from './Error';
import NeoWsSearch from "./Search";
import { checkInterval } from "../../utils/dateUtils";
import Asteroids from "./Asteroids";

const NeoWsContainer = () => {
  

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState(null);
  const [asteroids, setAsteroids] = useState(null);

  
  useEffect(() => {
    try {
     
      checkInterval(startDate, endDate);
      setError(null);
    } catch (e) {
      setError({ message: e.message });
    }
  }, [startDate, endDate]);

  
  

  const getDataApi = async () => {
    try {
      const momentStartDate = moment(startDate).format('YYYY-MM-DD');
      const momentEndDate = moment(endDate).format('YYYY-MM-DD');

      const res = await getNeoFeed(momentStartDate, momentEndDate);
      setAsteroids(res.data.near_earth_objects);
    } catch {
      setError({
        message: "An error occurred while retieving the data"
      });
    }
  };

  return (
      <Layout>
        <div className="uk-container">
        <Error error={error} />

        <Container className=" align-items-center justify-content-center">
            <NeoWsSearch
                startDate={startDate}
                endDate={endDate}
                startDateChangeHandler={date => setStartDate(date)}
                endDateChangeHandler={date => setEndDate(date)}
                onClickHandler={getDataApi}
            />

            {asteroids && <Asteroids asteroidsCollection={asteroids} />}
        </Container>

           
        </div>
      </Layout>
    
  );
};

export default NeoWsContainer;
