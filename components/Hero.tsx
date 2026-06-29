export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-20 pb-10"
    >
      <div className="max-w-5xl">
        <h1
          className="font-playfair font-black leading-[0.9] tracking-tight text-[#2C2A27] select-none"
          style={{ fontSize: 'clamp(5.5rem, 16vw, 13rem)' }}
        >
          nick
        </h1>
        <p className="mt-6 text-[#7A7570] font-inter text-base md:text-lg leading-relaxed max-w-lg">
          incoming waterloo management engineering student.
          currently building at{' '}
          <span className="text-[#2C2A27] font-medium">appli ai</span>
          {' '}&amp;{' '}
          <span className="text-[#2C2A27] font-medium">algoverse</span>.
        </p>
      </div>
    </section>
  )
}
