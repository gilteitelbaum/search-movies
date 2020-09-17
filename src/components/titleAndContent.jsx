import React from "react";
import { Row, Col } from "react-bootstrap";

export default function TitleAndContent(props) {
    return (
        <>
            {props.displayLine && <hr></hr>}
            <Row>
                <Col lg={3} md={4} xs={6} className="title">
                    {props.title}
                </Col>
                <Col lg={9} md={8} xs={6} className="content">
                    {props.content}
                </Col>
            </Row>
        </>
    );
}