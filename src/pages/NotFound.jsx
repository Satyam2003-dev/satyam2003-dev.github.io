import React from 'react';
import {Link} from 'react-router-dom';
import {ArrowRight,FileQuestion} from 'lucide-react';
export default function NotFound(){return <main id="main" tabIndex={-1} className="container page not-found"><FileQuestion size={50} strokeWidth={1}/><div className="eyebrow muted">404 / page not found</div><h1>This page is off the map.</h1><p>The link may have moved. Return to the notebook to find the latest writing.</p><Link className="button primary" to="/">Back to the notebook <ArrowRight size={17}/></Link></main>;}
