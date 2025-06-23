"use client"
import { Badge } from "@/components/ui/badge"
import { CategoriaStack } from "@/models/Tecnologias"

interface TechStacProps {
  techStack: CategoriaStack;
  loading: boolean;
}

export function TechStack({ techStack, loading }: TechStacProps) {

  if (loading) {
    return (
      <section
        id="stack"
        className="py-16 px-4 sm:px-6 lg:px-8"
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

    <section id="stack" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Stack Tecnológico</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Frontend</h3>
            <div className="flex flex-wrap gap-2">
              {techStack.Front_End.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Backend</h3>
            <div className="flex flex-wrap gap-2">
              {techStack.Back_End.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Databases</h3>
            <div className="flex flex-wrap gap-2">
              {techStack.Databases.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Dev Tools</h3>
            <div className="flex flex-wrap gap-2">
              {techStack.Dev_Tools.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
