import React, { useState } from "react";
import { Alert, Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../../api/request";
import useGetUser from "../../hooks/useGetUser";

export const Login = () => {
  const [validated, setValidated] = useState(false);
  const [loading, setVLoading] = useState(false);
  const [isPasswordField, setIsPasswordField] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

	const navigate = useNavigate();
	const {setUserData} = useGetUser()


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    setValidated(true);		
		setVLoading(true)

    const formData = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries());

		await axios.post('/login', formDataObj)
		.then((response) => {
			setUserData(response.data)
			// route
			navigate('/')
		})
		.catch((error) => {
			if(error.response.status === 400) {
				setErrorMessage(error.response.data.error)
			}
		})
		setVLoading(false)
  };

  return (
    <div>
      <div className="mb-5">
        <h1>Login Form</h1>
      </div>
			{errorMessage && <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
        <p>
          {errorMessage}
        </p>
      </Alert> }
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3 justify-content-md-center">
          <Col md={4} className="justify-content-md-start text-left">
            <Form.Group
              className="mb-3 px-2"
              as={Row}
              md="4"
              controlId="validationCustom01"
            >
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                placeholder="Email"
              />
              <Form.Control.Feedback type="invalid">
                Enter a valid email
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group
              className="mb-3"
              as={Row}
              md="4"
              controlId="validationCustom02"
            >
              <Form.Label>Password</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon2"
                  type={isPasswordField ? "password" : "text"}
                  name="password"
                  required
                  minLength={6}
                />
                <InputGroup.Text
                  id="basic-addon2"
                  onClick={() => setIsPasswordField(!isPasswordField)}
                >
                  {isPasswordField ? 'View' : 'Hide'}
                </InputGroup.Text>
								<Form.Control.Feedback type="invalid">
                Password should be at least 6 characters
              </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit">{loading ? 'Loging In...' : 'Login'}</Button>
      </Form>
    </div>
  );
};
