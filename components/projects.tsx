"use client"
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { GetProyectos } from "@/services/database";
import { Proyecto } from "@/models/Proyecto";

export function Projects() {
  const [projects, setProjects] = useState<Proyecto[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const data = await GetProyectos();
      setProjects(data);
    }
    fetchProjects();
  }, []);

  return (
    <section id="proyectos" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Proyectos</h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow w-full max-w-full sm:max-w-md">
              <div className="aspect-video relative overflow-hidden rounded-md">
                <video
                  src={project.url_video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{project.titulo}</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">{project.descripcion}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tecnologias.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
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
                        className="bg-black text-white border-gray-700 hover:bg-gray-800 whitespace-nowrap"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        {repo.nombre}
                      </Button>
                    </a>
                  ))}
                </div>
              </CardContent>

            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
