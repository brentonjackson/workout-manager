import React from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";
import video from "../video.mp4";
const video2 =
  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

const Quote = styled(Card)`
  color: black;
`;

const Screen = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  overflow: hidden;
  max-height: 100vh;
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
      <div className="fullscreen-video-wrap">
        <video loop autoPlay muted src={video} />
      </div>
      <div className="overlay"></div>
      <div scrollTop={props.moreprops}>
        <Quote>
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