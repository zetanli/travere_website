// card to be filled in the Grid component
import React from 'react';

//import { Link } from "react-router-dom";

export default function RatingRadio(props) {
    const color = props.color
    const rating = props.rating
    const setRating = props.setRating
    return (
        <div className='mt-3 mb-2'>
            <span className='leaverating'>Rate This: </span>
            <label className="mx-2">
                <input type="radio"
                    name="rating"
                    id="rating1"
                    value={1}
                    onChange={() => setRating(1)}
                />
                <i style={{ color: color, fontSize: "36px" }} className={
                    rating >= 1 ?
                        'fas fa-star' :
                        'far fa-star'
                }></i>

            </label>
            <label className="mx-2">
                <input type="radio"
                    name="rating"
                    value={2}
                    onChange={() => setRating(2)}
                />
                <i style={{ color: color, fontSize: "36px" }} className={
                    rating >= 2 ?
                        'fas fa-star' :
                        'far fa-star'
                }></i>

            </label>
            <label className="mx-2">
                <input type="radio"
                    name="rating"
                    value={3}
                    onChange={() => setRating(3)}
                />
                <i style={{ color: color, fontSize: "36px" }} className={
                    rating >= 3 ?
                        'fas fa-star' :
                        'far fa-star'
                }></i>

            </label>
            <label className="mx-2">
                <input type="radio"
                    name="rating"
                    value={4}
                    onChange={() => setRating(4)}
                />
                <i style={{ color: color, fontSize: "36px" }} className={
                    rating >= 4 ?
                        'fas fa-star' :
                        'far fa-star'
                }></i>

            </label>
            <label className="mx-2">
                <input type="radio"
                    name="rating"
                    value={5}
                    onChange={() => setRating(5)}
                />
                <i style={{ color: color, fontSize: "36px" }} className={
                    rating >= 5 ?
                        'fas fa-star' :
                        'far fa-star'
                }></i>

            </label>
        </div>
    )
}