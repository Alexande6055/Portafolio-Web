"use client"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CategoriaStack, CategoriaStackInit } from "@/models/Tecnologias"
import { stacks } from "@/services/database"
import { agregarATecnologia, eliminarDeTecnologia } from "@/services/databaseAdmin"

const categorias = ["Front_End", "Back_End", "Databases", "Dev_Tools"] as const
type Categoria = keyof CategoriaStack


export default function AdminStackView() {
    const [techStack, setTechStack] = useState<CategoriaStack>(CategoriaStackInit)
    const [newTech, setNewTech] = useState<Record<Categoria, string>>({
        Front_End: "",
        Back_End: "",
        Databases: "",
        Dev_Tools: "",
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const obtenerStacks = async () => {
            try {
                const data = await stacks();
                setTechStack(data);
            } catch (error) {
                console.error("Error al obtener datos:", error);
            } finally {
                setLoading(false);
            }
        }

        obtenerStacks()
    }, [])


    const handleAddTech = (categoria: Categoria) => {
        const nuevaTecnologia = newTech[categoria].trim()
        if (!nuevaTecnologia) return

        if (techStack[categoria].includes(nuevaTecnologia)) return // evitar duplicados
        agregarATecnologia(categoria, nuevaTecnologia);

        setTechStack(prev => ({
            ...prev,
            [categoria]: [...prev[categoria], nuevaTecnologia],
        }))

        setNewTech(prev => ({ ...prev, [categoria]: "" }))
    }

    const handleRemoveTech = (categoria: Categoria, tech: string) => {

        eliminarDeTecnologia(categoria, tech);
        setTechStack(prev => ({
            ...prev,
            [categoria]: prev[categoria].filter(t => t !== tech),
        }))
    }

    if (loading) return <p className="text-center mt-10">Cargando...</p>

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 space-y-10">
            <h1 className="text-3xl font-bold text-center mb-6">Editar Stack Tecnológico</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {categorias.map((categoria) => (
                    <div key={categoria}>
                        <h3 className="text-xl font-semibold mb-3">{categoria.replace(/_/g, " ")}</h3>

                        {/* Lista de tecnologías */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {techStack[categoria].map((tech) => (
                                <Badge
                                    key={tech}
                                    className="cursor-pointer hover:line-through transition"
                                    onClick={() => handleRemoveTech(categoria, tech)}
                                >
                                    {tech}
                                </Badge>
                            ))}
                        </div>

                        {/* Formulario de entrada */}
                        <div className="flex gap-2">
                            <Input
                                placeholder="Nueva tecnología"
                                value={newTech[categoria]}
                                onChange={(e) =>
                                    setNewTech(prev => ({ ...prev, [categoria]: e.target.value }))
                                }
                            />
                            <Button onClick={() => handleAddTech(categoria)}>Agregar</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
