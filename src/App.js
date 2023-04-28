import "./App.css";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "./firebase/firebase.init";
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState({});
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  const handleGoogleSignout = () => {
    signOut(auth)
      .then(() => {
        setUser({});
      })
      .catch(() => {
        setUser({});
      });
  };

  const handleGithubSignIn = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="App">
      {user.uid ? (
        <button onClick={handleGoogleSignout}>Signout</button>
      ) : (
        <>
          <button onClick={handleGoogleSignIn}>Google Signin</button>
          <button onClick={handleGithubSignIn}>Github Signin</button>
        </>
      )}
      {user.uid && (
        <div>
          <h2>Name : {user.displayName} </h2>
          <h3>Email : {user.email ? user.email : "Sorry!!! No Email Found"}</h3>
          <img src={user.photoURL} alt="" />
        </div>
      )}
    </div>
  );
}

export default App;
