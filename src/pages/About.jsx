import React from "react";
import {
  ArrowUpRight,
  Code2,
  GraduationCap,
  Camera,
  Shield,
  Briefcase,
} from "lucide-react";
import { motion } from "motion/react";
import { site } from "../data/site";
const experiences = [
  {
    time: "Sep 2025 – present",
    role: "DevSecOps Engineer",
    details:
      "AWS monitoring, IAM access controls, encryption, secrets management, vulnerability assessments, and Linux hardening. Automation with Bash and support for security operations.",
  },
  {
    time: "Mar – Sep 2025",
    role: "DevSecOps Intern",
    details:
      "GitHub Actions pipelines, AWS EC2/S3/IAM environments, Linux administration, releases, infrastructure troubleshooting, and repository access management.",
  },
];
const projects = [
  {
    title: "Linux & cloud security automation laboratory",
    details:
      "A multi-node AWS EC2 lab with OpenVAS vulnerability scans, CloudWatch log reviews, Bash audit scripts, and a documented hardening runbook.",
    meta: "Feb – Apr 2024 · Infrastructure & DevSecOps · Team of 4",
    Icon: Shield,
  },
  {
    title: "LinkTree web application",
    details:
      "A personal-links application using Google OAuth, MongoDB, and AWS deployment.",
    meta: "Nov – Dec 2023 · Team lead & backend/AWS engineer",
    Icon: Code2,
  },
  {
    title: "Brain MRI image classification",
    details:
      "A university Alzheimer’s detection project using TensorFlow and Keras, covering preprocessing, training, and evaluation across four disease categories.",
    meta: "Feb – May 2023 · Team lead & ML implementation · Team of 5",
    Icon: GraduationCap,
  },
];
export default function About() {
  return (
    <main id="main" tabIndex={-1} className="container page about-page">
      <section className="about-intro">
        <div>
          <div className="eyebrow">
            <span className="status-dot" />
            About / Satyam Kumar
          </div>
          <h1>
            Satyam Kumar<span className="accent">.</span>
          </h1>
          <p className="about-lead">
            Building, learning, and making security part of the process.
          </p>
          <div className="about-role-tags">
            <span>DevSecOps</span>
            <span>Cloud security</span>
            <span>AI &amp; cybersecurity</span>
          </div>
          <p>
            I work across AWS infrastructure, Linux, and security automation,
            and I am pursuing an MS in AI &amp; Cybersecurity at IIT Patna.
          </p>
          <p className="muted">
            This notebook connects hands-on learning with clear explanations. My
            interests span cloud security, identity management, AI-driven threat
            detection, and practical automation.
          </p>
          <div className="actions">
            <a className="button primary" href={site.links.linkedin}>
              Connect on LinkedIn <ArrowUpRight size={17} />
            </a>
            <a className="button quiet" href={site.links.github}>
              GitHub <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <aside className="profile-card">
          <div className="profile-symbol">
            <Shield size={38} strokeWidth={1.2} />
          </div>
          <span className="eyebrow muted">TryHackMe / learner profile</span>
          <h2>cyberhitman</h2>
          <span className="profile-level">[0xD] [LEGEND]</span>
          <div className="profile-stats">
            {[
              ["Top 1%", "Global standing"],
              ["290", "Completed rooms"],
              ["53", "Badges"],
              ["104", "Day streak"],
            ].map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <p className="snapshot">Profile snapshot · 3 Oct 2026</p>
          <a className="text-link" href={site.links.tryhackme}>
            View live profile <ArrowUpRight size={17} />
          </a>
        </aside>
      </section>
      <nav className="about-jump-links" aria-label="About page sections">
        <a href="#experience">Experience</a>
        <a href="#education">Education</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Toolkit</a>
        <a href="#contact">Contact</a>
      </nav>
      <section className="about-section" id="experience">
        <div className="section-side">
          <span className="eyebrow muted">
            <Briefcase size={15} />
            In practice
          </span>
          <h2>Experience.</h2>
          <p className="meta">
            Dates and responsibilities as listed in the supplied resume.
          </p>
        </div>
        <div className="timeline">
          {experiences.map((item) => (
            <div className="timeline-item" key={item.role}>
              <span className="timeline-dot" />
              <time>{item.time}</time>
              <h3>{item.role}</h3>
              <span className="muted">
                AndOr Communication Pvt. Ltd. · Noida
              </span>
              <p>{item.details}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="about-section" id="education">
        <div className="section-side">
          <span className="eyebrow muted">
            <GraduationCap size={16} />
            The foundations
          </span>
          <h2>Education.</h2>
        </div>
        <div className="education">
          <div>
            <span className="label">Current studies</span>
            <h3>MS in AI &amp; Cybersecurity</h3>
            <p>Indian Institute of Technology, Patna</p>
            <a href={site.links.linkedin} className="text-link small">
              Current LinkedIn profile <ArrowUpRight size={15} />
            </a>
          </div>
          <div>
            <span className="label">2020 – 2024</span>
            <h3>BE in Computer Science</h3>
            <p>Chandigarh University · CGPA 7.63/10</p>
            <span className="meta">
              Networks, operating systems, information security, and
              cryptography.
            </span>
          </div>
        </div>
      </section>
      <section className="about-projects" id="projects">
        <div className="section-heading">
          <div>
            <div className="eyebrow muted">Learning by building</div>
            <h2>Selected projects.</h2>
          </div>
        </div>
        <div className="project-grid">
          {projects.map(({ title, details, meta, Icon }) => (
            <motion.div
              className="project-card"
              key={title}
              whileHover={{ y: -3 }}
            >
              <Icon size={25} strokeWidth={1.5} />
              <h3>{title}</h3>
              <p>{details}</p>
              <span className="meta">{meta}</span>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="about-section" id="skills">
        <div className="section-side">
          <div className="eyebrow muted">The toolkit</div>
          <h2>Tools &amp; skills.</h2>
        </div>
        <div className="pill-list">
          {[
            "AWS · EC2, S3, IAM",
            "Linux · Ubuntu, Kali",
            "Docker",
            "GitHub Actions",
            "Git",
            "Bash",
            "Python",
            "JavaScript",
            "OpenVAS",
            "TensorFlow & Keras",
            "MongoDB",
            "SQL",
          ].map((skill) => (
            <span key={skill} className="pill">
              {skill}
            </span>
          ))}
        </div>
      </section>
      <section className="about-section">
        <div className="section-side">
          <div className="eyebrow muted">Beyond the lab</div>
          <h2>
            Learning &amp;
            <br />
            community.
          </h2>
        </div>
        <div>
          <ul className="plain-list">
            <li>
              <strong>Computer Vision</strong>
              <span>MathWorks · 2023</span>
            </li>
            <li>
              <strong>Software Testing</strong>
              <span>IIIT Bangalore / NPTEL · 2022</span>
            </li>
            <li>
              <strong>Data Mining</strong>
              <span>IIT Kharagpur · 2023</span>
            </li>
          </ul>
          <p className="muted">
            Google Cloud Learning Challenge participant (2022), Hacktoberfest
            open-source contributions (2021), and class representative at
            Chandigarh University (2023–2024).
          </p>
        </div>
      </section>
      <section className="photography-strip">
        <Camera size={32} strokeWidth={1.3} />
        <div>
          <h2>A different kind of observation.</h2>
          <p>
            Away from the terminal, I enjoy photography and visual storytelling.
          </p>
        </div>
        <div>
          <a href="https://www.pexels.com/@mrcoolhitman/" className="text-link">
            Pexels <ArrowUpRight size={17} />
          </a>
          <a href="https://unsplash.com/@mrcoolhitman" className="text-link">
            Unsplash <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
      <section className="contact-strip" id="contact">
        <div>
          <span className="eyebrow">Keep in touch</span>
          <h2>Let’s talk security.</h2>
          <p>
            Connect about cloud infrastructure, secure delivery, or learning
            together.
          </p>
        </div>
        <a className="button primary" href={site.links.email}>
          Email Satyam <ArrowUpRight size={18} />
        </a>
      </section>
    </main>
  );
}
