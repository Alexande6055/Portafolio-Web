import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { Perfil } from "@/models/Perfil";

export async function agregarATecnologia(campo: string, valor: string) {
    try {
        const ref = doc(db, "stack_tecnologico", "A2auiUZ6AXqk8PTgNNst");

        await updateDoc(ref, {
            [campo]: arrayUnion(valor)
        });

    } catch (error) {
        console.error("Error al agregar tecnología:", error);
    }
}
export async function eliminarDeTecnologia(campo: string, valor: string) {
    try {
        const ref = doc(db, "stack_tecnologico", "A2auiUZ6AXqk8PTgNNst");

        await updateDoc(ref, {
            [campo]: arrayRemove(valor)
        });

    } catch (error) {
        console.error("Error al eliminar tecnología:", error);
    }
}

export async function editarPerfil(nuevosDatos: Partial<Perfil>) {
    try {
        const ref = doc(db, "perfil", "7ZIJcabtrTFiUvaMKLHD");

        await updateDoc(ref, nuevosDatos);

        console.log("Perfil actualizado correctamente.");
    } catch (error) {
        console.error("Error al editar perfil:", error);
    }
}