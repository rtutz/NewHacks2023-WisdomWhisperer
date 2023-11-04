import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800 py-2 px-4 rounded shadow-md" onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;