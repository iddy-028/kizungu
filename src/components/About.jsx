
import React from 'react'

const About = () => {
  const technologies = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Node.js',
    'Express.js',
    'PHP',
    'MySQL',
    'MongoDB',
    'Tailwind CSS',
  ]

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gray-950 py-16 md:py-24"
    >
      {/* Background effects */}
      <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
            Discover My Journey
          </span>

          <h2 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            About <span className="text-blue-400">Me</span>
          </h2>

          <p className="mt-4 text-gray-400">
            Get to know the developer behind the projects.
          </p>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-green-400" />
        </div>

        {/* About card */}
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20 backdrop-blur-sm">
          <div className="grid items-center gap-8 p-6 sm:p-8 md:grid-cols-[280px_1fr] md:gap-12 md:p-12">
            {/* Profile */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-500 to-green-400 opacity-70 blur-md" />

                <img
                  src="/profile.jpg"
                  alt="Kizungu Iddy"
                  className="relative h-40 w-40 rounded-full border-4 border-gray-900 object-cover sm:h-48 sm:w-48"
                />
              </div>

              <h3 className="mt-6 text-xl font-bold text-white">
                KIZUNGU IDDY
              </h3>

              <p className="mt-2 text-sm font-medium text-blue-400">
                Software Development Student
              </p>

              <div className="mt-4 flex items-center gap-2 text-sm text-gray-400">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                Always learning and building
              </div>
            </div>

            {/* Introduction */}
            <div>
              <h3 className="mb-5 text-2xl font-bold text-white sm:text-3xl">
                Hello, I'm Iddy! 👋
              </h3>

              <p className="mb-4 leading-7 text-gray-300">
                I am a Software Development student at St. Peter
                College of Shyogwe, where I study Software Development
                (SOD). I am passionate about technology and enjoy
                creating websites and web applications that solve
                real-world problems.
              </p>

              <p className="mb-6 leading-7 text-gray-400">
                I am developing my skills in front-end and back-end
                development, databases, and modern web technologies.
                My goal is to become a skilled full-stack developer
                and build useful, reliable, and user-friendly
                applications.
              </p>

              {/* Technologies */}
              <h4 className="mb-4 text-lg font-semibold text-white">
                Technologies I’m Learning
              </h4>

              <div className="flex flex-wrap gap-2">
                {technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-lg border border-blue-400/20 bg-blue-500/10 px-3 py-2 text-sm text-blue-200 transition duration-300 hover:border-green-400/50 hover:bg-green-500/10"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              {/* Button */}
              <a
                href="#projects"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-blue-700"
              >
                Explore My Projects
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
