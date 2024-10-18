import React from "react";

interface ErrorBoundaryProps {
  fallback: React.ReactNode; // der Typ für das Fallback-Element
  children: React.ReactNode; // der Typ für die Kinder-Elemente
}

interface ErrorBoundaryState {
  hasError: boolean; // der Typ für den Fehlerstatus
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  // die Typen für die Props und den State angeben

  constructor(props: ErrorBoundaryProps) {
    // den Typ für die Props angeben
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // den Typ für den Fehler und den zurückgegebenen State angeben
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    // den Typ für den Fehler, die Info und den Rückgabewert angeben
    // Example "componentStack":
    // in ComponentThatThrows (created by App)
    // in ErrorBoundary (created by App)
    // in div (created by App)
    // in App
    console.log(error, info.componentStack);
  }

  render(): React.ReactNode {
    // den Typ für den Rückgabewert angeben
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}
