import fetch from 'isomorphic-fetch';
import queryString from 'query-string';

const API = process.env.REACT_APP_NEOWS_API_KEY;

export const searchResult=({search})=>{
    
    // let query=queryString.stringify(params).toString();
    console.log("Search String: "+ search)
    var string=search;
    return fetch(`https://api.nasa.gov/neo/rest/v1/neo/${search}?api_key=${API}` , {
        method: 'GET'
    }).then(res=>{
        return res.json();
     
    }).catch(err=>{
        console.log(err)
    });
}