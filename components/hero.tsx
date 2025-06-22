import { Button } from "@/components/ui/button"
import { Download, Eye } from "lucide-react"

export function Hero({ cv }: { cv: string }) {
  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">Alexander Tasinchano</h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-4">
            Estudiante de Ingeniería en Software
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl mx-auto">Proyectos Fullstack reales</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Eye className="mr-2 h-5 w-5" />
              Ver proyectos
            </Button>
            <a
              href={cv}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex"
            >
              <Button
                variant="outline"
                size="lg"
                className="bg-gray-900 text-white border-gray-700 hover:bg-gray-800"
              >
                <Download className="mr-2 h-5 w-5" />
                Descargar CV
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
