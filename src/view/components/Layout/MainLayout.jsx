import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { useTheme } from '../../../controller/context/ThemeContext';
import { useToast } from '../../../controller/context/ToastContext';
import ErrorBoundary from '../Common/ErrorBoundary';

const MainLayout = () => {
  const { theme, toggleTheme } = useTheme();
  const { toastRef } = useToast();

  return (
    <ErrorBoundary>
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <Header theme={theme} onThemeToggle={toggleTheme} />
      <main className="flex-1 w-full container mx-auto px-2 md:px-6
      ">
        <Outlet />
      </main>
      <Footer />
      <Toast ref={toastRef} />
    </div>
    </ErrorBoundary>
  );
};

export default MainLayout;