
import React from 'react'

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: '🎨',
    description: 'Building modern and responsive user interfaces.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS'],
  },
  {
    title: 'Backend Development',
    icon: '⚙️',
    description: 'Creating server-side applications and APIs.',
    skills: ['Node.js', 'Express.js', 'PHP', 'REST APIs'],
  },
  {
    title: 'Database Management',
    icon: '🗄️',
    description: 'Storing, organizing, and managing application data.',
    skills: ['MySQL', 'MongoDB', 'Database Design'],
  },
  {
    title: 'Tools & Other Skills',
    icon: '🚀',
    description: 'Tools and practices for building reliable applications.',
    skills: [
      'Git & GitHub',
      'Authentication',
      'UI/UX Design',
      'API Integration',
    ],
  },
]

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-gray-950 py-16 md:py-24"
    >
      {/* Background effects */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
            What I Can Do
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            My <span className="text-blue-400">Skills</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Technologies and tools I am learning and using to build
            modern websites and web applications.
          </p>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-green-400" />
        </div>

        {/* Skill cards */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-2 hover:border-blue-400/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-blue-500/5 sm:p-8"
            >
              {/* Icon and title */}
              <div className="mb-5 flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-2xl transition duration-300 group-hover:bg-blue-500/20">
                  {category.icon}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white sm:text-xl">
                    {category.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {category.description}
                  </p>
                </div>
              </div>

              {/* Skills list */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-gray-900/70 px-3 py-2 text-sm text-gray-300 transition duration-300 hover:border-green-400/40 hover:text-green-300"
                  >
                    <svg
                      className="h-4 w-4 shrink-0 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>

                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400 sm:text-base">
            <span className="text-green-400">●</span>{' '}
            Always learning, practicing, and improving my skills.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Skills
