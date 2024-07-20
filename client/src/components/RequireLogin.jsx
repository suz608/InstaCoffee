import { useAuth0 } from "@auth0/auth0-react";
import "../style/requireLogin.css";

export default function RequireLogin() {

    const {loginWithRedirect} = useAuth0();

    return (
      <div className="require-login"> 
        <ul>
            <li><a className="spec" href="/">Back to homepage</a></li>
        </ul>
        <h2 className="require-login-h2">Please log in before proceed.</h2>
        <button className="primary-btn" onClick={loginWithRedirect}>Login/Create account</button>
        </div>
    )

}