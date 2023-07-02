import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import { getDashboardData, getInnerData, getPrintedData, prepareDashboardData, printedDashboardData } from '../controllers/DashboardController';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [innerData, setInnerData] = useState(null);
  const [printedData, setPrintedData] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [printedValue, setPrintedValue] = useState('');

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

  const fetchInnerData = async () => {
    try {
      const innerData = await getInnerData();
      console.log(innerData);
      setInnerData(innerData)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchInnerData();
  }, []);

  const fetchPrintedData = async () => {
    try {
      const printedData = await getPrintedData();
      console.log(printedData);
      setPrintedData(printedData)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchPrintedData();
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handlePrintedChange = (event) => {
    setPrintedValue(event.target.value);
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
      fetchInnerData();
      fetchPrintedData()
    } catch (error) {
      console.error('Error preparing dashboard data:', error);
    }
  };

  const handleButtonPrintClick = async () => {
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
  
      const printedData = await printedDashboardData(printedValue);
      console.log('Printed dashboard data:', printedData);
  
      // Calculate the elapsed time
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  
      // Update the SweetAlert with the elapsed time
      swal({
        title: 'Prepared Data',
        text: `Successfully fetched ${printedValue} data\nElapsed Time: ${elapsedTime} seconds`,
        icon: 'success',
        buttons: ['Close'],
      });

      // Fetch the data
      fetchData();
      fetchInnerData();
      fetchPrintedData()
    } catch (error) {
      console.error('Error printing dashboard data:', error);
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
              {data && <Card.Text data-testid="card1">{data.message} {data.count}</Card.Text>}
              {!data && <Card.Text data-testid="card1">Loading...</Card.Text>}
              {innerData && <Card.Text data-testid="card2">{innerData.message} {innerData.count}</Card.Text>}
              {!innerData && <Card.Text data-testid="card2">Loading...</Card.Text>}
              {printedData && <Card.Text data-testid="card3">{printedData.message} {printedData.count}</Card.Text>}
              {!printedData && <Card.Text data-testid="card3">Loading...</Card.Text>}
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
                  data-testid="inputValue"
                  id="inputValue"
                  placeholder="Enter prepare amount"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button data-testid="btnPrepare" variant="primary" onClick={handleButtonClick}>
                Submit
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Card 3</Card.Title>
              <Form.Group>
                <Form.Control
                  type="text"
                  data-testid="inputPrinted"
                  id="inputPrinted"
                  placeholder="Enter printed amount"
                  value={printedValue}
                  onChange={handlePrintedChange}
                />
              </Form.Group>
              <Button data-testid="btnPrint" variant="primary" onClick={handleButtonPrintClick}>
                Submit
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
