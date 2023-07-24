import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
export default function Paginate({ pages, page, keyword = '', isAdmin = false }) {

    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                        key={x + 1}
                        to={{
                            pathname: "/",
                            search: `?page=${x + 1}`
                        }}>
                        <Pagination.Item active={x + 1 === page} className="m-1 btn-success">
                            {x + 1}
                        </Pagination.Item>

                    </LinkContainer>
                ))}
            </Pagination>
        )
    )
}