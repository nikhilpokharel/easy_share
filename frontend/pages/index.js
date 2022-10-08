import { Container, Card, Button, Badge } from "react-bootstrap";
import Cookie from "cookie";

export default function Home() {
  return (
    <Container>
      <h3 className='my-4'>Current Issues</h3>
      <Card className='mb-4'>
        <Card.Body>
          <Card.Title>Radhi Bidhyut Company Limited</Card.Title>
          <Card.Text>
            For General Public (RADHI)
            <Badge bg='primary' className='mx-2'>
              IPO
            </Badge>
          </Card.Text>
          <Button variant='dark'>Apply</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
