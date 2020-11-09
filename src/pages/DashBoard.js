import React from 'react';
import { Card, Button } from 'react-bootstrap';
import {  useHistory } from 'react-router-dom';
import SearchComponent from '../components/SearchComponent';
import Layout from '../components/Layout';

export default function Dashboard() {
  const history = useHistory();

  function pushToBrowse() {
    history.push("/browse");
  }

  function pushToFeed() {
    history.push("/feed");
  }
  

  return (
    <Layout>
      {/* <div className="container-fluid" style={{ marginTop: '10vh' }}>
        <div className="row">
          <div className="col-md-6 pb-4">
            <Card>
              <Card.Body>
                <Button type="submit" onClick={pushToBrowse}>Nearby Asteroids</Button>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Button type="submit" onClick={pushToFeed}>Search By Date</Button>
              </Card.Body>
            </Card>

          
          </div>
        </div>
      </div> */}

       <SearchComponent />

    </Layout>
  );
}
