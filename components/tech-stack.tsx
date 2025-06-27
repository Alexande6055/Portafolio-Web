"use client"
import { Badge } from "@/components/ui/badge"
import { CategoriaStack } from "@/models/Tecnologias"
import { motion } from "framer-motion"

interface TechStacProps {
  techStack: CategoriaStack;
  loading: boolean;
}

export function TechStack({ techStack, loading }: TechStacProps) {
  if (loading) {
    return (
      <section id="stack" className="py-16 px-4 sm:px-6 lg:px-8">
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
    <section id="stack" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">Stack Tecnológico</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Tecnologías y herramientas que dominó y en las que está en constante aprendizaje
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <StackBlock title="Frontend" color="blue" techs={techStack.Front_End} delay={0.1} />
          <StackBlock title="Backend" color="green" techs={techStack.Back_End} delay={0.2} />
          <StackBlock title="Bases de Datos" color="purple" techs={techStack.Databases} delay={0.3} />
          <StackBlock title="Dev Tools" color="orange" techs={techStack.Dev_Tools} delay={0.4} />
        </div>

        {techStack.En_Aprendizaje && techStack.En_Aprendizaje.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-24"
          >
            <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-8">
              Tecnologías en Aprendizaje
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {techStack.En_Aprendizaje.map((tech, index) => (
                <motion.div
                  key={`${tech}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{tech}</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function StackBlock({
  title,
  techs,
  color,
  delay,
}: {
  title: string;
  techs: string[];
  color: string;
  delay: number;
}) {
  const colorClasses: Record<string, string> = {
    blue: "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-700",
    green: "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-300 dark:border-green-700",
    purple: "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-700",
    orange: "bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 border border-orange-300 dark:border-orange-700",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="space-y-4"
    >
      <h3 className="text-xl font-semibold text-center md:text-left text-gray-900 dark:text-white">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        {techs.map((tech) => (
          <Badge
            key={tech}
            className={`px-3 py-1 text-sm rounded-full ${colorClasses[color]}`}
          >
            {tech}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}
