"use client";
import { Perfil } from "@/models/Perfil";
import Image from "next/image";
import { motion } from "framer-motion";

interface AboutProps {
  data: Perfil;
  loading: boolean;
}

export function About({ data, loading }: AboutProps) {
  if (loading) {
    return (
      <section id="sobre-mi" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-12 w-64 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
            <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded-full mb-2"></div>
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="sobre-mi" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">Sobre mí</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Desarrollador Full Stack con especialización en Backend
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center px-4">
          {/* Imagen */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl ring-4 ring-blue-500/30 border-4 border-white dark:border-gray-800">
              <Image
                src={data.url_foto}
                alt="Alexander Tasinchano"
                fill
                className="object-cover grayscale hover:grayscale-0 transition duration-500 transform hover:scale-105"
              />
            </div>
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Experiencia y Especialización</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Soy un desarrollador de software con más de 5 años de experiencia profesional, especializado en desarrollo backend utilizando tecnologías modernas como NestJS, TypeScript y PostgreSQL. Mi enfoque se centra en la creación de APIs robustas, escalables y mantenibles siguiendo los mejores estándares de la industria.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Habilidades Técnicas</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Desarrollo backend con NestJS y Node.js</li>
                <li>Base de datos con PostgreSQL y MongoDB</li>
                <li>Desarrollo frontend con React y Next.js</li>
                <li>Arquitectura de software y diseño de sistemas</li>
                <li>Pruebas unitarias y de integración</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Metodología de Trabajo</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Me enfoqué en la entrega de soluciones de calidad, siguiendo principios de clean code y buenas prácticas de desarrollo. Mi enfoque es colaborativo y orientado a resultados, siempre buscando la mejor solución para cada proyecto.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <a
                href="#proyectos"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
              >
                Ver Proyectos
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}