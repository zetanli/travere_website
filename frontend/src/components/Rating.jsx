// card to be filled in the Grid component
import React from 'react';

//import { Link } from "react-router-dom";

export default function Rating(props) {
    const color = props.color
    const value = props.value
    return (
        <div className='rating'>
            <span>
                <i style={{ color }} className={
                    value >= 0.5 ?
                        'fas fa-star' :
                        value > 0 ?
                            'fas fa-star-half-alt' :
                            'far fa-star'
                }>
                </i>
            </span>
            <span>
                <i style={{ color }} className={
                    value >= 1.5 ?
                        'fas fa-star' :
                        value >= 1 ?
                            'fas fa-star-half-alt' :
                            'far fa-star'
                }>
                </i>
            </span>
            <span>
                <i style={{ color }} className={
                    value >= 2.5 ?
                        'fas fa-star' :
                        value > 2 ?
                            'fas fa-star-half-alt' :
                            'far fa-star'
                }>
                </i>
            </span>
            <span>
                <i style={{ color }} className={
                    value >= 3.5 ?
                        'fas fa-star' :
                        value > 3 ?
                            'fas fa-star-half-alt' :
                            'far fa-star'
                }>
                </i>
            </span>
            <span>
                <i style={{ color }} className={
                    value >= 4.5 ?
                        'fas fa-star' :
                        value > 4 ?
                            'fas fa-star-half-alt' :
                            'far fa-star'
                }>
                </i>
            </span>
        </div>

    )
}