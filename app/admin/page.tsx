"use client"

import { useEffect, useState } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { Button } from "@/components/ui/button"
import { auth } from "@/services/FirebaseConfig"
import { Projects } from "@/components/admin/Projects"
import { Contact } from "@/components/admin/Contact"
import AdminStackView from "@/components/admin/AdminStackView"
import { AdminAbout } from "@/components/admin/AdminAbout"

// Importa las secciones


type Section = "proyectos" | "stack" | "sobre-mi" | "contacto"

export default function AdminPage() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)
    const [section, setSection] = useState<Section>("proyectos")

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (!firebaseUser) {
                window.location.href = "/login"
            } else {
                setUser(firebaseUser)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-700 dark:text-gray-300">Cargando...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen px-8 py-16 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <h1 className="text-2xl font-bold mb-6">Panel Admin</h1>

            {/* Navegación interna */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
                <Button onClick={() => setSection("proyectos")}>Editar Proyectos</Button>
                <Button onClick={() => setSection("stack")}>Editar Stack</Button>
                <Button onClick={() => setSection("sobre-mi")}>Editar Sobre Mí</Button>
                <Button onClick={() => setSection("contacto")}>Editar Contacto</Button>
            </div>

            {/* Contenido dinámico */}
            <div>
                {section === "proyectos" && <Projects />}
                {section === "stack" && <AdminStackView />}
                {section === "sobre-mi" && <AdminAbout />}
                {section === "contacto" && <Contact />}
            </div>
        </div>
    )
}
