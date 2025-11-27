import React from 'react';
import { ThemeToggle } from '../ui/theme-toggle';

export const Header: React.FC = () => {
  return (
    <header className='sticky top-0 border-b border-gray-200 bg-white shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-800'>
      <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6'>
        {/* Logo */}
        <div className='flex items-center gap-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500 text-xl font-bold text-white'>
            L
          </div>
          <div>
            <h1 className='text-lg font-bold text-gray-900 dark:text-white'>
              Hanghae Company
            </h1>
            <p className='text-xs text-gray-500 dark:text-gray-400'>
              Design System Migration Project
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className='flex items-center gap-3'>
          <ThemeToggle />

          {/* User Info */}
          <div className='flex items-center gap-3'>
            <div className='text-right'>
              <div className='text-sm font-semibold text-gray-900 dark:text-white'>
                Demo User
              </div>
              <div className='text-xs text-gray-500 dark:text-gray-400'>
                demo@example.com
              </div>
            </div>
            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 font-semibold text-blue-500 dark:bg-blue-900 dark:text-blue-300'>
              DU
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
