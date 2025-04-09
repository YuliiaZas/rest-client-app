'use client';

import { Component, ReactNode } from 'react';
import styles from './error.module.scss';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ hasError: true, error, errorInfo });
  }

  reset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
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
          {this.state.errorInfo && (
            <>
              <p className="p2">Error info:</p>
              <div className={styles.error__code_box}>
                <code className={styles.error__code}>
                  {this.state.errorInfo.componentStack}
                </code>
              </div>
            </>
          )}
          <button className="button button_primary" onClick={this.reset}>
            Try to Restart
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
