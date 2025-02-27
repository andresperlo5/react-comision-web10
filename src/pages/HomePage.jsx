import { Col, Container, Row } from 'react-bootstrap'
import CarouselC from '../components/carousel/CarouselC'
import CardC from '../components/card/CardC'

const HomePage = () => {
  return (
    <>

      <CarouselC />
      <Container className='my-5'>
        <Row>
          <Col sm='12' md='6' lg='4'>
            <CardC />
          </Col>
          <Col sm='12' md='6' lg='4'>
            <CardC />
          </Col>
          <Col sm='12' md='6' lg='4'>
            <CardC />
          </Col>
        </Row>
      </Container>

    </>
  )
}

export default HomePage
