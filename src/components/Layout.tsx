
import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto py-4 px-4 sm:px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8" />
            <span className="text-xl font-bold">EEG Emotion Recognition</span>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="hover:underline">
                  Patients
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto py-6 px-4 sm:px-6">
        {children}
      </main>
      
      <footer className="bg-accent text-accent-foreground py-4">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p>© 2024 EEG Emotion Recognition System</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
