import React from "react";
import styled from "styled-components";

const Screen = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Welcome(props) {
  return (
    <Screen>
      <div>
        <h1>Welcome to Workout Manager!</h1>
      </div>
    </Screen>
  );
}

export default Welcome;
