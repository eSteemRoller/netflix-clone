
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAne9NWIUkr69TJw8x_O_sRqnGODus_OW8",
  authDomain: "netflix-clone-63349.firebaseapp.com",
  projectId: "netflix-clone-63349",
  storageBucket: "netflix-clone-63349.firebasestorage.app",
  messagingSenderId: "66373474205",
  appId: "1:66373474205:web:54c95640ba1afa9a3b8174"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export default async function SignUp(firstName, lastName, email, password) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), { 
      uid: user.uid,
      firstName,
      lastName,
      authProvider: "local",
      email,
    })
  } catch (error) {
    console.log(error);
    alert(error);
  }
}

