import React from "react";
import {
  Terminal,
  Cloud,
  GitBranch,
  Radar,
  BrainCircuit,
  FlaskConical,
} from "lucide-react";
export const topics = [
  {
    title: "Linux & hardening",
    description:
      "Permissions, system audits, and the layers beneath an application.",
    Icon: Terminal,
  },
  {
    title: "Cloud security",
    description:
      "AWS, identity, access controls, and infrastructure boundaries.",
    Icon: Cloud,
  },
  {
    title: "Secure delivery",
    description:
      "Pipelines, dependencies, secrets, and software supply chains.",
    Icon: GitBranch,
  },
  {
    title: "Defensive security",
    description: "Logs, vulnerability assessment, and asking better questions.",
    Icon: Radar,
  },
  {
    title: "AI & cybersecurity",
    description: "Models, data, threat modelling, and the systems around AI.",
    Icon: BrainCircuit,
  },
  {
    title: "Lab practice",
    description:
      "Hands-on exercises, careful observations, and useful explanations.",
    Icon: FlaskConical,
  },
];
export default function Topics() {
  return (
    <div className="topic-grid">
      {topics.map(({ title, description, Icon }) => (
        <div className="topic-card" key={title}>
          <Icon size={23} strokeWidth={1.5} />
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      ))}
    </div>
  );
}
