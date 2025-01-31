import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Можно логировать ошибку
    if (this.props.onError) this.props.onError(error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] w-full text-center p-8">
          <span className="pi pi-exclamation-triangle text-4xl text-red-500 mb-4" aria-hidden="true" />
          <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">Что-то пошло не так</h2>
          <p className="mb-4 text-gray-500 dark:text-gray-400">Произошла непредвиденная ошибка. Попробуйте обновить страницу.</p>
          <button
            onClick={this.handleReload}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            aria-label="Обновить страницу"
          >
            Обновить страницу
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
