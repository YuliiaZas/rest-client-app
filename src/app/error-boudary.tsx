'use client';

import { Component, ReactNode } from 'react';
import styles from './error.module.scss';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(
      'Global error in root layout caught by ErrorBoundary:',
      error,
      errorInfo
    );
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.error__container}>
          <h1>Oops! Something went completely wrong</h1>
          <h3>We apologize for the inconvenience.</h3>
          <p className="p2">Error message:</p>
          <code className={styles.error__code}>
            {this.state.error?.message}
          </code>
          <button className="button button_primary" onClick={this.reset}>
            Try to Restart
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
