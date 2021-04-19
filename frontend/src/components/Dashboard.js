import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";

const Quote = styled(Card)`
  color: black;
  box-shadow: -7px 7px 8px #00000026;
`;

const Screen = styled.div`
  height: 100%;
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 993px) {
    padding-top: 200px;
  }
`;

function Dashboard(props) {
  const quotes = [
    {
      quote:
        "Whatever the mind can conceive and believe, the mind can achieve.",
      author: "Napoleon Hill",
    },
  ];

  return (
    <Screen>
      <div>
        <Quote className="border">
          <Card.Body>
            <blockquote className="blockquote mb-0">
              <p>{quotes[0].quote}</p>
              <footer className="blockquote-footer">{quotes[0].author}</footer>
            </blockquote>
          </Card.Body>
        </Quote>
      </div>
    </Screen>
  );
}

export default Dashboard;
