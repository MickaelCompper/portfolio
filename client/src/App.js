import React, { useEffect } from 'react';
import './App.css';
import './index.css';
import Header from './components/Header';
import Home from './components/Home';
import Projects from './components/Projects';
import CV from './components/CV';
import Contact from './components/Contact';

const App = () => {

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          section.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Header scrollToSection={scrollToSection} />
      <main>
        <Home scrollToSection={scrollToSection} />
        <Projects />
        <CV />
        <Contact />
      </main>
    </>
  );
};

export default App;
