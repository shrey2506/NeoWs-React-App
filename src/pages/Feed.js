import React,{useState,useRef, useEffect} from 'react';
import {Card, Form, Button, Alert, Container} from 'react-bootstrap';
import axios from 'axios';
import Layout from '../components/Layout';

export default function Feed() {



  const API = process.env.REACT_APP_NEOWS_API_KEY;

  const startDateRef=useRef();
  const endDateRef=useRef();
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);
  const [info,setInfo]=useState();

  async function handleSubmit(e){
    e.preventDefault();

    const startDate=startDateRef.current.value;
    const endDate=endDateRef.current.value;

    const response=await axios(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&detailed=true&api_key=${API}`
    );

    setInfo(response.data);

    console.log(info);  

    if(info!==null){
        loadData();
    }

   
}
 


function loadData() {
    try {
      return info.near_earth_objects.startDate.map((info, i) => {
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
        <Container 
            className=" align-items-center justify-content-center"
            style={{ minHeight: "100vh", maxWidth: '400px', marginTop: '10vh' }}
        >
            <Card>
                <Card.Body >
                <Form onSubmit={handleSubmit}>
                            <Form.Group id="textfield">
                                <Form.Label>Start Date(yyyy-MM-dd)</Form.Label>

                                <Form.Control 
                                    type="text" 
                                    required
                                    ref={startDateRef}
                                />

                            </Form.Group>

                            <Form.Group id="textfield">
                                <Form.Label>End Date(yyyy-MM-dd)</Form.Label>

                                <Form.Control 
                                    type="text" 
                                    required
                                    ref={endDateRef}
                                />

                            </Form.Group>

                                    
                        <Button disabled={loading} className="w-100" type="submit">Search</Button>


                        <div className="w-100 text-center mt-2">
                        Get a list of Near Earth Objects within a date range, The max range in one query is 7 days
                        </div>
                    </Form>


                </Card.Body>
            </Card>


               

    </Container>


   
         
    </Layout>
  );
}
