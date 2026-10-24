
import React from 'react'

const experiences = [
  {
    year: '2025–2026',
    level: 'L5 SOD',
    title: 'Building My First Web Applications',
    description:
      'Developing my software development skills by building web applications with React, Node.js, Express.js, and databases. Learning how frontend and backend systems work together.',
    technologies: ['React', 'Node.js', 'Express.js', 'MySQL'],
    icon: '🚀',
  },
  {
    year: '2024–2025',
    level: 'L4 SOD',
    title: 'Improving My Programming Skills',
    description:
      'Building a foundation in software development, learning programming concepts, working with databases, and understanding how to design and develop applications.',
    technologies: ['Programming', 'Databases', 'Web Development'],
    icon: '💻',
  },
  {
    year: '2023–2024',
    level: 'L3 SOD',
    title: 'Started My Software Development Journey',
    description:
      'Started studying Software Development and exploring the fundamentals of programming, computer technology, and creating websites.',
    technologies: ['Computer Basics', 'HTML', 'CSS'],
    icon: '🌱',
  },
]

const Experience = () => {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-gray-950 py-16 md:py-24"
    >
      {/* Background effects */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="inline-block rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
            My Learning Journey
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            My <span className="text-blue-400">Experience</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            My journey from learning programming fundamentals to
            building modern web applications.
          </p>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-green-400" />
        </div>

        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl">
          {/* Timeline line */}
          <div className="absolute bottom-8 left-5 top-8 w-0.5 bg-gradient-to-b from-blue-500 via-green-400 to-blue-500 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-8 md:space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.level}
                className={`relative flex items-start ${
                  index % 2 === 0
                    ? 'md:flex-row'
                    : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline marker */}
                <div className="absolute left-5 top-7 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-gray-950 bg-blue-500 text-lg shadow-lg shadow-blue-500/30 md:left-1/2">
                  {exp.icon}
                </div>

                {/* Card */}
                <div
                  className={`ml-12 w-full rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-blue-500/5 sm:p-7 md:ml-0 md:w-[calc(50%-40px)] ${
                    index % 2 === 0
                      ? 'md:mr-auto'
                      : 'md:ml-auto'
                  }`}
                >
                  <span className="inline-block rounded-full border border-green-400/20 bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-300">
                    {exp.year}
                  </span>

                  <p className="mt-4 text-sm font-bold uppercase tracking-wider text-blue-400">
                    {exp.level}
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-white">
                    {exp.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-400 sm:text-base">
                    {exp.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-lg border border-white/10 bg-gray-900/70 px-3 py-1.5 text-xs text-gray-300"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer message */}
        <div className="mt-14 text-center">
          <p className="text-gray-400">
            <span className="text-green-400">●</span>{' '}
            Learning every day. Building step by step.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Experience
