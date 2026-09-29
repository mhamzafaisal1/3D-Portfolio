import { Component, Suspense } from "react";

// Wraps a 3D scene so a slow or failed asset (GLB, HDR from CDN) only hides
// that scene instead of blanking the whole page.
class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    console.warn("3D scene failed to load:", err?.message);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const Safe3D = ({ children, fallback = null }) => (
  <ErrorBoundary fallback={fallback}>
    <Suspense fallback={fallback}>{children}</Suspense>
  </ErrorBoundary>
);

export default Safe3D;
