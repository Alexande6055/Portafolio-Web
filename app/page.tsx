"use client"
import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { TechStack } from "@/components/tech-stack"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Education } from "@/components/education"

import { Perfil, PerfilInicial } from "@/models/Perfil"
import { Certificaciones, DataPerfil, GetProyectos, stacks } from "@/services/database"
import { Proyecto } from "@/models/Proyecto"
import { CategoriaStack, CategoriaStackInit } from "@/models/Tecnologias"
import { certificado } from "@/models/Certificacion"
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/storage"

export default function Home() {
  const [loading, setLoading] = useState(true)

  const [data, setData] = useState<Perfil>(PerfilInicial)
  const [projects, setProjects] = useState<Proyecto[]>([])
  const [techStack, setTechStack] = useState<CategoriaStack>(CategoriaStackInit)
  const [certificados, setCertificados] = useState<certificado[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      // PERFIL
      const perfilLocal = getFromLocalStorage<Perfil>("perfil")
      if (perfilLocal) {
        setData(perfilLocal)
      } else {
        const perfil = await DataPerfil()
        setData(perfil)
        saveToLocalStorage("perfil", perfil)
      }

      // PROYECTOS
      const proyectosLocal = getFromLocalStorage<Proyecto[]>("proyectos")
      if (proyectosLocal) {
        setProjects(proyectosLocal)
      } else {
        const proyectos = await GetProyectos()
        setProjects(proyectos)
        saveToLocalStorage("proyectos", proyectos)
      }

      // STACK
      const stacksLocal = getFromLocalStorage<CategoriaStack>("stack")
      if (stacksLocal) {
        setTechStack(stacksLocal)
      } else {
        const stack = await stacks()
        setTechStack(stack)
        saveToLocalStorage("stack", stack)
      }

      // CERTIFICADOS
      const certificadosLocal = getFromLocalStorage<certificado[]>("certificados")
      if (certificadosLocal) {
        setCertificados(certificadosLocal)
      } else {
        const certs = await Certificaciones()
        setCertificados(certs)
        saveToLocalStorage("certificados", certs)
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />
      <main>
        <Hero cv={data.url_cv} />
        <Projects loading={loading} projects={projects} />
        <TechStack loading={loading} techStack={techStack} />
        <About data={data} loading={loading} />
        <Education certificados={certificados} loading={loading} />
        <Contact cv={data.url_cv} />
      </main>
    </div>
  )
}
