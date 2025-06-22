"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Github, Linkedin, Download } from "lucide-react"
import { Social, SocialInit } from "@/models/sociaLinks"
import { GetSocialLinks } from "@/services/database"

export function Contact() {
  const [socialLinks, setSocialLinks] = useState<Social>(SocialInit);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    const obtenerEnlacesSociales = async () => {
      const data = await GetSocialLinks();
      setSocialLinks(data);
    }
    obtenerEnlacesSociales();
  }, []);
  return (
    <section id="contacto" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Contacto</h2>

        <div className="grid md:grid-cols-2 gap-12">
          <Card>
            <CardHeader>
              <CardTitle>Envíame un mensaje</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Textarea
                  name="message"
                  placeholder="Mensaje"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Enviar mensaje
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-6">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar CV
                  </Button>
                </div>

                <div className="flex justify-center space-x-4">
                  <a
                    href={socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-black text-white border-gray-700 hover:bg-gray-800"
                    >
                      <Github className="h-5 w-5" />
                    </Button>
                  </a>

                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                    >
                      <Linkedin className="h-5 w-5" />
                    </Button>
                  </a>

                  <a
                    href={`mailto:${socialLinks.correo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-red-600 text-white border-red-600 hover:bg-red-700"
                    >
                      <Mail className="h-5 w-5" />
                    </Button>
                  </a>

                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4 text-center">Información de contacto</h3>
                <div className="space-y-2 text-center">
                  <p className="text-gray-600 dark:text-gray-300">
                    <Mail className="inline h-4 w-4 mr-2" />
                    {socialLinks.correo}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Disponible para proyectos freelance y oportunidades laborales
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
