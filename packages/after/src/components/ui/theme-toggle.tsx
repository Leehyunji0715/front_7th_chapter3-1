import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Button } from './button';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant='secondary'
      size='sm'
      onClick={toggleTheme}
      className='flex items-center gap-2'
    >
      {theme === 'light' ? (
        <>
          🌙 <span className='hidden sm:inline'>Dark</span>
        </>
      ) : (
        <>
          ☀️ <span className='hidden sm:inline'>Light</span>
        </>
      )}
    </Button>
  );
};
