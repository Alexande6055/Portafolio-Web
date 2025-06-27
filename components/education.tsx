"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award } from "lucide-react";
import { certificado } from "@/models/Certificacion";
import { motion } from "framer-motion";

interface EducationProps {
  certificados: certificado[];
  loading: boolean;
}

export function Education({ certificados, loading }: EducationProps) {
  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Cargando...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center"
        >
          Formación y Certificaciones
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-blue-600" />
                  Universidad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-lg mb-1">Ingeniería en Software</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  Universidad Técnica de Ambato – En curso
                </p>
                <Badge variant="secondary">Activo</Badge>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-600" />
                  Certificaciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                {certificados && certificados.length > 0 ? (
                  <div className="space-y-4">
                    {certificados.map((cert, index) => (
                      <div key={index} className="border-b pb-2">
                        <a
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ver certificación ${cert.titulo}`}
                          className="hover:underline font-semibold text-blue-600 dark:text-blue-400"
                        >
                          {cert.titulo}
                        </a>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {cert.area_descripcion}
                        </p>
                        {cert.institucion && (
                          <Badge className="mt-1">
                            {cert.institucion}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">
                    No hay certificaciones disponibles.
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}