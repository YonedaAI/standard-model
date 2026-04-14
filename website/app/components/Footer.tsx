export default function Footer() {
  return (
    <footer className="footer-bg border-t mt-16 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="font-semibold text-sm mb-1 text-main">Matthew Long</div>
            <div className="text-sm text-muted">
              YonedaAI Research Collective &middot; Chicago, IL
            </div>
            <a
              href="mailto:matthew@yonedaai.com"
              className="text-sm mt-1 block footer-link"
            >
              matthew@yonedaai.com
            </a>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2">
            <div className="flex items-center gap-4">
              <a
                href="https://yonedaai.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm footer-link"
              >
                yonedaai.com
              </a>
              <a
                href="https://github.com/YonedaAI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm footer-link"
              >
                GitHub
              </a>
            </div>
            <div className="text-xs text-muted">
              GrokRxiv &mdash; April 2026 &middot; hep-ph
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 footer-bottom border-t text-xs text-muted">
          <span className="tag-accent inline-block px-2 py-0.5 rounded text-xs mr-2">
            Modular Physics Framework
          </span>
          Standard Model research series. Law I (Size-Aware) &rarr; Law II (Thermal) &rarr;
          Law III (Quantum) &rarr; Law IV (Gravitational).
        </div>
      </div>
    </footer>
  );
}
