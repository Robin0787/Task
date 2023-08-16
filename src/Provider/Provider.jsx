import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.init';

export const authContext = createContext(null);

const Provider = ({ children }) => {
    const [formLoading, setFormLoading] = useState(false);
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();


    function signUpUser(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }
    function loginUser(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function continueWithGoogle() {
        return signInWithPopup(auth, googleProvider);
    }
    function continueWithGithub() {
        return signInWithPopup(auth, githubProvider);
    }

    function logOutUser() {
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser) {
                setUser(currentUser);
            }else {
                setUser(null);
            }
        })
        return () => unSubscribe();
    }, [auth]);

    const authInfo = { user, formLoading, setFormLoading, continueWithGoogle, continueWithGithub, signUpUser, loginUser, logOutUser };
    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export default Provider;