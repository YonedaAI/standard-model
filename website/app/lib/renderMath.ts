import katex from "katex";

/**
 * Pre-renders LaTeX math in HTML content using KaTeX.
 * Handles:
 *   - Display math: <div class="katex-display">$$...$$</div>
 *   - Inline math: <span class="math-inline">...</span>
 *   - Inline math: <span class="katex-inline">...</span>
 */
export function renderMathInHtml(html: string): string {
  // Render display math: <div class="katex-display">$$...$$</div>
  html = html.replace(
    /<div class="katex-display">\s*\$\$([\s\S]*?)\$\$\s*<\/div>/g,
    (_match, tex: string) => {
      try {
        const rendered = katex.renderToString(tex.trim(), {
          displayMode: true,
          throwOnError: false,
          trust: true,
        });
        return `<div class="katex-display">${rendered}</div>`;
      } catch {
        return _match;
      }
    }
  );

  // Render inline math: <span class="math-inline">...</span>
  html = html.replace(
    /<span class="math-inline">([\s\S]*?)<\/span>/g,
    (_match, tex: string) => {
      try {
        const rendered = katex.renderToString(tex.trim(), {
          displayMode: false,
          throwOnError: false,
          trust: true,
        });
        return rendered;
      } catch {
        return _match;
      }
    }
  );

  // Render inline math: <span class="katex-inline">...</span>
  html = html.replace(
    /<span class="katex-inline">([\s\S]*?)<\/span>/g,
    (_match, tex: string) => {
      try {
        const rendered = katex.renderToString(tex.trim(), {
          displayMode: false,
          throwOnError: false,
          trust: true,
        });
        return rendered;
      } catch {
        return _match;
      }
    }
  );

  return html;
}
