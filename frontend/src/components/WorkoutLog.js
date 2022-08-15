import React, {useState, useEffect} from "react";
import { Card } from "react-bootstrap";
import styled from "styled-components";




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
const measurements = ['date', 'bodyweight', ['exercise', ['weight', 'sets', 'reps']]]
/*
Example Workout
Date: ...
BodyWeight: ...
Exercise: weight1 - 1 x 10
          weight2 - 1 x 5
          weight3 - 1 x 5
          weight4 - 1 x 6
          weight5 - 1 x 6
          weight6 - 1 x 4
or:

Example Workout
Date: ...
BodyWeight: ...
Exercise: set1 - 45 x 10
          set2 - 95 x 5
          set3 - 115 x 5
          set4 - 185 x 6
          set5 - 205 x 6
          set6 - 215 x 4

*/
const rowHeads = ['']
function WorkoutLog(props) {

  return (
    <>
      <div>
        test
      </div>
      <table>
        <thead>

        </thead>
        <tbody>
          <tr>
            {}
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default WorkoutLog;
