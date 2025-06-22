"use client"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { TechStack } from "@/components/tech-stack"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Education } from "@/components/education"
import { useEffect, useState } from "react"
import { Perfil, PerfilInicial } from "@/models/Perfil"
import { DataPerfil } from "@/services/database"

export default function Home() {
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
  return (

    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />
      <main>
        <Hero cv={data.url_cv} />
        <Projects />
        <TechStack />
        <About data={data} loading={loading} />
        <Education />
        <Contact cv={data.url_cv} />
      </main>
    </div>
  )
}
