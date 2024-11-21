import { ReactNode } from 'react';
import Notepad from '../components/applications/Notepad';
import Calculator from '../components/applications/Calculator';
import About from '../components/applications/About';

export interface Application {
  id: string;
  title: string;
  icon: string;
  defaultSize?: { width: number; height: number };
  defaultPosition?: { x: number; y: number };
  component: ReactNode;
}

export const applications: Record<string, Application> = {
  notepad: {
    id: 'notepad',
    title: 'Notepad',
    icon: '/icons/notepad.jpg',
    defaultSize: { width: 400, height: 300 },
    defaultPosition: { x: 50, y: 50 },
    component: <Notepad />
  },
  calculator: {
    id: 'calculator',
    title: 'Calculator',
    icon: '/icons/calc.png',
    defaultSize: { width: 200, height: 300 },
    defaultPosition: { x: 100, y: 100 },
    component: <Calculator />
  },
  about: {
    id: 'about',
    title: 'About',
    icon: '/icons/about.png',
    defaultSize: { width: 300, height: 200 },
    defaultPosition: { x: 150, y: 150 },
    component: <About />
  }
}; 