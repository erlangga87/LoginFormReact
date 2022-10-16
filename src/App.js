import logo from './logo.svg';
import './App.css';
import { Button, Modal, Form, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

function LoginModal(props) {
  const [waitSeconds, setWaitSeconds] = useState(0);
  React.useEffect(() => {
    if (waitSeconds > 0) {
      setTimeout(() => setWaitSeconds(setWaitSeconds - 1), 1000);
    } else {
      
    }
    
  });
  let loginCountDown = <p>Silahkan tunggu {waitSeconds} detik</p>

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errMessage, setErrMessage] = useState("");
  const [failedCount, setFailedCount] = useState(1);
  const submitValue = () => {
      if (username !== "admin" && password !== "password") {
        setFailedCount(failedCount + 1)

        setErrMessage("Invalid username or password" + " (" + failedCount + ")")
      }

      if (failedCount === 4) {
        setWaitSeconds(30)
        debugger;
      }
  }

  let loginButton;
  if (failedCount !== 4) {
    loginButton = <Button variant="primary" type="button" onClick={submitValue}>Submit</Button>;
  } else {
    loginButton = <Button variant="secondary" type="button">Submit</Button>;
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login (username: admin, password: admin)
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={username} onChange={e => setUsername(e.target.value)}
            type="text" placeholder="Masukkan username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password} onChange={e => setPassword(e.target.value)}
            type="password" placeholder="Masukkan password" />
        </Form.Group>
        <h6>{errMessage}</h6> <h6> {loginCountDown}</h6>
        
        {loginButton}
      </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function InacModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Apakah anda masih di situ ?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" onClick={props.onHide}>Stop</Button>
      </Modal.Footer>
    </Modal>
  );
}
function refreshPage(){ 
  window.location.reload(); 
}

function App() {
  // 30 seconds of inactivity
  const [showInac, setShowInac] = useState(false);
  const handleCloseInac = () => setShowInac(false);
  const handleShowInac = () => setShowInac(true);
  const [seconds, setSeconds] = React.useState(30);
  React.useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => setSeconds(seconds - 1), 1000);
    } else {
      handleShowInac(true);
    }
  });

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <div className="App">
        <div className="App-header">
          <Button
            variant="primary"
            size="lg"
            onClick={() => setModalShow(true)
          }>
            Login / Masuk
          </Button>

          <LoginModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />

          <InacModal
            show={showInac}
            onHide={() => setShowInac(false)}
          />
        </div>
      </div>
    </>
  );
}

export default App;
