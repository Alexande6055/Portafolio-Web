"use client"
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion"
import { Proyecto } from "@/models/Proyecto";
interface ProjectProps {
  projects: Proyecto[];
  loading: boolean;
}

export function Projects({ projects, loading }: ProjectProps) {
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const allTechs = Array.from(
    new Set(projects.flatMap((project) => project.tecnologias))
  ).sort();

  // Función para alternar selección
  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };
  // Filtrar los proyectos según las tecnologías seleccionadas
  const filteredProjects = selectedTechs.length === 0
    ? projects
    : projects.filter((project) =>
      selectedTechs.every((tech) => project.tecnologias.includes(tech))
    );
  useEffect(() => {
    if (selectedTechs.length > 0 && filteredProjects.length === 0) {
      setSelectedTechs([]);
    }
  }, [filteredProjects, selectedTechs]);



  return (
    <section id="proyectos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center"
        >
          Proyectos
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Badge
            onClick={() => setSelectedTechs([])}
            className={`cursor-pointer px-4 py-2 text-sm rounded-full transition-all duration-200 
      ${selectedTechs.length === 0
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"}`}
          >
            Todos
          </Badge>

          {allTechs.map((tech) => {
            const selected = selectedTechs.includes(tech);
            return (
              <motion.div
                key={tech}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  onClick={() => toggleTech(tech)}
                  className={`cursor-pointer px-4 py-2 text-sm rounded-full transition-all duration-200 ${selected
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-600"
                    }`}
                >
                  {tech}
                </Badge>
              </motion.div>
            );
          })}

        </div>


        <div className="grid md:grid-cols-2 gap-10">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all border dark:border-gray-700">
                {/* VIDEO */}
                <div className="aspect-video relative overflow-hidden rounded-t-md">
                  <video
                    src={project.url_video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    preload="auto"
                  />
                </div>

                {/* INFO */}
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 dark:text-white">{project.titulo}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">{project.descripcion}</CardDescription>
                </CardHeader>

                <CardContent>
                  {/* STACK */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tecnologias.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* LINKS */}
                  <div className="flex flex-wrap gap-3">
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="min-w-max">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Ver proyecto
                        </Button>
                      </a>
                    )}

                    {project.repos.map((repo, idx) => (
                      <a
                        key={idx}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-w-max"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-white"
                        >
                          <Github className="mr-2 h-4 w-4" />
                          {repo.nombre}
                        </Button>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
