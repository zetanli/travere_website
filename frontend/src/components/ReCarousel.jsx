import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import { Link } from "react-router-dom";

export default function ReCarousel(props) {
    const data = props.data;
    let data2 = [];
    if (data.length > 1) {
        data2.push(data[0]);
        data2.push(data[1]);
    } else {
        data2 = data
    }
    return (
        <Carousel fade pause='hover' className='bg-dark my-3'>
            {data2.map((v) => (
                <Carousel.Item key={v._id}>
                    <Link to={`/product/${v._id}`}>
                        <Image src={v.image} alt={v.name} fluid className='carousel_image'></Image>
                    </Link>
                    <Carousel.Caption>
                        <h3>{v.name}</h3>
                        <p>{v.brand}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}