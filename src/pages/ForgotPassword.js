import React, {useRef, useState} from 'react';
import {Card, Form, Button, Alert, Container} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';
import {Link} from 'react-router-dom'

import Layout  from '../components/Layout';

export default function ForgotPassword() {
   const emailRef=useRef();
  
  
   const [error,setError]=useState('');
   const [loading,setLoading]=useState(false);
   const [message,setMessage]=useState('');
   

   const {resetPassword  }=useAuth();

  

  async function handleSubmit(e){
       e.preventDefault();
      
        setLoading(true);
        try{
            setMessage("");
            setError('');
            await resetPassword(emailRef.current.value)
            setMessage("Check your inbox for further instructions")
            
        }catch(err){
            setError(" "+ err);
        }

        setLoading(false);
       
   }


  return (
    <div>

        <Layout>
            <Container 
                   className=" align-items-center justify-content-center"
                   style={{ minHeight: "100vh", maxWidth: '400px', marginTop: '10vh' }}
               >
                        <Card>
                            <Card.Body>
                                <h2 className=" text-center mb-4">Reset Password</h2>

                                {error && <Alert variant="danger">{error} </Alert>}
                                {message && <div className="alert alert-info">{message}</div>}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id="email">
                                        <Form.Label>Email</Form.Label>

                                        <Form.Control 
                                            type="email" 
                                            required
                                            ref={emailRef}
                                        />

                                    </Form.Group>

                                   

                                    <Button disabled={loading} className="w-100" type="submit">Reset Password</Button>
                                </Form>
                              
                            </Card.Body>
                            <div className="row">
                                <div className="w-100 text-center mt-2 col-md-6">
                                    <Link to="/">Log In</Link> 
                                </div>

                                <div className="w-100 text-center mt-2 col-md-6">
                                    <Link to="/signup">Sign Up </Link> 
                                </div>
                            </div>
                           
                    </Card>

                   
            </Container>
        </Layout>
         
    </div>
  );
}
