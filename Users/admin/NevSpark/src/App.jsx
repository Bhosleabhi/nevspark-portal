import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import "./App.css";

const services = [
  {
    number: "01",
    icon: "⌘",
    title: "Web Development",
    description: "Fast, responsive and modern websites designed to grow your business.",
    tags: ["React", "Web Apps", "Landing Pages"],
  },
  {
    number: "02",
    icon: "⚡",
    title: "Software Solutions",
    description: "Smart software and custom digital tools built around your needs.",
    tags: ["Custom Software", "Automation", "APIs"],
  },
  {
    number: "03",
    icon: "◈",
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that turn visitors into customers.",
    tags: ["Web Design", "Prototypes", "Branding"],
  },
  {
    number: "04",
    icon: "✳",
    title: "IT Consulting",
    description: "Practical technology guidance to help your business move forward.",
    tags: ["Strategy", "Technology", "Support"],
  },
];

const projects = [
  {
    category: "WEB DEVELOPMENT",
    title: "Digital Business Website",
    description: "A professional online presence for a growing business.",
    style: "project-green",
    symbol: "↗",
  },
  {
    category: "WEB APPLICATION",
    title: "Smart Management System",
    description: "A streamlined dashboard for managing everyday operations.",
    style: "project-purple",
    symbol: "▦",
  },
  {
    category: "UI/UX DESIGN",
    title: "Next-Gen Digital Experience",
    description: "A clean, user-focused interface for a modern digital product.",
    style: "project-blue",
    symbol: "◈",
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [contactMode, setContactMode] = useState("whatsapp");

  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "Web Development",
    message: "",
  });

  const whatsappNumber = "919699460184";
  const emailAddress = "nevsparktech@gmail.com";

  const directWhatsAppLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello Nevspark Technologies, I would like to inquire about your services."
  )}`;

  const directEmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent(
    "Project Inquiry - Nevspark Technologies"
  )}`;

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    try {
      const { error } = await supabase.from("inquiries").insert([
        {
          name: form.name.trim(),
          email: form.email.trim(),
          service: form.service,
          message: form.message.trim(),
        },
      ]);

      if (error) throw error;

      setSubmitStatus({
        type: "success",
        text: "Thank you! Your project inquiry has been saved. We will contact you soon.",
      });

      setForm({
        name: "",
        email: "",
        service: "Web Development",
        message: "",
      });
    } catch (err) {
      setSubmitStatus({
        type: "error",
        text: "Submission failed: " + err.message,
      });
    } finally {
      setLoading(false);
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="app-container">
      <header className="navbar">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-icon">N<span>✳</span></span>
          <span>NEVSPARK<span className="brand-light"> TECHNOLOGIES</span></span>
        </a>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {menuOpen && <div className="nav-overlay" onClick={closeMenu} />}

        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#services" onClick={closeMenu}>Services</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a className="nav-cta" href="#contact" onClick={closeMenu}>
            Let's Talk <span>↗</span>
          </a>
        </nav>
      </header>

      <main>
        <section className="hero-wrapper" id="home">
          <div className="section hero">
            <div className="hero-content">
              <div className="eyebrow">
                <span className="status-dot" /> YOUR PARTNER IN DIGITAL INNOVATION
              </div>

              <h1>
                Ignite Ideas.
                <br />
                Build the <span className="gradient-text">Future.</span>
              </h1>

              <p className="hero-description">
                We transform bold ideas into powerful digital experiences.
                From websites to custom software, let's build something
                extraordinary together.
              </p>

              <div className="hero-actions">
                <a className="btn btn-primary" href="#contact">
                  Start a Project <span>↗</span>
                </a>
                <a className="btn btn-secondary" href="#services">
                  Explore Services <span>↓</span>
                </a>
              </div>

              <div className="hero-proof">
                <div className="proof-icon">✳</div>
                <div>
                  <strong>Ideas into reality</strong>
                  <p>Creative thinking. Smart technology.</p>
                </div>
              </div>
            </div>

            <div className="hero-visual" aria-label="Digital innovation artwork">
              <div className="visual-glow" />
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="orbit orbit-three" />
              <div className="visual-center">
                <span className="big-spark">✳</span>
                <span className="center-label">NEVSPARK</span>
                <span className="center-subtitle">INNOVATION STARTS HERE</span>
              </div>
              <div className="floating-card card-top">
                <span className="mini-icon">⌘</span>
                <div><strong>Creative Code</strong><small>Built for impact</small></div>
              </div>
              <div className="floating-card card-bottom">
                <span className="mini-icon">↗</span>
                <div><strong>Future Ready</strong><small>Designed to scale</small></div>
              </div>
              <span className="spark spark-one">✦</span>
              <span className="spark spark-two">✧</span>
            </div>
          </div>
          <div className="hero-bottom-label">
            <span>INNOVATION</span><span>•</span>
            <span>CREATIVITY</span><span>•</span>
            <span>TECHNOLOGY</span>
          </div>
        </section>

        <section className="section-dark-band" id="services">
          <div className="section services">
            <div className="section-heading">
              <div>
                <div className="eyebrow"><span className="status-dot" /> WHAT WE DO</div>
                <h2>Technology that <span className="gradient-text">moves you forward.</span></h2>
              </div>
              <p>
                Everything you need to take your business from an idea
                to a digital reality.
              </p>
            </div>

            <div className="services-grid">
              {services.map((service) => (
                <article className="service-card" key={service.number}>
                  <div className="service-top">
                    <span className="service-icon">{service.icon}</span>
                    <span className="service-number">{service.number}</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="tag-list">
                    {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <a className="card-link" href="#contact" aria-label={`Ask about ${service.title}`}>
                    <span>Discuss your project</span> <span>↗</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section about" id="about">
          <div className="about-visual">
            <div className="about-frame">
              <span className="about-spark">✳</span>
              <span className="about-caption">THINK DIFFERENTLY.</span>
              <span className="about-caption">BUILD FEARLESSLY.</span>
              <div className="about-orbit" />
            </div>
            <span className="about-badge">IDEAS POWER THE FUTURE ↗</span>
          </div>

          <div className="about-content">
            <div className="eyebrow"><span className="status-dot" /> ABOUT NEVSPARK</div>
            <h2>Small team.<br /> <span className="gradient-text">Big possibilities.</span></h2>
            <p>
              At Nevspark Technologies, we believe great technology begins
              with a great idea. Our goal is to help people and businesses
              solve real problems with thoughtful design and modern software.
            </p>
            <p>
              We focus on understanding your goals, building practical
              solutions and creating digital experiences that make a difference.
            </p>
            <a className="btn btn-primary" href="#contact">
              Build With Us <span>↗</span>
            </a>
          </div>
        </section>

        <section className="section-dark-band" id="projects">
          <div className="section projects">
            <div className="section-heading">
              <div>
                <div className="eyebrow"><span className="status-dot" /> OUR WORK</div>
                <h2>Ideas in <span className="gradient-text">action.</span></h2>
              </div>
              <p>
                A glimpse of the kinds of digital experiences we can build
                for your business.
              </p>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.title}>
                  <div className={`project-art ${project.style}`}>
                    <div className="art-window">
                      <div className="art-window-bar">
                        <span /><span /><span />
                      </div>
                      <div className="art-content">
                        <span className="art-symbol">{project.symbol}</span>
                        <div className="art-line long" />
                        <div className="art-line medium" />
                        <div className="art-blocks">
                          <span /><span /><span />
                        </div>
                      </div>
                    </div>
                    <span className="project-open">{project.symbol}</span>
                  </div>
                  <div className="project-info">
                    <span className="project-category">{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className="demo-note">
              These are illustrative concepts, not completed client projects.
            </p>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="contact-copy">
            <div className="eyebrow"><span className="status-dot" /> LET'S CONNECT</div>
            <h2>Have an idea?<br /><span className="gradient-text">Let's spark it.</span></h2>
            <p>
              Tell us what you're planning. Submit your details directly to our database,
              or reach out via your preferred direct channel below.
            </p>

            <div className="channel-switch-container">
              <span className="channel-label">Direct Connect Preference:</span>
              <div className="channel-toggle-group" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={contactMode === "whatsapp"}
                  className={`toggle-tab ${contactMode === "whatsapp" ? "active" : ""}`}
                  onClick={() => setContactMode("whatsapp")}
                >
                  WhatsApp
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={contactMode === "email"}
                  className={`toggle-tab ${contactMode === "email" ? "active" : ""}`}
                  onClick={() => setContactMode("email")}
                >
                  Email
                </button>
              </div>
            </div>

            {contactMode === "whatsapp" ? (
              <a
                className="contact-channel-card whatsapp-card"
                href={directWhatsAppLink}
                target="_blank"
                rel="noreferrer"
              >
                <span className="channel-icon">◉</span>
                <div className="channel-text">
                  <strong>Chat on WhatsApp</strong>
                  <small>+91 9699460184</small>
                </div>
                <span className="contact-arrow">↗</span>
              </a>
            ) : (
              <a
                className="contact-channel-card email-card"
                href={directEmailLink}
                target="_blank"
                rel="noreferrer"
              >
                <span className="channel-icon">✉</span>
                <div className="channel-text">
                  <strong>Send Email Directly</strong>
                  <small>nevsparktech@gmail.com</small>
                </div>
                <span className="contact-arrow">↗</span>
              </a>
            )}
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <h3>Tell us about your project</h3>
            <p>Fill in the details below. We save your inquiry directly to our database.</p>

            <label htmlFor="name">Your name</label>
            <input
              id="name"
              required
              placeholder="e.g. Rahul Sharma"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <label htmlFor="service">What do you need?</label>
            <select
              id="service"
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
            >
              <option>Web Development</option>
              <option>Software Solutions</option>
              <option>UI/UX Design</option>
              <option>IT Consulting</option>
              <option>Other</option>
            </select>

            <label htmlFor="message">Project details</label>
            <textarea
              id="message"
              required
              rows="4"
              placeholder="Tell us a little about your idea..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            <button className="btn btn-primary submit-btn" type="submit" disabled={loading}>
              {loading ? "Recording to Database..." : "Submit Inquiry"} <span>↗</span>
            </button>

            {submitStatus && (
              <div className={`status-banner ${submitStatus.type}`}>
                {submitStatus.text}
              </div>
            )}
          </form>
        </section>

        <section className="final-cta">
          <span className="cta-spark">✳</span>
          <div className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</div>
          <h2>Let's build something <span className="gradient-text">remarkable.</span></h2>
          <a className="btn btn-primary" href="#contact">Start a Conversation <span>↗</span></a>
        </section>
      </main>

      <footer className="footer-wrapper">
        <div className="footer">
          <a className="brand" href="#home">
            <span className="brand-icon">N<span>✳</span></span>
            <span>NEVSPARK<span className="brand-light"> TECHNOLOGIES</span></span>
          </a>
          <p>Ignite Ideas. Build the Future.</p>
          <div className="footer-links">
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
          <span className="copyright">
            © {new Date().getFullYear()} Nevspark Technologies. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;