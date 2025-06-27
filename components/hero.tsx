import { Button } from "@/components/ui/button"
import { Download, Eye } from "lucide-react"
import { motion } from "framer-motion"

export function Hero({ cv }: { cv: string }) {
  return (
    <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* TEXTO */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Alexander Tasinchano
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-3">
            Estudiante de Ingeniería en Software con enfoque en desarrollo backend
          </p>

          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-xl">
            Apasionado por construir APIs robustas, funcionales y escalables usando NestJS, TypeScript y PostgreSQL.
            Siempre en búsqueda de nuevos retos y oportunidades reales.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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
                className="border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-white"
              >
                <Download className="mr-2 h-5 w-5" />
                Descargar CV
              </Button>
            </a>
          </div>
        </motion.div>

        {/* IMAGEN */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center md:justify-end"
        >
          <motion.img
            src="/yo.png"
            alt="Foto de Alexander Tasinchano"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-white dark:border-gray-800 cursor-pointer"
          />
        </motion.div>

      </div>
    </section>
  )
}
