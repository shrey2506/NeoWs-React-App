import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import {db} from '../firebase';
import { Card, Container, Button, Form ,Alert } from 'react-bootstrap';

export default function SearchComponent() {

  const API = process.env.REACT_APP_NEOWS_API_KEY;
  const idRef = useRef();
  const { currentUser } = useAuth();

  const [info, setInfo] = useState();
  const [error, setError]=useState('');
  const [savedMessage,setSavedMessage]=useState('');
  

  const apiEndPoint = axios.create({
    baseURL: `https://api.nasa.gov/neo/rest/v1/neo`
  });

   function handleSubmit(e) {
    e.preventDefault();
    try{
      const searchString = idRef.current.value;
     
         apiEndPoint.get(`/${searchString}?api_key=${API}`).then(res => {
       
        setInfo(res.data);
      
      }).catch(error => setError(''+error));

    }catch(err){
      console.log(err.message); 
    }

    idRef.current.value ='';
  }

  function saveAsteroidData(asteroidId,asteroidName){
    
   try{
     
    var ref=db.collection(currentUser.email);
    ref.add({
     id: asteroidId,
     name: asteroidName
    } 
    );
   setSavedMessage(`The Following Asteroid: ${asteroidId} is saved`)
   setInfo('');
   idRef.current.value='';
   }catch(err){
     setError(err);
   }

  }


 

  function loadData() {
    try {
      return (
        <Card   className=" align-items-center justify-content-center mt-2 mb-2 " >

          <div className="text-muted left font-weight-bold" style={{ fontSize: '3vh' }}>{info.name}</div>

          <div className="text-left">Absolute Magnitude : {info.absolute_magnitude_h}</div>


          <div className="text-left">Neo Reference Id : {info.neo_reference_id}</div>
          {info &&  <Button className="w-100" onClick={()=>saveAsteroidData(info.id,info.name)}>Save Asteroid</Button> }
         
        </Card>
      )
    } catch (err) {
      console.log(err)
    }

  }

  const mouseMoveHandler=e=>{
    setError(false);
    setSavedMessage(false);
  }


  return (
    <React.Fragment >
      {error && <Alert variant="danger">{error} </Alert>}
      {savedMessage && <Alert variant="success">{savedMessage} </Alert>}
      <Container onMouseMove={mouseMoveHandler}

        className=" align-items-center justify-content-center"
        style={{ minHeight: "20vh", maxWidth: '400px', marginTop: '10vh' }}
      >
       
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
        {info && loadData() }
      </Container>
      
      
    </React.Fragment>

  );
}
