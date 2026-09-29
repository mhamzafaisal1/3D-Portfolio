import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/models/contact/ContactExperience";
import { profile } from "../constants";
import Safe3D from "../components/Safe3D";
import LazyMount from "../components/LazyMount";
import { MailIcon, LinkedinIcon, GithubIcon } from "../components/ui/Icons";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // "sent" | "error" | null
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;

    // No EmailJS keys configured: fall back to the visitor's mail client.
    if (!serviceId) {
      const subject = encodeURIComponent(`Portfolio contact from ${form.name}`);
      const body = encodeURIComponent(`${form.message}\n\n${form.name} <${form.email}>`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      await emailjs.sendForm(
        serviceId,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );

      // Reset form and stop loading
      setForm({ name: "", email: "", message: "" });
      setStatus("sent");
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    } finally {
      setLoading(false); // Always stop loading, even on error
    }
  };

  return (
    <section id="contact" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Let’s Build Something Real-time"
          sub="💬 Open to full stack engineering roles"
        />
        <div className="grid-12-cols mt-16">
          <div className="xl:col-span-5">
            <div className="flex-center card-border rounded-xl p-10">
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="w-full flex flex-col gap-7"
              >
                <div>
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about the role or project"
                    rows="5"
                    required
                  />
                </div>

                <button type="submit">
                  <div className="cta-button group">
                    <div className="bg-circle" />
                    <p className="text">
                      {loading ? "Sending..." : "Send Message"}
                    </p>
                    <div className="arrow-wrapper">
                      <img src="/images/arrow-down.svg" alt="arrow" />
                    </div>
                  </div>
                </button>
                {status === "sent" && (
                  <p className="text-[#45dec4] text-sm" role="status">Thanks, message sent. I’ll get back to you soon.</p>
                )}
                {status === "error" && (
                  <p className="text-[#fd5c79] text-sm" role="alert">
                    Something went wrong. Email me directly at {profile.email}.
                  </p>
                )}
              </form>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-2 card-border rounded-lg px-4 py-3 text-white-50 hover:bg-black-50 transition-colors">
                <MailIcon className="size-5" /> Email
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 card-border rounded-lg px-4 py-3 text-white-50 hover:bg-black-50 transition-colors">
                <LinkedinIcon className="size-5" /> LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 card-border rounded-lg px-4 py-3 text-white-50 hover:bg-black-50 transition-colors">
                <GithubIcon className="size-5" /> GitHub
              </a>
            </div>
          </div>
          <div className="xl:col-span-7 min-h-96">
            <div className="bg-[#cd7c2e] w-full h-full hover:cursor-grab rounded-3xl overflow-hidden">
              <LazyMount>
                <Safe3D>
                  <ContactExperience />
                </Safe3D>
              </LazyMount>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
