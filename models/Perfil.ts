export interface Perfil {
    correo: string;
    descripcion: string;
    resumen_experiencia: string;
    estado_actual: string;
    url_foto: string;
    url_cv: string;
}

export const PerfilInicial = {
    correo: "",
    descripcion: "",
    estado_actual: "",
    resumen_experiencia: "",
    url_foto: "/placeholder.svg",
    url_cv: ""

}