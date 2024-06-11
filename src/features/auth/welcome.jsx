import { useSelector } from "react-redux";
import { useUserSelector, useTokenSelector } from "./authSlice";
import { Link } from "react-router-dom";

const Welcome = () => {
  const user = useSelector(useUserSelector);
  const token = useSelector(useTokenSelector);

  const welcome = user ? `Welcome ${user}!` : `Welcome!`;
  const tokenSlice = `${token.slice(0, 9)}...`;

  return (
    <select className="welcome">
      <h1>{welcome}</h1>
      <p>Token: {tokenSlice}</p>
      <p>
        <Link to="/userslist" /> Go to the users List
      </p>
    </select>
  );
};

export default Welcome;
