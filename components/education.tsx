"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Award } from "lucide-react"
import { useEffect, useState } from "react"
import { certificado } from "@/models/Certificacion"
import { Certificaciones, stacks } from "@/services/database";

export function Education() {
  const [loading, setLoading] = useState(true);
  const [certificados, setCertificados] = useState<certificado[]>([]);
  useEffect(() => {
    try {

      const cargarCertificados = async () => {
        const data = await Certificaciones();
        setCertificados(data);
        stacks();
      }
      cargarCertificados();
    } catch (error) {
      console.error("Error al obtener datos:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  if (loading) {
    return (
      <section
        id="sobre-mi"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800"
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
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Formación y Certificaciones
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-600" />
                Universidad
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg mb-2">Ingeniería en Software</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">En curso - Estudiante Actual</p>
              <Badge variant="secondary">Activo</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-green-600" />
                Certificaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              {certificados && certificados.length > 0 ? (
                <div className="space-y-3">
                  {certificados.map((cert, index) => (
                    <div key={index}>
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        <h3 className="font-semibold">{cert.titulo}</h3>
                      </a>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{cert.area_descripcion}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">No hay certificaciones disponibles.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
