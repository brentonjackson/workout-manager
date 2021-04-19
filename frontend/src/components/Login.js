import React from "react";
import styled from "styled-components";
import awsExports from "../aws-exports";
import Amplify, { Auth } from "aws-amplify";
// import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import {
  //   AmplifyAuthenticator,
  AmplifyGreetings,
  //   AmplifySignOut,
  //   withAuthenticator,
} from "@aws-amplify/ui-react";
// import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

Amplify.configure(awsExports);

const LoginText = styled.span`
  cursor: pointer;

  :hover {
    color: black;
    cursor: pointer;
    font-weight: bold;
  }
`;

const Login = (props) => {
  return props.loggedIn ? (
    <div className="App">
      <AmplifyGreetings username={props.loginName}></AmplifyGreetings>
    </div>
  ) : (
    <LoginText onClick={() => Auth.federatedSignIn()}>
      {props.loggedIn ? props.loginName : "Login with Google"}
    </LoginText>
    // <AmplifySignOut />
  );
};

export default Login;
