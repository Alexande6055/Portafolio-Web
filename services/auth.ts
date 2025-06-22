import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./FirebaseConfig";

export async function login(email: string, password: string) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return true;
    } catch (error) {
        return false;
    }
}
