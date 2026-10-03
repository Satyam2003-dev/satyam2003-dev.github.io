import React from 'react';
import {posts} from '../data/site';
import PostCard from '../components/PostCard';
import {BookOpen,Terminal} from 'lucide-react';
export default function Collection({type}){
  const blog=type==='blog';const entries=posts.filter(p=>p.type===type);const Icon=blog?BookOpen:Terminal;
  return <main id="main" tabIndex={-1} className="container page collection-page"><div className="page-heading"><div className="eyebrow"><Icon size={16}/>{blog?'Learning in public':'Ideas worth understanding'}</div><h1>{blog?'The blog':'Technical articles'}<span className="accent">.</span></h1><p>{blog?'Learning journals, project reflections, and the connections between labs and real systems.':'Detailed references for understanding security, building better systems, and asking useful questions.'}</p></div><div className="collection-meta"><span>{entries.length} {blog?'blog post':'article'}</span><span>Written by satyam2003-dev</span></div><div className="post-grid collection-grid">{entries.map(p=><PostCard post={p} key={p.slug}/>)}</div><p className="collection-note">A small collection to start. More writing as the notebook grows.</p></main>;
}
