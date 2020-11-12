import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { Card, Container } from 'react-bootstrap';

import Layout from './Layout';

export default function SaveAsteroids() {

    const [asteroidId, setAsteroidId] = useState([]);

    const { currentUser } = useAuth();

 useEffect(() => {
    async function fetchData() {
        try {
            const dataRef = await db.collection(currentUser.email).get();
            
            const Data=dataRef.docs.map(doc=>doc.data());
            console.log(Data)
            setAsteroidId(Data );


        } catch (err) {
            console.log(err)
        }
        console.log("AsteroidId: " + asteroidId);
    }
    fetchData();
 },[])
    
    return (
        <Layout>
            <Container
                className=" align-items-center justify-content-center"
                style={{ minHeight: "10vh", maxWidth: '400px', marginTop: '10vh' }}
            >
                <Card>
                    <Card.Body>
                        <h2 className=" text-center mb-4">Saved Asteroids</h2>

                        {asteroidId && asteroidId.map(fav=>(
                           

                                <Card key={fav.id} style={{maxWidth: '10h'}}>
                                    <Card.Body className="mb-4 mt-4" >
                                        <div className="text-muted left font-weight-bold">
                                          Name: {fav.name}
                                        </div>
                                        <div className="text-muted left ">
                                          Id :{fav.id}
                                        </div>
                                    </Card.Body>
                                    
                                </Card>    
                        ))} 
                        {!asteroidId && <div>No SAved Asteroids Yet</div>}

                    </Card.Body>
                </Card>
            </Container>
        </Layout>

    );
}
