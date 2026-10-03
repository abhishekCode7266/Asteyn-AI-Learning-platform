import { BookItem } from "./books-data";

export function downloadBookAsPdf(book: BookItem) {
  if (typeof window === "undefined") return;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(book.title)} - Astryn Digital Library Edition</title>
  <style>
    @page {
      size: A4;
      margin: 20mm;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #1e293b;
      line-height: 1.6;
      background: #ffffff;
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .cover-page {
      text-align: center;
      padding: 60px 20px 40px;
      border: 3px double #4f46e5;
      border-radius: 12px;
      margin-bottom: 40px;
      page-break-after: always;
    }
    .platform-badge {
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #4f46e5;
      font-weight: bold;
    }
    .book-title {
      font-size: 32px;
      font-weight: 900;
      color: #0f172a;
      margin: 20px 0 10px;
    }
    .book-author {
      font-size: 18px;
      color: #475569;
      font-style: italic;
      margin-bottom: 25px;
    }
    .book-meta {
      font-size: 13px;
      color: #64748b;
      margin-top: 30px;
      border-top: 1px solid #e2e8f0;
      padding-top: 15px;
    }
    .section-title {
      font-size: 20px;
      font-weight: bold;
      color: #1e1b4b;
      border-bottom: 2px solid #6366f1;
      padding-bottom: 6px;
      margin-top: 35px;
      margin-bottom: 15px;
    }
    .toc-item {
      font-size: 14px;
      padding: 6px 0;
      border-bottom: 1px dashed #cbd5e1;
      color: #334155;
    }
    .synopsis {
      background: #f8fafc;
      border-left: 4px solid #4f46e5;
      padding: 15px;
      font-size: 14px;
      border-radius: 4px;
      margin-bottom: 25px;
    }
    .chapter-heading {
      font-size: 22px;
      font-weight: 800;
      color: #0f172a;
      margin-top: 30px;
      margin-bottom: 15px;
    }
    .chapter-paragraph {
      font-size: 15px;
      text-align: justify;
      margin-bottom: 14px;
      text-indent: 20px;
    }
    .takeaway-box {
      background: #ecfdf5;
      border: 1px solid #a7f3d0;
      padding: 15px;
      border-radius: 8px;
      margin-top: 30px;
    }
    .takeaway-title {
      font-size: 14px;
      font-weight: bold;
      color: #065f46;
      margin-bottom: 8px;
    }
    .takeaway-item {
      font-size: 13px;
      color: #047857;
      margin-bottom: 4px;
    }
    .footer-note {
      text-align: center;
      font-size: 11px;
      color: #94a3b8;
      margin-top: 40px;
      border-top: 1px solid #f1f5f9;
      padding-top: 10px;
    }
    @media print {
      body {
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="no-print" style="background: #4f46e5; color: white; padding: 12px 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; font-weight: bold; font-size: 14px;">
    📘 Astryn AI PDF Generator: Use your browser's Print dialog and select "Save as PDF".
    <button onclick="window.print()" style="background: white; color: #4f46e5; border: none; padding: 6px 16px; border-radius: 6px; font-weight: bold; margin-left: 15px; cursor: pointer;">
      🖨️ Click to Print / Save PDF
    </button>
  </div>

  <div class="cover-page">
    <div class="platform-badge">Astryn AI Digital Library • Official Edition</div>
    <h1 class="book-title">${escapeHtml(book.title)}</h1>
    <div class="book-author">By ${escapeHtml(book.author)}</div>
    <div style="font-size: 14px; color: #6366f1; font-weight: bold;">
      ${escapeHtml(book.category)} • ${escapeHtml(book.subCategory)}
    </div>
    
    <div class="book-meta">
      Language: ${escapeHtml(book.language)} | Estimated Pages: ${book.pages} | Year: ${book.year} | Rating: ★ ${book.rating}
      <br>
      Digitally certified for online & offline student learning.
    </div>
  </div>

  <div class="section-title">Book Overview &amp; Synopsis</div>
  <div class="synopsis">
    ${escapeHtml(book.description)}
  </div>

  <div class="section-title">Table of Contents</div>
  <div style="margin-bottom: 30px;">
    ${book.tableOfContents.map((ch, idx) => `
      <div class="toc-item">
        <b>${idx + 1}.</b> ${escapeHtml(ch)}
      </div>
    `).join("")}
  </div>

  <div class="section-title">Selected Reading: ${escapeHtml(book.sampleChapter.title)}</div>
  <div>
    ${book.sampleChapter.content.map(p => `
      <p class="chapter-paragraph">${escapeHtml(p)}</p>
    `).join("")}
  </div>

  <div class="takeaway-box">
    <div class="takeaway-title">⭐ Core Concepts &amp; Key Takeaways</div>
    ${book.keyTakeaways.map(t => `
      <div class="takeaway-item">• ${escapeHtml(t)}</div>
    `).join("")}
  </div>

  <div class="footer-note">
    Generated via Astryn AI Learning Platform. Free for educational and personal use.
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>
  `;

  // Open in new tab and trigger instant printable/save-as-PDF view
  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (!win) {
    // Popup blocked: fallback to direct file download
    const link = document.createElement("a");
    link.href = url;
    link.download = `${book.title.replace(/[^a-zA-Z0-9]/g, "_")}_Astryn.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

function escapeHtml(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
