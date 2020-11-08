import React, {useRef, useState} from 'react';
import {Card, Form, Button, Alert, Container} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';
import  {Link, useHistory} from 'react-router-dom';

import Layout  from '../components/Layout'

export default function SignUp() {
   const emailRef=useRef();
   const passwordRef=useRef();
   const passwordConfirmationRef=useRef();
   const [error,setError]=useState('');
   const [loading,setLoading]=useState(false);
   const history=useHistory();

   const {signup }=useAuth();

  async function handleSubmit(e){
       e.preventDefault();
        if(passwordRef.current.value!==passwordConfirmationRef.current.value){
            return setError('Passwords do not match')
        }
        setLoading(true);
        try{
            setError('');
            await signup(emailRef.current.value,passwordRef.current.value);
            history.push("/dashboard");
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
                        <Card >
                            <Card.Body>
                                <h2 className=" text-center mb-4">Sign Up</h2>

                                {error && <Alert variant="danger">{error} </Alert>}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id="email">
                                        <Form.Label>Email</Form.Label>

                                        <Form.Control 
                                            type="email" 
                                            required
                                            ref={emailRef}
                                        />

                                    </Form.Group>

                                    <Form.Group id="password">
                                        <Form.Label>Password</Form.Label>

                                        <Form.Control 
                                            type="password" 
                                            required
                                            ref={passwordRef}
                                        />

                                    </Form.Group>

                                    <Form.Group id="password-confirm">
                                        <Form.Label>Confirm Password</Form.Label>

                                        <Form.Control 
                                            type="password" 
                                            required
                                            ref={passwordConfirmationRef}
                                        />

                                    </Form.Group>

                                    <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
                                </Form>

                            </Card.Body>

                            <div className="w-100 text-center mt-2">
                                Already have an acoount?  <Link to="/">Log In </Link>
                            </div>
                        </Card>

                   
            </Container>
           
           
        </Layout>
        
    </div>
  );
}
