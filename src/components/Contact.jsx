
import React, { useState } from "react";

// JSONBin configuration
const BIN_ID = "6add1820ac6210605a4f534c";
const ACCESS_KEY = "PASTE_YOUR_WORKING_ACCESS_KEY_HERE";

const contactDetails = [
  {
    title: "Email",
    value: "kizungu06@gmail.com",
    href: "mailto:kizungu06@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),
  },
  {
    title: "GitHub",
    value: "github.com/iddy-028",
    href: "https://github.com/iddy-028",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
        <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.92.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.5 0-1.21.43-2.2 1.15-2.98-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.56 0c2.11-1.44 3.05-1.14 3.05-1.14.61 1.53.23 2.67.11 2.95.72.78 1.15 1.77 1.15 2.98 0 4.27-2.62 5.22-5.11 5.49.4.35.76 1.02.76 2.06V22c0 .29.2.63.77.52A11.1 11.1 0 0 0 12 .9Z" />
      </svg>
    ),
  },
  {
    title: "Phone",
    value: "+250 796-098-467",
    href: "tel:+250796098467",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
        <path d="M5 3h4l2 5-2.5 1.5a15 15 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2C10 20.5 3.5 14 3 5a2 2 0 0 1 2-2Z" />
      </svg>
    ),
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSending) return;

    setIsSending(true);
    setStatus("");
    setStatusType("");

    try {
      const name = formData.name.trim();
      const email = formData.email.trim();
      const message = formData.message.trim();

      if (!name || !email || !message) {
        throw new Error("Please complete all fields.");
      }

      if (
        !BIN_ID ||
        !ACCESS_KEY ||
        ACCESS_KEY === "PASTE_YOUR_WORKING_ACCESS_KEY_HERE"
      ) {
        throw new Error("Please configure your JSONBin Access Key.");
      }

      // Read the existing JSONBin record
      const readResponse = await fetch(
        `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`,
        {
          headers: {
            "X-Access-Key": ACCESS_KEY,
          },
        }
      );

      if (!readResponse.ok) {
        throw new Error(
          `Could not read messages (${readResponse.status}). Check your JSONBin access key and permissions.`
        );
      }

      const binData = await readResponse.json();
      const existingContacts = binData.record?.contacts;

      if (!Array.isArray(existingContacts)) {
        throw new Error(
          'Your JSONBin record must contain "contacts": [].'
        );
      }

      // Create the new message
      const newContact = {
        id:
          typeof crypto !== "undefined" &&
          typeof crypto.randomUUID === "function"
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name,
        email,
        message,
        createdAt: new Date().toISOString(),
      };

      // Preserve projects and other existing record data
      const updatedData = {
        ...binData.record,
        contacts: [...existingContacts, newContact],
      };

      // Save the updated record
      const saveResponse = await fetch(
        `https://api.jsonbin.io/v3/b/${BIN_ID}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Key": ACCESS_KEY,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!saveResponse.ok) {
        throw new Error(
          `Could not save your message (${saveResponse.status}). Check your JSONBin update permissions.`
        );
      }

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setStatus("Your message was sent successfully.");
      setStatusType("success");
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus(
        error.message || "Something went wrong. Please try again."
      );
      setStatusType("error");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gray-950 py-16 md:py-24"
    >
      {/* Background effects */}
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-400">
            Get In Touch
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
            Contact <span className="text-blue-400">Me</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Have a project idea, question, or opportunity? Send me a
            message. I would be happy to hear from you.
          </p>

          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-blue-500 to-green-400" />
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Contact information */}
          <div className="lg:col-span-2">
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-white">
                Let's Connect
              </h3>

              <p className="mt-3 leading-7 text-gray-400">
                I am interested in web development, software projects,
                and opportunities to keep learning and growing.
              </p>

              <div className="mt-8 space-y-5">
                {contactDetails.map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 rounded-xl border border-white/10 bg-gray-900/50 p-4 transition duration-300 hover:border-blue-400/40 hover:bg-white/[0.06]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition group-hover:bg-blue-500/20">
                      {item.icon}
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-gray-300">
                        {item.title}
                      </h4>

                      <p className="mt-1 break-words text-sm text-gray-400 transition group-hover:text-blue-300">
                        {item.value}
                      </p>
                    </div>

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="ml-auto h-4 w-4 shrink-0 text-gray-500 group-hover:text-blue-400"
                      aria-hidden="true"
                    >
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </a>
                ))}
              </div>

              <div className="mt-8 rounded-xl border border-green-400/20 bg-green-500/5 p-4">
                <p className="text-sm leading-6 text-gray-300">
                  <span className="font-semibold text-green-400">
                    Open to learning:
                  </span>{" "}
                  I welcome opportunities to collaborate, build
                  projects, and improve my software development skills.
                </p>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-xl sm:p-8 md:p-10">
              <h3 className="mb-2 text-2xl font-bold text-white">
                Send Me a Message
              </h3>

              <p className="mb-8 text-sm text-gray-400">
                Fill in the form below and I will receive your message.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Full Name
                  </label>

                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    autoComplete="name"
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-white/10 bg-gray-900/70 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Email Address
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    maxLength={254}
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-gray-900/70 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-gray-300"
                  >
                    Your Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    maxLength={5000}
                    rows={5}
                    placeholder="Tell me about your project or question..."
                    className="w-full resize-y rounded-xl border border-white/10 bg-gray-900/70 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white transition duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 0 1 8-8V0C5.37 0 0 5.37 0 12h4Z"
                        />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="h-5 w-5"
                        aria-hidden="true"
                      >
                        <path d="m22 2-7 20-4-9-9-4Z" />
                        <path d="M22 2 11 13" />
                      </svg>
                      Send Message
                    </>
                  )}
                </button>

                {status && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`rounded-xl border p-4 text-sm ${
                      statusType === "success"
                        ? "border-green-400/20 bg-green-500/10 text-green-300"
                        : "border-red-400/20 bg-red-500/10 text-red-300"
                    }`}
                  >
                    {status}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-white/10 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Kizungu Iddy. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
