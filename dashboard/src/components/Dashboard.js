import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { getDashboardData, prepareDashboardData } from '../controllers/DashboardController';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const fetchData = async () => {
    try {
      const dashboardData = await getDashboardData();
      console.log(dashboardData);
      setData(dashboardData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      // Display the progress using SweetAlert
      swal({
        title: 'Preparing Data',
        text: 'Processing...',
        buttons: false,
        closeOnClickOutside: false,
      });
  
      // Start the timer
      const startTime = Date.now();
  
      const preparedData = await prepareDashboardData(inputValue);
      console.log('Prepared dashboard data:', preparedData);
  
      
  
      // Calculate the elapsed time
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  
      // Update the SweetAlert with the elapsed time
      swal({
        title: 'Prepared Data',
        text: `Successfully fetched ${inputValue} data\nElapsed Time: ${elapsedTime} seconds`,
        icon: 'success',
        buttons: ['Close'],
      });

      // Fetch the data
      fetchData();
    } catch (error) {
      console.error('Error preparing dashboard data:', error);
    }
  };
  

  return (
    <Container>
      <Row>
        <Col>
          <h1>Dashboard Page</h1>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Card 1</Card.Title>
              {data && <Card.Text>{data.message} {data.count}</Card.Text>}
              {!data && <Card.Text>Loading...</Card.Text>}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Card 2</Card.Title>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Enter prepare amount"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleButtonClick}>
                Submit
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Card 3</Card.Title>
              <Card.Text>
                This is the content of Card 3.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
