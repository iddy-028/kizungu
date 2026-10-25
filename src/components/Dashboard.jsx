
import React, { useEffect, useState } from "react";
import { BIN_URL, ACCESS_KEY } from "../config/jsonbin";

const emptyForm = {
  title: "",
  description: "",
  link: "",
  github: "",
  image: "",
  technologies: "",
};

const navItems = [
  { id: "overview", icon: "▦", label: "Overview" },
  { id: "projects", icon: "▣", label: "Projects" },
  { id: "messages", icon: "✉", label: "Messages" },
];

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState("success");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("dashboard-theme") === "dark";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("dashboard-theme", darkMode ? "dark" : "light");
    } catch {
      // The dashboard still works if browser storage is unavailable.
    }
  }, [darkMode]);

  function ensureJsonBinConfigured() {
    if (!BIN_URL || !ACCESS_KEY) {
      throw new Error(
        "JSONBin is not configured. Check src/config/jsonbin.js and add your BIN_URL and ACCESS_KEY."
      );
    }
  }

  async function getLatestRecord() {
    ensureJsonBinConfigured();

    const response = await fetch(`${BIN_URL}/latest`, {
      headers: {
        "X-Access-Key": ACCESS_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`Could not load data. Status: ${response.status}`);
    }

    const data = await response.json();
    return data.record || {};
  }

  async function saveRecord(record) {
    ensureJsonBinConfigured();

    const response = await fetch(BIN_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Key": ACCESS_KEY,
      },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      throw new Error(`Could not save data. Status: ${response.status}`);
    }

    return response.json();
  }

  async function loadData() {
    try {
      setLoading(true);
      setNotice("");

      const record = await getLatestRecord();

      setProjects(
        Array.isArray(record.projects) ? record.projects : []
      );

      setMessages(
        Array.isArray(record.contacts) ? record.contacts : []
      );
    } catch (error) {
      setNotice(error.message || "Failed to load dashboard data.");
      setNoticeType("error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setNotice("");

    try {
      const record = await getLatestRecord();

      const newProject = {
        id: `${Date.now()}`,
        title: form.title.trim(),
        description: form.description.trim(),
        link: form.link.trim(),
        github: form.github.trim(),
        image: form.image.trim(),
        technologies: form.technologies
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        createdAt: new Date().toISOString(),
      };

      const updatedProjects = [
        ...(Array.isArray(record.projects) ? record.projects : []),
        newProject,
      ];

      await saveRecord({
        ...record,
        contacts: Array.isArray(record.contacts)
          ? record.contacts
          : [],
        projects: updatedProjects,
      });

      setProjects(updatedProjects);
      setForm({ ...emptyForm });
      setShowForm(false);
      setNotice("Your project has been published successfully!");
      setNoticeType("success");
      setActiveTab("projects");
    } catch (error) {
      setNotice(error.message || "Could not publish the project.");
      setNoticeType("error");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProject(projectId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    try {
      setNotice("");

      const record = await getLatestRecord();

      const updatedProjects = (
        Array.isArray(record.projects) ? record.projects : []
      ).filter((project) => project.id !== projectId);

      await saveRecord({
        ...record,
        contacts: Array.isArray(record.contacts)
          ? record.contacts
          : [],
        projects: updatedProjects,
      });

      setProjects(updatedProjects);
      setNotice("Project deleted successfully.");
      setNoticeType("success");
    } catch (error) {
      setNotice(error.message || "Could not delete the project.");
      setNoticeType("error");
    }
  }

  async function deleteMessage(messageId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmed) return;

    try {
      setNotice("");

      const record = await getLatestRecord();

      const updatedMessages = (
        Array.isArray(record.contacts) ? record.contacts : []
      ).filter((message) => message.id !== messageId);

      await saveRecord({
        ...record,
        contacts: updatedMessages,
        projects: Array.isArray(record.projects)
          ? record.projects
          : [],
      });

      setMessages(updatedMessages);
      setNotice("Message deleted successfully.");
      setNoticeType("success");
    } catch (error) {
      setNotice(error.message || "Could not delete the message.");
      setNoticeType("error");
    }
  }

  function replyByEmail(message) {
    const email = String(message?.email || "").trim();

    if (!email) {
      setNotice("This message does not have an email address.");
      setNoticeType("error");
      return;
    }

    const name = String(message?.name || "there").trim();
    const subject = encodeURIComponent("Re: Your message to Kizungu Iddy");
    const body = encodeURIComponent(
      `Hello ${name},\n\nThank you for contacting me.\n\n\nBest regards,\nKizungu Iddy`
    );

    // Opens the user's default email application; it does not send automatically.
    window.location.assign(`mailto:${email}?subject=${subject}&body=${body}`);
  }

  const filteredProjects = projects.filter((project) =>
    `${project.title || ""} ${project.description || ""} ${
      (project.technologies || []).join(" ")
    }`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const filteredMessages = messages.filter((message) =>
    `${message.name || ""} ${message.email || ""} ${
      message.message || ""
    }`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const recentProjects = [...projects].reverse().slice(0, 3);
  const recentMessages = [...messages].reverse().slice(0, 4);

  function changeTab(tab) {
    setActiveTab(tab);
    setSearch("");
    setSidebarOpen(false);
    setNotice("");
  }

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-500/10";

  const primaryButton =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div className={`dashboard-shell min-h-screen bg-slate-50 text-slate-800 ${darkMode ? "dashboard-dark" : ""}`}>
      <style>{`
        .dashboard-shell { transition: background-color .25s ease, color .25s ease; }
        .dashboard-dark { background-color: #090f1b !important; color: #e5e7eb !important; color-scheme: dark; }
        .dashboard-dark .bg-white,
        .dashboard-dark header { background-color: #111827 !important; }
        .dashboard-dark .bg-slate-50 { background-color: #0b1220 !important; }
        .dashboard-dark .bg-slate-100 { background-color: #1f2937 !important; }
        .dashboard-dark .border-slate-200,
        .dashboard-dark .border-slate-300 { border-color: #293548 !important; }
        .dashboard-dark .border-slate-100 { border-color: #202b3b !important; }
        .dashboard-dark .text-slate-900,
        .dashboard-dark .text-slate-800 { color: #f3f4f6 !important; }
        .dashboard-dark .text-slate-700,
        .dashboard-dark .text-slate-600 { color: #d1d5db !important; }
        .dashboard-dark .text-slate-500,
        .dashboard-dark .text-slate-400 { color: #9ca3af !important; }
        .dashboard-dark input,
        .dashboard-dark textarea,
        .dashboard-dark select { background-color: #0b1220 !important; color: #f3f4f6 !important; border-color: #374151 !important; }
        .dashboard-dark input::placeholder,
        .dashboard-dark textarea::placeholder { color: #6b7280 !important; }
        .dashboard-dark .divide-slate-100 > :not([hidden]) ~ :not([hidden]) { border-color: #202b3b !important; }
        .dashboard-dark .shadow-sm,
        .dashboard-dark .shadow-md,
        .dashboard-dark .shadow-xl { --tw-shadow-color: rgb(0 0 0 / .25); }
      `}</style>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-600 text-xl font-black text-white shadow-lg shadow-green-600/20">
            I
          </div>

          <div>
            <h2 className="text-base font-extrabold tracking-tight text-slate-900">
              IDDY<span className="text-green-600">.</span>
            </h2>
            <p className="text-xs text-slate-500">Portfolio Admin</p>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="ml-auto text-xl text-slate-500 lg:hidden"
            aria-label="Close navigation"
          >
            ×
          </button>
        </div>

        <div className="px-4 py-7">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Workspace
          </p>

          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => changeTab(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  activeTab === item.id
                    ? "bg-green-50 text-green-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg text-lg">
                  {item.icon}
                </span>

                <span>{item.label}</span>

                {item.id === "messages" && messages.length > 0 && (
                  <span className="ml-auto rounded-full bg-green-100 px-2 py-1 text-[10px] font-bold text-green-700">
                    {messages.length}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <p className="mb-3 mt-9 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Quick Actions
          </p>

          <button
            type="button"
            onClick={() => {
              setActiveTab("projects");
              setShowForm(true);
              setSidebarOpen(false);
              setSearch("");
            }}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-600 transition hover:bg-green-50 hover:text-green-700"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg text-xl">
              +
            </span>
            Add New Project
          </button>

          <button
            type="button"
            onClick={loadData}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            <span className="flex h-7 w-7 items-center justify-center text-lg">
              ↻
            </span>
            Refresh Data
          </button>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 p-5 text-white">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-xl">
              ✦
            </div>
            <p className="font-bold">Keep building!</p>
            <p className="mt-2 text-xs leading-5 text-green-50">
              Showcase your best work and keep your portfolio updated.
            </p>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-xs font-bold underline underline-offset-4"
            >
              View Portfolio ↗
            </a>
          </div>

          <p className="mt-5 text-center text-[10px] text-slate-400">
            © {new Date().getFullYear()} IDDY Portfolio
          </p>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="min-h-screen lg:ml-64">
        {/* TOP HEADER */}
        <header className="sticky top-0 z-20 flex min-h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur-xl sm:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-xl text-slate-600 lg:hidden"
              aria-label="Open navigation"
            >
              ☰
            </button>

            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-400">
                Workspace /{" "}
                {navItems.find((item) => item.id === activeTab)?.label}
              </p>

              <h1 className="mt-1 truncate text-lg font-extrabold text-slate-900 sm:text-xl">
                {activeTab === "overview"
                  ? "Dashboard Overview"
                  : activeTab === "projects"
                  ? "Project Management"
                  : "Contact Messages"}
              </h1>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-green-300 hover:text-green-700 sm:inline-flex"
            >
              View Website ↗
            </a>

            <button
              type="button"
              onClick={() => setDarkMode((current) => !current)}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:border-green-300 hover:text-green-700"
            >
              <span aria-hidden="true" className="text-lg">{darkMode ? "☀" : "☾"}</span>
              <span className="hidden md:inline">{darkMode ? "Light mode" : "Dark mode"}</span>
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-green-700 ring-4 ring-green-50">
              KI
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] p-4 sm:p-8">
          {/* NOTIFICATIONS */}
          {notice && (
            <div
              role="status"
              className={`mb-6 flex items-start justify-between gap-3 rounded-xl border p-4 text-sm ${
                noticeType === "error"
                  ? "border-red-200 bg-red-50 text-red-700"
                  : "border-green-200 bg-green-50 text-green-800"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg">
                  {noticeType === "error" ? "⚠" : "✓"}
                </span>
                <p>{notice}</p>
              </div>

              <button
                type="button"
                onClick={() => setNotice("")}
                className="font-bold"
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          )}

          {/* PAGE INTRO */}
          <section className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold text-green-700">
                Welcome back, Iddy 👋
              </p>

              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                {activeTab === "overview"
                  ? "Your portfolio at a glance."
                  : activeTab === "projects"
                  ? "Manage your projects."
                  : "Stay connected with visitors."}
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
                {activeTab === "overview"
                  ? "Track your published work and keep up with people contacting you."
                  : activeTab === "projects"
                  ? "Publish new work, update your showcase, and remove old projects."
                  : "Review messages from visitors and reply to them by email."}
              </p>
            </div>

            {activeTab !== "messages" && (
              <button
                type="button"
                onClick={() => {
                  setActiveTab("projects");
                  setShowForm(true);
                }}
                className={primaryButton}
              >
                <span className="text-lg">+</span>
                Add New Project
              </button>
            )}
          </section>

          {/* STATISTICS */}
          <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl text-green-700">
                  ▣
                </div>
                <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                  Portfolio
                </span>
              </div>
              <p className="mt-5 text-sm font-medium text-slate-500">
                Total Projects
              </p>
              <h3 className="mt-1 text-3xl font-extrabold text-slate-900">
                {loading ? "—" : projects.length}
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                Projects in your portfolio
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl text-blue-600">
                  ✉
                </div>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  Inbox
                </span>
              </div>
              <p className="mt-5 text-sm font-medium text-slate-500">
                Contact Messages
              </p>
              <h3 className="mt-1 text-3xl font-extrabold text-slate-900">
                {loading ? "—" : messages.length}
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                Messages received from visitors
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl text-purple-600">
                  ⌘
                </div>
                <span className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-purple-700">
                  Skills
                </span>
              </div>
              <p className="mt-5 text-sm font-medium text-slate-500">
                Technologies
              </p>
              <h3 className="mt-1 text-3xl font-extrabold text-slate-900">
                {new Set(
                  projects.flatMap((project) =>
                    Array.isArray(project.technologies)
                      ? project.technologies
                      : []
                  )
                ).size}
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                Unique technologies in projects
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-2xl text-amber-600">
                  ↗
                </div>
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                  Links
                </span>
              </div>
              <p className="mt-5 text-sm font-medium text-slate-500">
                Live Projects
              </p>
              <h3 className="mt-1 text-3xl font-extrabold text-slate-900">
                {projects.filter((project) => project.link).length}
              </h3>
              <p className="mt-2 text-xs text-slate-400">
                Projects with live URLs
              </p>
            </div>
          </section>

          {/* LOADING */}
          {loading && (
            <div className="mb-8 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-green-600 border-t-transparent" />
              Loading your portfolio data...
            </div>
          )}

          {/* OVERVIEW TAB */}
          {activeTab === "overview" && !loading && (
            <div className="grid items-start gap-6 xl:grid-cols-5">
              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white xl:col-span-3">
                <div className="flex items-center justify-between gap-3 border-b border-slate-100 p-5 sm:p-6">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Recent Projects
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Your latest published work
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => changeTab("projects")}
                    className="text-xs font-bold text-green-700 hover:text-green-800"
                  >
                    View all →
                  </button>
                </div>

                {recentProjects.length === 0 ? (
                  <div className="p-10 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-2xl text-green-700">
                      ▣
                    </div>
                    <h4 className="mt-4 font-bold text-slate-800">
                      No projects yet
                    </h4>
                    <p className="mt-2 text-sm text-slate-500">
                      Publish your first project to get started.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("projects");
                        setShowForm(true);
                      }}
                      className={`${primaryButton} mt-5`}
                    >
                      + Create Project
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {recentProjects.map((project) => (
                      <div
                        key={project.id}
                        className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center"
                      >
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="h-20 w-full rounded-xl border border-slate-100 object-cover sm:w-24"
                          />
                        ) : (
                          <div className="flex h-20 w-full items-center justify-center rounded-xl bg-green-50 text-2xl text-green-700 sm:w-24">
                            &lt;/&gt;
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <h4 className="truncate font-bold text-slate-800">
                            {project.title}
                          </h4>
                          <p className="mt-1 text-sm text-slate-500">
                            {(project.technologies || [])
                              .slice(0, 3)
                              .join(" · ") || "No technologies listed"}
                          </p>
                          <p className="mt-2 text-xs text-slate-400">
                            {project.createdAt
                              ? new Date(
                                  project.createdAt
                                ).toLocaleDateString()
                              : "Date not available"}
                          </p>
                        </div>

                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-semibold text-green-700 hover:underline"
                          >
                            Preview ↗
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white xl:col-span-2">
                <div className="flex items-center justify-between border-b border-slate-100 p-5 sm:p-6">
                  <div>
                    <h3 className="font-bold text-slate-900">
                      Latest Messages
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Recent visitor enquiries
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => changeTab("messages")}
                    className="text-xs font-bold text-green-700 hover:text-green-800"
                  >
                    View all →
                  </button>
                </div>

                {recentMessages.length === 0 ? (
                  <div className="p-10 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl text-blue-600">
                      ✉
                    </div>
                    <h4 className="mt-4 font-bold text-slate-800">
                      No messages yet
                    </h4>
                    <p className="mt-2 text-sm text-slate-500">
                      Messages from your contact form will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {recentMessages.map((message, index) => (
                      <div
                        key={message.id || `${message.email}-${index}`}
                        className="flex gap-3 p-5 transition hover:bg-slate-50"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                          {(message.name || "?")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-sm font-bold text-slate-800">
                            {message.name || "Anonymous"}
                          </h4>
                          <p className="truncate text-xs text-slate-400">
                            {message.email || "No email provided"}
                          </p>
                          <p className="mt-2 line-clamp-2 break-words text-sm leading-5 text-slate-600">
                            {message.message || "No message content"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === "projects" && !loading && (
            <section>
              {showForm && (
                <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                  <div className="mb-7 flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-green-700">
                        Portfolio Content
                      </p>
                      <h3 className="mt-2 text-xl font-extrabold text-slate-900">
                        Publish a New Project
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Fill in your project details below.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-xl text-slate-500 hover:bg-slate-50"
                      aria-label="Close project form"
                    >
                      ×
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Project Title *
                        </label>
                        <input
                          name="title"
                          value={form.title}
                          onChange={handleChange}
                          placeholder="Kigali Transport Hub"
                          required
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Live Project URL *
                        </label>
                        <input
                          name="link"
                          type="url"
                          value={form.link}
                          onChange={handleChange}
                          placeholder="https://your-project.vercel.app"
                          required
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Project Description *
                      </label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Describe the problem your project solves and the features you built..."
                        rows={4}
                        required
                        className={inputClass}
                      />
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          GitHub Repository
                        </label>
                        <input
                          name="github"
                          type="url"
                          value={form.github}
                          onChange={handleChange}
                          placeholder="https://github.com/username/project"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Preview Image URL
                        </label>
                        <input
                          name="image"
                          type="url"
                          value={form.image}
                          onChange={handleChange}
                          placeholder="https://example.com/preview.png"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {form.image && (
                      <div>
                        <p className="mb-2 text-sm font-semibold text-slate-700">
                          Image Preview
                        </p>
                        <img
                          src={form.image}
                          alt="Project preview"
                          className="h-48 w-full rounded-xl border border-slate-200 object-cover sm:w-96"
                          onError={(event) => {
                            event.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    )}

                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Technologies
                      </label>
                      <input
                        name="technologies"
                        value={form.technologies}
                        onChange={handleChange}
                        placeholder="React, Tailwind CSS, Node.js, MySQL"
                        className={inputClass}
                      />
                      <p className="mt-2 text-xs text-slate-400">
                        Separate each technology with a comma.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-5">
                      <button
                        type="submit"
                        disabled={saving}
                        className={primaryButton}
                      >
                        {saving ? "Publishing..." : "✓ Publish Project"}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setShowForm(false);
                          setForm({ ...emptyForm });
                        }}
                        className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Your Projects
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {projects.length} project
                    {projects.length === 1 ? "" : "s"} published
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search projects..."
                    className={`${inputClass} sm:w-64`}
                  />

                  {!showForm && (
                    <button
                      type="button"
                      onClick={() => setShowForm(true)}
                      className={primaryButton}
                    >
                      + Add Project
                    </button>
                  )}
                </div>
              </div>

              {filteredProjects.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-50 text-3xl text-green-700">
                    ▣
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-800">
                    {projects.length === 0
                      ? "Your portfolio is ready for its first project"
                      : "No matching projects found"}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {projects.length === 0
                      ? "Add a project to showcase your development skills."
                      : "Try another search term."}
                  </p>

                  {projects.length === 0 && (
                    <button
                      type="button"
                      onClick={() => setShowForm(true)}
                      className={`${primaryButton} mt-5`}
                    >
                      + Create First Project
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filteredProjects.map((project) => (
                    <article
                      key={project.id}
                      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60"
                    >
                      <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 to-slate-100">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={`${project.title} preview`}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <span className="text-5xl font-black text-green-600">
                            &lt;/&gt;
                          </span>
                        )}

                        <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/90 px-3 py-1 text-xs font-bold text-green-700 shadow-sm">
                          Published
                        </span>
                      </div>

                      <div className="p-5">
                        <h4 className="text-lg font-extrabold text-slate-900">
                          {project.title}
                        </h4>

                        <p className="mt-2 break-words text-sm leading-6 text-slate-500">
                          {project.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {(project.technologies || []).map(
                            (technology, index) => (
                              <span
                                key={`${technology}-${index}`}
                                className="rounded-lg bg-green-50 px-2.5 py-1.5 text-xs font-semibold text-green-700"
                              >
                                {technology}
                              </span>
                            )
                          )}
                        </div>

                        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 rounded-lg bg-green-600 px-3 py-2 text-xs font-bold text-white hover:bg-green-700"
                            >
                              Live Demo ↗
                            </a>
                          )}

                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                            >
                              GitHub ↗
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => deleteProject(project.id)}
                            className="ml-auto rounded-lg px-3 py-2 text-xs font-bold text-red-500 transition hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* MESSAGES TAB */}
          {activeTab === "messages" && !loading && (
            <section>
              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-sm font-medium text-slate-500">
                    Total Messages
                  </p>
                  <p className="mt-2 text-3xl font-extrabold text-slate-900">
                    {messages.length}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <p className="text-sm font-medium text-slate-500">
                    Search Results
                  </p>
                  <p className="mt-2 text-3xl font-extrabold text-green-700">
                    {filteredMessages.length}
                  </p>
                </div>
              </div>

              <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    Inbox
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Messages submitted through your portfolio contact form.
                  </p>
                </div>

                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search messages..."
                  className={`${inputClass} sm:w-72`}
                />
              </div>

              {filteredMessages.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-3xl text-blue-600">
                    ✉
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-800">
                    {messages.length === 0
                      ? "Your inbox is empty"
                      : "No matching messages"}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    {messages.length === 0
                      ? "New contact form messages will appear here."
                      : "Try searching with a different name or email."}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredMessages.map((message, index) => (
                    <article
                      key={message.id || `${message.email}-${index}`}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-lg font-extrabold text-green-700">
                          {(message.name || "?")
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                            <div>
                              <h4 className="font-extrabold text-slate-900">
                                {message.name || "Anonymous"}
                              </h4>
                              <p className="mt-1 break-all text-sm text-green-700">
                                {message.email || "No email provided"}
                              </p>
                            </div>

                            <span className="text-xs text-slate-400">
                              {message.createdAt
                                ? new Date(
                                    message.createdAt
                                  ).toLocaleString()
                                : "Date unavailable"}
                            </span>
                          </div>

                          <div className="mt-4 whitespace-pre-wrap break-words rounded-xl bg-slate-50 p-4 text-sm leading-7 text-slate-600">
                            {message.message || "No message content"}
                          </div>

                          <div className="mt-4 flex flex-wrap gap-3">
                            <button
                              type="button"
                              onClick={() => replyByEmail(message)}
                              disabled={!message.email}
                              title={!message.email ? "This message has no email address" : "Open your email app to reply"}
                              className={primaryButton}
                            >
                              ✉ Reply by Email
                            </button>

                            <button
                              type="button"
                              onClick={() => deleteMessage(message.id)}
                              className="rounded-xl border border-red-200 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                            >
                              Delete Message
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* FOOTER */}
          <footer className="mt-12 flex flex-col justify-between gap-3 border-t border-slate-200 py-6 text-xs text-slate-400 sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} Kizungu Iddy. All rights reserved.
            </p>
            <p>
              Built with <span className="font-bold text-green-600">React</span>
              {" "}and <span className="font-bold text-green-600">Tailwind CSS</span>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}