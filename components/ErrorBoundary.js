import React from "react";


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    // Reset the error state and optionally reload the page
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={styles.container}>
          <h1>Something went wrong.</h1>
          <p>{this.state.error && this.state.error.toString()}</p>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button  onClick={this.handleReload}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
  },
};

export default ErrorBoundary;
