import React from "react";
import { Card, Container } from 'react-bootstrap';
const Asteroids = ({ asteroidsCollection }) => {
 
  const asteroidsDates = Object.keys(asteroidsCollection);
  console.log("dates : ", asteroidsDates);

  const sortedAsteroidDates = asteroidsDates.slice().sort((a, b) => {
    let dateA = new Date(a);
    let dateB = new Date(b);

    return dateA - dateB;
  });

  return (
    <Container className=" pt-3 pb-3 align-items-center " style={{ minHeight: "10vh" ,  marginBottom:'50px' }}>
          
            <div>
                {sortedAsteroidDates.map(asteroidsDate => (
              <div key={asteroidsDate}>
                <h2>{asteroidsDate}</h2>
                <div>
                  {asteroidsCollection[asteroidsDate].map(asteroid => (
                    <div key={asteroid.id}>
                      {asteroid.name}
                    
                    </div>
                  ))}
                </div>
                < hr />
              </div>
              
            ))}
            </div>
            
         
    </Container>
   
  );
};

export default Asteroids;
