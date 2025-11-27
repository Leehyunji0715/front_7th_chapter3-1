import React from 'react';
import { ThemeProvider } from './contexts/ThemeProvider';
import { Header } from './components/layout';
import { ManagementPage } from './pages/ManagementPage';
import './styles/components.css';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className='min-h-screen bg-gray-50 transition-colors dark:bg-gray-900'>
        <Header />
        <main>
          <ManagementPage />
        </main>
      </div>
    </ThemeProvider>
  );
};
