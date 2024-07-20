import { useAuth0 } from "@auth0/auth0-react";
import { useAuthToken } from "../AuthTokenContext";

export default function AuthDebugger() {
  const { user, isLoading} = useAuth0();
  const { accessToken } = useAuthToken();

  if(isLoading){
    return <div className="loading">Loading...</div>;
  }

  return (
    <div>
      <div>
        <p>Access Token:</p>
        <pre>{JSON.stringify(accessToken, null, 2)}</pre>
      </div>
      <div>
        <p>User Info</p>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}