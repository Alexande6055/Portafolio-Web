"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Github, Linkedin, Download, Loader2 } from "lucide-react";
import { Social, SocialInit } from "@/models/sociaLinks";
import { GetSocialLinks } from "@/services/database";
import { motion } from "framer-motion";

export function Contact({ cv }: { cv: string }) {
  const [socialLinks, setSocialLinks] = useState<Social>(SocialInit);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL_CORREO}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: `${process.env.NEXT_PUBLIC_CORREO}`,
          subject: "Contacto desde portafolio",
          text: `Hola, soy ${formData.name} y quiero contactarte.\n\nMensaje: ${formData.message}\n\nEmail de contacto: ${formData.email}`
        })
      });
      if (!response.ok) throw new Error("Fallo el envío");
      setFormData({ name: "", email: "", message: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const obtenerLinks = async () => {
      const data = await GetSocialLinks();
      setSocialLinks(data);
    };
    obtenerLinks();
  }, []);

  return (
    <section id="contacto" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12"
        >
          Contacto
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Envíame un mensaje</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nombre
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full"
                      required
                      disabled={status === "loading"}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full"
                      required
                      disabled={status === "loading"}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Escribe tu mensaje aquí..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full"
                      required
                      disabled={status === "loading"}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        Enviar mensaje
                      </>
                    )}
                  </Button>

                  {status === "success" && (
                    <p className="text-green-600 text-center">
                      ¡Mensaje enviado con éxito!
                    </p>
                  )}
                  {status === "error" && (
                    <p className="text-red-600 text-center">
                      Error al enviar el mensaje. Por favor, intenta de nuevo.
                    </p>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enlaces sociales y contacto */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-6">
                  <a href={cv} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Download className="mr-2 h-4 w-4" /> Descargar CV
                    </Button>
                  </a>
                </div>
                <div className="flex justify-center space-x-4">
                  <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="bg-black text-white hover:bg-gray-800">
                      <Github className="h-5 w-5" />
                    </Button>
                  </a>
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="bg-blue-600 text-white hover:bg-blue-700">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </a>
                  <a href={`mailto:${socialLinks.correo}`} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="icon" className="bg-red-600 text-white hover:bg-red-700">
                      <Mail className="h-5 w-5" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-semibold text-lg mb-4">Información de contacto</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  <Mail className="inline h-4 w-4 mr-2" /> {socialLinks.correo}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Disponible para proyectos freelance y oportunidades laborales.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
