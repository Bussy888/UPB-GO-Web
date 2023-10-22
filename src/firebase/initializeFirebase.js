import Firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseCredentials from './config';

if(!Firebase.getApps.length){
    Firebase.initializeApp(FirebaseCredentials);
}

export default Firebase;