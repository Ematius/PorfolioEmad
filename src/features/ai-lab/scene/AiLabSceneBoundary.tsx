import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";

type AiLabSceneBoundaryProps = {
  children: ReactNode;
};

type AiLabSceneBoundaryState = {
  hasError: boolean;
};

export class AiLabSceneBoundary extends Component<
  AiLabSceneBoundaryProps,
  AiLabSceneBoundaryState
> {
  state: AiLabSceneBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AiLabSceneBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
    // The HTML/CSS scene remains available as the intentional fallback.
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
