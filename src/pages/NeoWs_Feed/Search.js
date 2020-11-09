import React from "react";
import DatePicker from "react-datepicker";
import { Card, Form, Container } from 'react-bootstrap';



const NeoWsSearch = ({
  startDate,
  endDate,
  startDateChangeHandler,
  endDateChangeHandler,
  onClickHandler
}) => {
  return (
      <Container >
          <Card  style={{ minHeight: "10vh", maxWidth: '400px', marginTop: '10vh', marginBottom:'50px' }}>
                <Card.Body>
                <h2 className=" text-center mb-4">NeoWs Feed API</h2>
                
                    <Form.Label>Start Date: </Form.Label>
                    <Form.Group id="startDate" >
                        <DatePicker
                    
                        dateFormat="dd/MM/yyyy"
                        selected={startDate}
                        className="uk-input"
                        onChange={startDateChangeHandler}  
                        />
                        
                    </Form.Group>

                    <Form.Label>End Date: </Form.Label>
                    <Form.Group id="endDate" >
                    

                        
                            <DatePicker
                                dateFormat="dd/MM/yyyy"
                                selected={endDate}
                                className="uk-input"
                                onChange={endDateChangeHandler}
                            />
                    
                    </Form.Group>

                    
                    <div>
                    <button 
                        
                        className="btn btn-primary"
                        onClick={onClickHandler}
                        >
                        Search
                    </button>
                    </div>
                    
                    
                    
            </Card.Body>
        </Card>
      </Container>
    
   

);
};
    
export default NeoWsSearch;
