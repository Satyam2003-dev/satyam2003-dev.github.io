import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'motion/react';
import {ArrowUpRight,BookOpen,Terminal,Clock,CalendarDays} from 'lucide-react';
import {dateLabel,postPath} from '../data/site';
export default function PostCard({post,featured=false}){
  const Icon=post.type==='blog'?BookOpen:Terminal;
  const cover=post.type==='blog'?'/assets/images/learning-journal.webp':'/assets/images/secure-delivery.webp';
  return <motion.article className={`post-card illustrated ${featured?'featured':''}`} whileHover={{y:-4}} transition={{duration:.2}}><div className="post-cover"><img src={cover} alt="" width="1672" height="941" loading="lazy"/><span className="cover-category">{post.type==='blog'?'Career & learning':'Secure delivery'}</span></div><div className="post-card-content"><span className="post-kind"><Icon size={14}/>{post.type==='blog'?'Learning journal':'Technical article'}</span><Link className="card-title-link" to={postPath(post)}><h3>{post.title}</h3><span className="card-arrow"><ArrowUpRight size={18}/></span></Link><p>{post.description}</p><div className="card-bottom"><span className="card-date"><CalendarDays size={13}/><time dateTime={post.date}>{dateLabel(post.date)}</time></span><span className="read-duration"><Clock size={13}/>{post.minutes} min read</span></div></div></motion.article>;
}
