import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
// import {searchResult} from './Actions';

import axios from 'axios';


export default function Search() {

    const API = process.env.REACT_APP_NEOWS_API_KEY;


    const [values, setValues] = useState({
        search: undefined,
       
        searched: false,
        message: '',

    });

    const { search, searched, message } = values;

    const [ results ,setResults]=useState([]);

    // const searchResult=()=>{
    //     await apiEndPoint.get(`${search}?api_key=${API}`).then(res => {
    //         setValues({...values,})
    
    //       });
    //     }
    // }


      const  searchSubmit =e=> {
        e.preventDefault();
        
        const searchReult=axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${search}?api_key=${API}`);
            setValues({...values, searched:true});


            setResults(searchReult.data);
    
         
       
    };

    const searchAsteroid = (results) => {
        console.log("Results2: "+ results)

        try{
            return (
                <div className="jumbotron bg-white ">
                    {message && <p className=" text-muted font-italic">{message}</p>}
    
                    {results => {
                        return (
                            <Card className="center mt-2 mb-2" >
    
                            <div className="text-muted left font-weight-bold" style={{ fontSize: '4vh' }}>Name {results.name}</div>
                
                            <div className="text-left">Absolute Magnitude : {results.absolute_magnitude_h}</div>
                
                            <div className="text-left">Nasa JPL URL: {results.nasa_jpl_url} </div>
                
                            <div className="text-left">Neo Reference Id : {results.neo_reference_id}</div>
                          </Card>
                        );
                 }}
                </div>
            );
        }catch(err) {
            console.log(err);
        }
        
    };
    
    const handleChange = e => {
        e.preventDefault();
        setValues({ ...values, search: e.target.value, searched: false });
    };
     


    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <div className="row">

               <div className="col-md-4 buttonIn">
                    <input id="search"  type="search" className="form-control" placeholder="Search blogs" onChange={handleChange} />
                   
                </div> 
            </div>
        </form>
    );

  return (
    <div>
         <div className="pl-2 pt-2 pb-2 pr-2">{searchForm()}</div>
 
        {searched && <div > {searchAsteroid(results)} </div>}
    </div>
  );
}
