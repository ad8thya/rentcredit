// utils/exports.js
// Utility functions for exporting data as CSV, PDF

// CSV Export
export function exportToCSV(data, filename) {
  if (!data || !data.length) return;
  const keys = Object.keys(data[0]);
  const csvRows = [keys.join(',')];
  for (const row of data) {
    csvRows.push(keys.map(k => '"' + (row[k] ?? '') + '"').join(','));
  }
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

// PDF Export (requires jsPDF)
export async function exportToPDF(data, filename, title = 'Report') {
  const jsPDF = (await import('jspdf')).jsPDF;
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(title, 10, 16);
  if (Array.isArray(data) && data.length) {
    const keys = Object.keys(data[0]);
    let y = 30;
    doc.setFontSize(12);
    doc.text(keys.join(' | '), 10, y);
    y += 8;
    for (const row of data) {
      doc.text(keys.map(k => String(row[k] ?? '')).join(' | '), 10, y);
      y += 8;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    }
  } else if (typeof data === 'string') {
    doc.setFontSize(12);
    doc.text(data, 10, 30);
  }
  doc.save(filename);
} 