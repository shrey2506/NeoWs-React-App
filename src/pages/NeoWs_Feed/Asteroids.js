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
   
          
            <div>
                {sortedAsteroidDates.map(asteroidsDate => (
              <div key={asteroidsDate}>
                <h2>{asteroidsDate}</h2>
                <div>
                  {asteroidsCollection[asteroidsDate].map(asteroid => (

                    <Card className="mt-2 mb-2" key={asteroid.id}>
                      <div className="text-muted left font-weight-bold">
                         Name:  {asteroid.name}
                      </div>
                      <div className="text-muted left ">
                         Id:  {asteroid.id}
                      </div>
                      
                    
                    </Card>
                  ))}
                </div>
                < hr />
              </div>
              
            ))}
            </div>
            
         
    
   
  );
};

export default Asteroids;
