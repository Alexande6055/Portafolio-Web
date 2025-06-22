"use client";
import { Perfil, PerfilInicial } from "@/models/Perfil";
import { DataPerfil } from "@/services/database"
import Image from "next/image"
import { useEffect, useState } from "react"


export function About() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Perfil>(PerfilInicial)
  useEffect(() => {
    const obtenerDataPerfil = async () => {
      try {
        const datos: Perfil = await DataPerfil();
        setData(datos);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false); // <- Termina la carga aquí
      }
    };

    obtenerDataPerfil();
  }, []);

  if (loading) {
    return (
      <section
        id="sobre-mi"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Cargando...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="sobre-mi" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Sobre mí</h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {data.descripcion}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {data.resumen_experiencia}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {data.estado_actual}
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden">
              <Image
                src={data.url_foto}
                alt="Alexander Tasincahno"
                fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
