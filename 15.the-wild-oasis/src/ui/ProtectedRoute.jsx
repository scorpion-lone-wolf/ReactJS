import { Navigate } from "react-router-dom";
import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  // get currently logged in user(if there is)
  const { user, isGettingUser } = useUser();

  if (isGettingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (!user) return <Navigate to={"/login"} />;
  return children;
}

export default ProtectedRoute;
