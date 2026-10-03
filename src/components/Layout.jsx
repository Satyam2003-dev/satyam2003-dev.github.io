import {Github,Linkedin} from './SocialIcons';
import React,{useEffect,useRef} from 'react';
import {Link,NavLink,useLocation} from 'react-router-dom';
import {Moon,Sun,ArrowUpRight,Shield,ArrowUp} from 'lucide-react';
import {motion,MotionConfig} from 'motion/react';
import {site,pageMetadata} from '../data/site';
import {ThemeProvider,useTheme} from './ThemeProvider';

function ThemeToggle(){
  const {theme,toggle}=useTheme();
  const label=`Switch to ${theme==='dark'?'light':'dark'} theme`;
  return <button className="theme-toggle" type="button" onClick={toggle} aria-label={label} title={label}>{theme==='dark'?<Sun size={19}/>:<Moon size={19}/>}<span className="theme-label">{theme==='dark'?'Light':'Dark'}</span></button>;
}
function RouteEffects(){
  const {pathname}=useLocation();
  const previous=useRef(pathname);
  useEffect(()=>{
    const path=pathname==='/'?'/':pathname.replace(/\/$/,'')+'/';
    const metadata=pageMetadata(path);
    document.title=`${metadata.title} · sec.notes`;
    const fields={'description':metadata.description,'og:title':`${metadata.title} · sec.notes`,'og:description':metadata.description,'og:type':metadata.type||'website','og:url':`${site.origin}${path}`};
    for(const [name,content] of Object.entries(fields))document.querySelector(`meta[${name.startsWith('og:')?'property':'name'}="${name}"]`)?.setAttribute('content',content);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href',`${site.origin}${path}`);
    if(previous.current!==pathname){
      window.scrollTo({top:0,behavior:'instant'});
      document.querySelector('main')?.focus({preventScroll:true});
      previous.current=pathname;
    }
  },[pathname]);
  return null;
}
export default function Layout({children}){
  const {pathname}=useLocation();
  return <ThemeProvider><MotionConfig reducedMotion="user"><RouteEffects/><a className="skip" href="#main">Skip to content</a><header className="site-header"><div className="container header-inner"><Link className="brand" to="/" aria-label="Satyam Kumar home"><span className="brand-mark"><Shield size={27} strokeWidth={1.8}/></span><span>Satyam Kumar</span></Link><nav aria-label="Main navigation">{[['/','Home'],['/blog/','Blog'],['/articles/','Articles'],['/notes/','Notes'],['/about/','About']].map(([to,label])=><NavLink key={to} to={to} end={to==='/'}>{label}</NavLink>)}</nav><div className="header-tools"><a className="social-icon" href={site.links.github} aria-label="Satyam on GitHub"><Github size={19}/></a><a className="social-icon" href={site.links.linkedin} aria-label="Satyam on LinkedIn"><Linkedin size={18}/></a><ThemeToggle/></div></div></header><motion.div key={pathname} className="page-enter" initial={{y:8}} animate={{y:0}} transition={{duration:.35,ease:[.2,.7,.2,1]}}>{children}</motion.div><footer className="site-footer container"><div className="footer-top"><Link className="brand" to="/"><span className="brand-prefix">~/</span>sec.notes</Link><p>A notebook for curious security minds.</p><a className="back-top" href="#top" aria-label="Back to top"><ArrowUp size={17}/></a></div><div className="footer-bottom"><span>© 2026 satyam2003-dev</span><div className="footer-links"><a href={site.links.github}>GitHub <ArrowUpRight size={13}/></a><a href={site.links.linkedin}>LinkedIn <ArrowUpRight size={13}/></a><a href={site.links.tryhackme}>TryHackMe <ArrowUpRight size={13}/></a></div><span>Learn in labs. Test with permission.</span></div></footer></MotionConfig></ThemeProvider>;
}
