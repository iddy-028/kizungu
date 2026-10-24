
import React, { useEffect, useState } from "react";
import { BIN_URL, ACCESS_KEY } from "../config/jsonbin";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${BIN_URL}/latest`, {
          headers: {
            "X-Access-Key": ACCESS_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to load projects (${response.status}).`);
        }

        const data = await response.json();
        const savedProjects = data.record?.projects;

        setProjects(Array.isArray(savedProjects) ? savedProjects : []);
      } catch (err) {
        console.error("Projects error:", err);
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-gray-950 px-5 py-24 text-white sm:px-8"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-sm font-medium text-green-400">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            MY PORTFOLIO
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Featured{" "}
            <span className="text-green-400">Projects</span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-400">
            Here are some of the projects I have built using my software
            development skills. Explore each project to learn more.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-gray-800 bg-gray-900"
              >
                <div className="h-52 bg-gray-800" />
                <div className="space-y-3 p-6">
                  <div className="h-5 w-2/3 rounded bg-gray-800" />
                  <div className="h-3 rounded bg-gray-800" />
                  <div className="h-3 w-4/5 rounded bg-gray-800" />
                  <div className="h-9 w-32 rounded bg-gray-800" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mx-auto max-w-xl rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center">
            <p className="font-semibold text-red-400">
              Unable to load projects
            </p>
            <p className="mt-2 text-sm text-gray-300">{error}</p>
            <p className="mt-2 text-sm text-gray-400">
              Check your JSONBin configuration and internet connection.
            </p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && projects.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-900/50 px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-500/10 text-3xl text-green-400">
              {"</>"}
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Projects Coming Soon
            </h3>

            <p className="mx-auto mt-2 max-w-md text-gray-400">
              My projects will appear here. Please check back soon!
            </p>
          </div>
        )}

        {/* Project cards */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/90 shadow-lg shadow-black/10 transition duration-300 hover:-translate-y-2 hover:border-green-400/60 hover:shadow-green-950/30"
              >
                {/* Image preview */}
                <div className="relative h-52 overflow-hidden bg-gray-800">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.title} preview`}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                        event.currentTarget.parentElement.classList.add(
                          "image-failed"
                        );
                      }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-green-500/20 via-gray-900 to-gray-800">
                      <span className="text-6xl font-black text-green-400/90">
                        {project.title?.charAt(0)?.toUpperCase() || "P"}
                      </span>
                    </div>
                  )}

                  <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-gray-950/80 px-3 py-1 text-xs font-semibold text-green-300 backdrop-blur">
                    Project
                  </div>
                </div>

                {/* Card details */}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-bold transition group-hover:text-green-400">
                    {project.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-gray-400">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  {Array.isArray(project.technologies) &&
                    project.technologies.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies.map((technology, index) => (
                          <span
                            key={`${technology}-${index}`}
                            className="rounded-md border border-green-400/10 bg-green-400/5 px-2.5 py-1.5 text-xs text-green-300"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    )}

                  {/* Action links */}
                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-gray-800 pt-5">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2.5 text-sm font-bold text-gray-950 transition hover:bg-green-400"
                      >
                        Live Preview
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-4 py-2.5 text-sm font-semibold text-gray-200 transition hover:border-green-400 hover:text-green-400"
                      >
                        GitHub
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Footer link */}
        {!loading && !error && projects.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Showing {projects.length}{" "}
              {projects.length === 1 ? "project" : "projects"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
