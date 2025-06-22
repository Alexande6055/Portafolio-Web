/*import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./FirebaseConfig";

async function login(email: string, password: string) {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Usuario autenticado");
    } catch (error) {
        console.error("Error en login", error);
    }
}
/*