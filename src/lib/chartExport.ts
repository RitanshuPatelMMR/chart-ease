import { toPng, toSvg } from 'html-to-image';
import { jsPDF } from 'jspdf';

const getExportOptions = () => ({
  cacheBust: true,
  backgroundColor: '#ffffff',
  pixelRatio: 2,
  style: {
    color: '#000000',
  },
});

function downloadFile(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

function sanitizeFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9-_]/g, '_').toLowerCase();
}

export async function exportToPng(
  element: HTMLElement,
  filename: string = 'chart'
): Promise<void> {
  const dataUrl = await toPng(element, getExportOptions());
  downloadFile(dataUrl, `${sanitizeFilename(filename)}.png`);
}

export async function exportToSvg(
  element: HTMLElement,
  filename: string = 'chart'
): Promise<void> {
  const dataUrl = await toSvg(element, getExportOptions());
  downloadFile(dataUrl, `${sanitizeFilename(filename)}.svg`);
}

export async function exportToPdf(
  element: HTMLElement,
  filename: string = 'chart'
): Promise<void> {
  const dataUrl = await toPng(element, {
    ...getExportOptions(),
    pixelRatio: 3, // Higher quality for PDF
  });

  // Create PDF in landscape A4
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Load image to get dimensions
  const img = new Image();
  img.src = dataUrl;
  await new Promise((resolve) => {
    img.onload = resolve;
  });

  // Calculate dimensions to fit chart centered on page with padding
  const padding = 20;
  const maxWidth = pageWidth - padding * 2;
  const maxHeight = pageHeight - padding * 2;

  const aspectRatio = img.width / img.height;
  let imgWidth = maxWidth;
  let imgHeight = imgWidth / aspectRatio;

  if (imgHeight > maxHeight) {
    imgHeight = maxHeight;
    imgWidth = imgHeight * aspectRatio;
  }

  const x = (pageWidth - imgWidth) / 2;
  const y = (pageHeight - imgHeight) / 2;

  pdf.addImage(dataUrl, 'PNG', x, y, imgWidth, imgHeight);
  pdf.save(`${sanitizeFilename(filename)}.pdf`);
}

export async function copyToClipboard(element: HTMLElement): Promise<boolean> {
  const dataUrl = await toPng(element, getExportOptions());
  
  // Convert data URL to blob
  const response = await fetch(dataUrl);
  const blob = await response.blob();

  // Use clipboard API
  await navigator.clipboard.write([
    new ClipboardItem({
      'image/png': blob,
    }),
  ]);

  return true;
}
