// card to be filled in the Grid component
import Card from 'react-bootstrap/Card';
//import { Link } from "react-router-dom";

export default function myCard(props) {
    const data = props.data
    return (
        <Card className="border-0 my-3" >
            <Card.Img className="rounded-4" variant="top" src={data.image} style={{ objectFit: "cover", height: "250px" }} />
            <Card.Body>
                <Card.Subtitle>{data.name}</Card.Subtitle>
                <Card.Text className="m-0">
                    &#9906; {data.brand}
                </Card.Text>
                <Card.Text className="m-0">
                    &#36;{data.price}
                </Card.Text>
            </Card.Body>
        </Card >

    )
}