import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom'

import Layout from '../components/Layout';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const { login, } = useAuth();



    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);
        try {
            setError('');
            await login(emailRef.current.value, passwordRef.current.value);
            history.push("/dashboard");
        } catch (err) {
            setError(" " + err);
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
                            <h2 className=" text-center mb-4">Log In</h2>

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



                                <Button disabled={loading} className="w-100" type="submit">Log In</Button>
                            </Form>
                            <div className="w-100 text-center mt-3">
                                <Link to="forgot-password">Forgot Password?</Link>
                            </div>

                        </Card.Body>
                        <div className="w-100 text-center mt-2">
                            New User? <Link to="/signup">Sign Up </Link>
                        </div>
                    </Card>


                </Container>
            </Layout>

        </div>
    );
}
