"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Perfil, PerfilInicial } from "@/models/Perfil";
import { DataPerfil } from "@/services/database";
import { editarPerfil } from "@/services/databaseAdmin";

export function AdminAbout() {
    const [loading, setLoading] = useState(true);
    const [perfil, setPerfil] = useState<Perfil>(PerfilInicial);
    const [isEditing, setIsEditing] = useState(false);
    const guardarCambios = async () => {
        try {
            setLoading(true);
            await editarPerfil(perfil);
            setIsEditing(false);
        } catch (error) {
            console.error("Error al guardar los cambios:", error);
            alert("Ocurrió un error al guardar.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        DataPerfil().then(setPerfil).catch(console.error).finally(() => setLoading(false));
    }, []);

    const handleChange = (field: keyof Perfil, value: string) =>
        setPerfil((prev) => ({ ...prev, [field]: value }));

    if (loading) {
        return (
            <section className="py-16 text-center bg-gray-100 dark:bg-gray-900">
                <p className="text-lg text-gray-700 dark:text-gray-300">Cargando...</p>
            </section>
        );
    }

    const campos = [
        { label: "Descripción", key: "descripcion" },
        { label: "Resumen experiencia", key: "resumen_experiencia" },
        { label: "Estado actual", key: "estado_actual" },
        { label: "Correo", key: "correo" },
    ] as const;

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto space-y-6">
                <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                    Admin Sobre mí
                </h2>

                {isEditing ? (
                    <>
                        {campos.map(({ label, key }) => (
                            <label key={key} className="block">
                                <span className="font-semibold">{label}:</span>
                                <textarea
                                    value={perfil[key]}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    className="w-full mt-1 p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                                />
                            </label>
                        ))}

                        <label className="block">
                            <span className="font-semibold">URL del CV:</span>
                            <input
                                type="text"
                                value={perfil.url_cv}
                                onChange={(e) => handleChange("url_cv", e.target.value)}
                                className="w-full mt-1 p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                            />
                        </label>

                        <label className="block">
                            <span className="font-semibold">URL Foto:</span>
                            <input
                                type="text"
                                value={perfil.url_foto}
                                onChange={(e) => handleChange("url_foto", e.target.value)}
                                className="w-full mt-1 p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                            />
                        </label>

                        <div className="flex justify-center gap-4 mt-4">
                            <button onClick={guardarCambios} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                Guardar
                            </button>

                            <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                                Cancelar
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="text-gray-700 dark:text-gray-300 space-y-3">
                            {campos.map(({ label, key }) =>
                                perfil[key] ? (
                                    <p key={key}>
                                        <strong>{label}:</strong> {perfil[key]}
                                    </p>
                                ) : null
                            )}

                            {perfil.url_cv && (
                                <p>
                                    <strong>CV:</strong>{" "}
                                    <a href={perfil.url_cv} className="text-blue-600 underline" target="_blank">
                                        Ver CV
                                    </a>
                                </p>
                            )}

                            {perfil.url_foto && (
                                <div className="w-48 h-48 relative rounded-full overflow-hidden mx-auto">
                                    <Image src={perfil.url_foto} alt="Foto perfil" fill className="object-cover" />
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Editar
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}
