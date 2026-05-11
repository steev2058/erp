import html2pdf from "html2pdf.js";

export interface ExportOptions {
  filename: string;
  title: string;
  margin?: number;
  scale?: number;
}

export async function exportPageToPDF(options: ExportOptions) {
  const element = document.querySelector("main");
  if (!element) {
    console.error("Main content element not found");
    return;
  }

  const html2pdfOptions = {
    margin: options.margin || 10,
    filename: `${options.filename}.pdf`,
    image: { type: "jpeg" as const, quality: 0.98 },
    html2canvas: { scale: options.scale || 2 },
    jsPDF: { orientation: "portrait" as const, unit: "mm" as const, format: "a4" },
  };

  try {
    await html2pdf().set(html2pdfOptions).from(element).save();
  } catch (error) {
    console.error("PDF export failed:", error);
  }
}

export async function exportSectionToPDF(
  sectionId: string,
  options: ExportOptions
) {
  const element = document.getElementById(sectionId);
  if (!element) {
    console.error(`Section with id ${sectionId} not found`);
    return;
  }

  const html2pdfOptions = {
    margin: options.margin || 10,
    filename: `${options.filename}.pdf`,
    image: { type: "jpeg" as const, quality: 0.98 },
    html2canvas: { scale: options.scale || 2 },
    jsPDF: { orientation: "portrait" as const, unit: "mm" as const, format: "a4" },
  };

  try {
    await html2pdf().set(html2pdfOptions).from(element).save();
  } catch (error) {
    console.error("PDF export failed:", error);
  }
}

export async function exportCompleteSpecification() {
  const element = document.querySelector("main");
  if (!element) {
    console.error("Main content element not found");
    return;
  }

  const html2pdfOptions = {
    margin: 10,
    filename: "ERP-Phase1-Complete-Specification.pdf",
    image: { type: "jpeg" as const, quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: "portrait" as const, unit: "mm" as const, format: "a4" },
  };

  try {
    await html2pdf().set(html2pdfOptions).from(element).save();
  } catch (error) {
    console.error("PDF export failed:", error);
  }
}
