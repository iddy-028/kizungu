
import React from 'react'

const services = [
  {
    icon: '💻',
    title: 'Web Development',
    description:
      'Building modern, responsive websites and web applications using React, JavaScript, Node.js, and other web technologies.',
    tags: ['React', 'JavaScript'],
  },
  {
    icon: '📊',
    title: 'Dashboard Systems',
    description:
      'Developing user-friendly dashboards to manage information, monitor activities, and organize business operations.',
    tags: ['React', 'Admin Panels'],
  },
  {
    icon: '🗄️',
    title: 'Database Design',
    description:
      'Creating structured databases to store, organize, retrieve, and manage application data efficiently.',
    tags: ['MySQL', 'MongoDB'],
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    description:
      'Designing clean, attractive, and responsive interfaces that make websites easy to use on different devices.',
    tags: ['Tailwind CSS', 'Responsive Design'],
  },
  {
    icon: '⚙️',
    title: 'Backend Development',
    description:
      'Building server-side functionality, application logic, and APIs that connect websites to databases.',
    tags: ['Node.js', 'Express.js'],
  },
  {
    icon: '🔐',
    title: 'Authentication Systems',
    description:
      'Implementing login, registration, and role-based access concepts to help protect application features.',
    tags: ['Login', 'Authorization'],
  },
  {
    icon: '🔗',
    title: 'API Integration',
    description:
      'Connecting frontend applications to backend services so information can be sent, received, and displayed.',
    tags: ['REST APIs', 'Axios'],
  },
  {
    icon: '🛠️',
    title: 'Website Maintenance',
    description:
      'Helping improve existing websites by fixing bugs, updating content, and improving responsiveness.',
    tags: ['Debugging', 'Improvements'],
  },
]

const Services = () => {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-gray-950 py-16 md:py-24"
    >
      {/* Background effects */}
      <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
            How I Can Help
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            My <span className="text-blue-400">Services</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Explore the web development services I am learning and
            working toward providing through my software development
            skills.
          </p>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-green-400" />
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-2 hover:border-blue-400/40 hover:bg-white/[0.07] hover:shadow-xl hover:shadow-blue-500/5"
            >
              {/* Icon */}
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-3xl transition duration-300 group-hover:scale-110 group-hover:bg-blue-500/20">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="mb-3 text-xl font-bold text-white transition group-hover:text-blue-400">
                {service.title}
              </h3>

              {/* Description */}
              <p className="flex-grow text-sm leading-7 text-gray-400">
                {service.description}
              </p>

              {/* Technology tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-green-400/20 bg-green-500/10 px-2.5 py-1.5 text-xs text-green-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom decoration */}
              <div className="mt-6 h-1 w-10 rounded-full bg-gradient-to-r from-blue-500 to-green-400 transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* Contact call to action */}
        <div className="mt-14 text-center">
          <p className="mb-5 text-gray-400">
            Have a website idea or project in mind?
          </p>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-blue-700"
          >
            Let's Talk
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Services
