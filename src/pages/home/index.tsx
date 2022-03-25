import { Card, CardDeck } from "react-bootstrap";


export default function HomePage() {
  return (
    <>
      <CardDeck>
        <Card key={1} className="shadow-sm text-center" border="light">
          <Card.Body>
            <Card.Text className="text-muted">This is home</Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
    </>
  );
}
