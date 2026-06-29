import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <footer className="px-6 md:px-16 lg:px-24 py-12 text-center text-xs text-[#9A9490]">
          built by nick
        </footer>
      </main>
    </>
  )
}
