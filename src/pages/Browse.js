import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Layout from '../components/Layout';
import axios from 'axios';



import './Browse.css';


const Browse = () => {
  const API = process.env.REACT_APP_NEOWS_API_KEY;

  const [info, setInfo] = useState([]);

  const apiEndPoint = axios.create({
    baseURL: `https://api.nasa.gov/neo/rest/v1/neo/`
  });

  useEffect(() => {
    fetchData();

    async function fetchData() {
      await apiEndPoint.get(`/browse?page=0&size=20&api_key=${API}`).then(res => {
        setInfo(res.data)

      });
    }

  });

  function loadData() {
    try {
      return info.near_earth_objects.map((info, i) => {
        return (
          <Card className="center mt-2 mb-2" key={i}>

            <div className="text-muted left font-weight-bold" style={{ fontSize: '4vh' }}>{info.name}</div>

            <div className="text-left">Absolute Magnitude : {info.absolute_magnitude_h}</div>

            <div className="text-left">Nasa JPL URL: {info.nasa_jpl_url} </div>

            <div className="text-left">Neo Reference Id : {info.neo_reference_id}</div>
          </Card>

        )
      })
    } catch (err) {
      console.log(err)
    }

  }



  return (
    <Layout>
      <div className="row" style={{ marginTop: '10vh'}}>
      
        <div className="col-md-12">
       

          {info && loadData()}
          {!info && <h2>No data Found</h2>}
        </div>
      </div>

     
    </Layout>
  )

}

export default Browse;
