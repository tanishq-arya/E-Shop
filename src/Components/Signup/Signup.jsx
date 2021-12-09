import React from 'react';
import {useRef, useState} from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { TextField } from '@material-ui/core';

export default function Signup(){
  
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error,setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  
  // console.log("working");
  async function handleSubmit(e) {
    e.preventDefault();
    // console.log("clicked");
    if(passwordRef.current.value !== passwordConfirmRef.current.value)
    {
      return setError("Passwords don't match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4" style={{fontFamily:"Roboto"}}>Sign Up</h2>
          {/* {JSON.stringify(currentUser)} */}
          {/* {currentUser.email} */}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            
            {/* <TextField
              label="Email" 
              variant="standard"
              fullWidth
              required
              type="email"
              ref={emailRef}
              id="email"
              style={{ margin:"1em 0em", fontFamily:"Open-sans" }}
            />
            <TextField
              label="Password" 
              variant="standard"
              fullWidth
              required
              type="password"
              ref={passwordRef}
              id="password"
              style={{ margin:"1em 0em" }}
            />
            <TextField
              label="Password Confirmation" 
              variant="standard"
              fullWidth
              required
              type="password"
              ref={passwordConfirmRef}
              id="password-confirm"
              style={{ margin:"1em 0em" }}
            /> */}
            <Button 
              // variant="contained" 
              // color="primary" 
              disabled={ loading } 
              className="w-100 mt-4" 
              type="submit" 
              // endIcon={<KeyboardArrowRight/>}
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account ? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}
