import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { Perfil, PerfilInicial } from "@/models/Perfil";
import { certificado } from "@/models/Certificacion";
import { CategoriaStack } from "@/models/Tecnologias";
import { Social, SocialInit } from "@/models/sociaLinks";
import { Proyecto } from "@/models/Proyecto";

export async function DataPerfil(): Promise<Perfil> {
    try {
        const perfilesCol = collection(db, "perfil");
        const snapshot = await getDocs(perfilesCol);
        // Verificamos si hay al menos un documento
        if (!snapshot.empty) {
            const doc = snapshot.docs[0]; // Tomamos el primer documento
            const data = doc.data();
            return {
                correo: data.correo || "",
                descripcion: data.descripcion || "",
                estado_actual: data.estado_actual || "",
                resumen_experiencia: data.resumen_experiencia || "",
                url_foto: data.url_foto || "/placeholder.svg",
                url_cv: data.url_cv || ""
            };
        } else {
            console.log("No se encontró ningún perfil.");
            return PerfilInicial;
        }
    } catch (error) {
        console.error("Error al obtener perfiles:", error);
        return PerfilInicial;
    }
}

export async function GetSocialLinks(): Promise<Social> {
    try {
        const perfilesCol = collection(db, "social");
        const snapshot = await getDocs(perfilesCol);

        if (!snapshot.empty) {
            const doc = snapshot.docs[0];
            const data = doc.data();

            return {
                correo: data?.correo ?? "",
                github: data?.github ?? "",
                linkedin: data?.linkedin ?? "",
            };
        } else {
            console.warn("No se encontró ningún documento en 'social_links'.");
            return SocialInit;
        }
    } catch (error) {
        console.error("Error al obtener redes sociales:", error);
        return SocialInit;
    }
}
export async function Certificaciones(): Promise<certificado[]> {
    try {
        const perfilesCol = collection(db, "certificaciones");
        const snapshot = await getDocs(perfilesCol);
        // Verificamos si hay al menos un documento
        if (!snapshot.empty) {
            const certificados: certificado[] = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    titulo: data.titulo,
                    area_descripcion: data.area_descripcion,
                    url: data.url
                };
            });

            return certificados;
        } else {
            console.log("No se encontraron certificaciones.");
            return [];
        }
    } catch (error) {
        console.error("Error al obtener perfiles:", error);
        return [];
    }
}

export async function stacks(): Promise<CategoriaStack> {
    try {
        const perfilesCol = collection(db, "stack_tecnologico");
        const snapshot = await getDocs(perfilesCol);
        // Verificamos si hay al menos un documento
        if (!snapshot.empty) {
            const doc = snapshot.docs[0]; // Tomamos el primer documento
            const data = doc.data();

            return {
                Back_End: data.Back_End,
                Front_End: data.Front_End,
                Databases: data.Databases,
                Dev_Tools: data.Dev_Tools,
            };
        } else {
            console.log("No se encontraron categorias.");
            return {
                Back_End: [],
                Front_End: [],
                Databases: [],
                Dev_Tools: [],
            };
        }
    } catch (error) {
        console.error("Error al obtener categorias:", error);
        return {
            Back_End: [],
            Front_End: [],
            Databases: [],
            Dev_Tools: [],
        };;
    }
}

export async function GetProyectos(): Promise<Proyecto[]> {
    try {
        const proyectosCol = collection(db, "proyectos");
        const snapshot = await getDocs(proyectosCol);

        if (!snapshot.empty) {
            const proyectos: Proyecto[] = snapshot.docs.map(doc => {
                const data = doc.data();

                // Convertimos repos (objeto) en array
                const reposArray = Object.entries(data.repos || {}).map(([nombre, url]) => ({
                    nombre,
                    url,
                }));

                return {
                    titulo: data.titulo,
                    descripcion: data.descripcion,
                    tecnologias: data.tecnologias,
                    repos: reposArray,
                    url: data.url || undefined,
                    url_video:data.url_video
                };
            });
            return proyectos;
        } else {
            console.warn("No se encontró ningún documento en 'proyectos'.");
            return [];
        }
    } catch (error) {
        console.error("Error al obtener proyectos:", error);
        return [];
    }
}



async function addData(name: string, email: string, menssage: string) {
    try {
        const docRef = await addDoc(collection(db, "message"), {
            name: name,
            email: email,
            menssage: menssage
        });
        console.log("Documento escrito con id: ", docRef.id)
        return true;
    } catch (error) {
        console.log("Error: ", error)
    }
}