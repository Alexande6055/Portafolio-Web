import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Projects } from "@/components/projects"
import { TechStack } from "@/components/tech-stack"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Education } from "@/components/education"

export default function Home() {
  return (

    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />
      <main>
        <Hero />
        <Projects />
        <TechStack />
        <About />
        <Education />
        <Contact />
      </main>
    </div>
  )
}
