
import React from 'react'

const achievements = [
  {
    number: '2+',
    label: 'Projects Built',
    description:
      'Practicing my skills by creating websites and web applications.',
    icon: '🚀',
  },
  {
    number: 'L3–L5',
    label: 'Software Development',
    description:
      'My learning journey through different levels of Software Development.',
    icon: '🎓',
  },
  {
    number: '3',
    label: 'Years of Learning',
    description:
      'Developing my programming knowledge and technical skills year by year.',
    icon: '💻',
  },
]

const Achievements = () => {
  return (
    <section
      id="achievements"
      className="relative overflow-hidden bg-gray-950 py-16 md:py-24"
    >
      {/* Background effects */}
      <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-blue-600/15 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
            My Progress
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            My <span className="text-blue-400">Achievements</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Every project and every lesson is another step toward
            becoming a skilled software developer.
          </p>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-green-400" />
        </div>

        {/* Achievement cards */}
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.label}
              className="group rounded-2xl border border-white/10 bg-white/[0.04] p-7 text-center transition duration-300 hover:-translate-y-2 hover:border-blue-400/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-blue-500/10"
            >
              {/* Icon */}
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-3xl transition duration-300 group-hover:scale-110 group-hover:bg-blue-500/20">
                {achievement.icon}
              </div>

              {/* Number */}
              <div className="mb-3 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
                {achievement.number}
              </div>

              {/* Label */}
              <h3 className="mb-3 text-lg font-bold text-white sm:text-xl">
                {achievement.label}
              </h3>

              {/* Description */}
              <p className="text-sm leading-7 text-gray-400">
                {achievement.description}
              </p>

              <div className="mx-auto mt-6 h-1 w-12 rounded-full bg-gradient-to-r from-blue-500 to-green-400 transition-all duration-300 group-hover:w-24" />
            </div>
          ))}
        </div>

        {/* Motivation */}
        <div className="mt-12 text-center">
          <p className="text-base font-medium text-gray-300 sm:text-lg">
            <span className="text-green-400">✦</span>{' '}
            Learning today, building tomorrow.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Achievements
