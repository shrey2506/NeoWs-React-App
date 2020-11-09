import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Card, Container, Button, Form,Alert } from 'react-bootstrap';

export default function SearchComponent() {

  const API = process.env.REACT_APP_NEOWS_API_KEY;
  const idRef = useRef();

  const [info, setInfo] = useState();
  const [error,setError]=useState('');

  const apiEndPoint = axios.create({
    baseURL: `https://api.nasa.gov/neo/rest/v1/neo`
  });



   function handleSubmit(e) {
    e.preventDefault();
    try{
      const searchString = idRef.current.value;
      console.log(idRef.current.value);
         apiEndPoint.get(`/${searchString}?api_key=${API}`).then(res => {
        console.log(res.data)
        if(res.status==='404'){
          setError('No search results found for the following asteroid Id.')
          
        }
        setInfo(res.data);
      
       
      });
    }catch(err){
      console.log(err.message);
      setError(err.message);
      
    }
    
  }

 

  function loadData() {
    try {
      return (
        <Card className="center mt-2 mb-2" >

          <div className="text-muted left font-weight-bold" style={{ fontSize: '4vh' }}>{info.name}</div>

          <div className="text-left">Absolute Magnitude : {info.absolute_magnitude_h}</div>

          <div className="text-left">Nasa JPL URL: {info.nasa_jpl_url} </div>

          <div className="text-left">Neo Reference Id : {info.neo_reference_id}</div>
        </Card>
      )
    } catch (err) {
      console.log(err)
    }

  }


  return (
    <React.Fragment>
      <Container
        className=" align-items-center justify-content-center"
        style={{ minHeight: "20vh", maxWidth: '400px', marginTop: '10vh' }}
      >
        {error && <Alert variant="danger">{error} </Alert>}
        <Card>
          <Card.Body>
            <h2 className=" text-center mb-4">Search Asteroid By ID</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Enter Asteroid Id </Form.Label>

                <Form.Control
                  type="number"
                  required
                  ref={idRef}

                />
              </Form.Group>
              <Button className="w-100" type="submit">Search</Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
      {info && loadData()}
    </React.Fragment>

  );
}
