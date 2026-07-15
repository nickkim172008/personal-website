import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Work from '@/components/Work'
import Projects from '@/components/Projects'
import Personal from '@/components/Personal'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <a id="top" className="sr-only" aria-hidden="true" />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Work />
        <Projects />
        <Personal />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
