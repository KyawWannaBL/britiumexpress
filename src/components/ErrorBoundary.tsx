import React from "react";

type Props = { children: React.ReactNode };
type State = { hasError: boolean; message?: string; stack?: string };

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(err: unknown): State {
    const e = err as any;
    return {
      hasError: true,
      message: String(e?.message ?? e ?? "Unknown error"),
      stack: typeof e?.stack === "string" ? e.stack : undefined,
    };
  }

  componentDidCatch(err: unknown, info: unknown) {
    console.error("App crashed:", err, info);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-dvh bg-neutral-50 text-neutral-900">
        <div className="mx-auto max-w-2xl px-4 py-10">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src="/assets/britium-logo.png"
                alt="Britium Express"
                className="h-12 w-12 rounded-2xl border bg-white p-1"
              />
              <div>
                <div className="text-lg font-extrabold">Britium Express</div>
                <div className="text-sm text-neutral-600">
                  The app hit an error instead of showing a blank page.
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-xl border bg-red-50 p-4 text-sm">
              <div className="font-bold text-red-700">Error</div>
              <div className="mt-1 text-red-700 break-words">{this.state.message}</div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-extrabold text-white hover:bg-neutral-800"
              >
                Reload
              </button>
              <a
                href="/login"
                className="rounded-xl border bg-white px-4 py-2 text-sm font-extrabold hover:bg-neutral-50"
              >
                Go to Login
              </a>
            </div>

            {this.state.stack ? (
              <details className="mt-6">
                <summary className="cursor-pointer text-sm font-bold text-neutral-700">Details</summary>
                <pre className="mt-2 overflow-auto rounded-xl bg-neutral-950 p-3 text-xs text-neutral-100">
{this.state.stack}
                </pre>
              </details>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

