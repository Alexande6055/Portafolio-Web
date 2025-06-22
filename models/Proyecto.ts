export interface Proyecto {
    descripcion: string;
    tecnologias: string[];
    titulo: string;
    repos: Array<{ nombre: string; url: string }>;
    url?: string;
    url_video: string;
}
