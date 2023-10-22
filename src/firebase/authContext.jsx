import { createContext, useContext, Context } from 'react'
import useFirebaseAuth from './useFirebaseAuth';

const authUserContext = createContext({
  authUser: null,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  signOut: async () => {}
});

export const AuthUserProvider = ({ children }) => {
  const auth = useFirebaseAuth();
  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}
// custom hook to use the authUserContext and access authUser and loading
export const useAuth = () => useContext(authUserContext);