// Single source of truth for routes, SEO metadata and landing-page content.
// Imported by the React app AND by scripts/postbuild.mjs (sitemap + per-route HTML).
export const SITE_NAME = 'FreeInvoice'

export const pages = [
  {
    path: '/',
    title: '',
    description: 'Create professional invoices online for free. No sign-up, no watermark. Add items, tax and discounts, then download a PDF in seconds.',
    h1: 'Free Invoice Generator',
    intro: 'Fill in the form, watch your invoice update live, then download it as a PDF. No sign-up. No watermark.',
    kind: 'tool',
  },
  {
    path: '/freelance-invoice-generator',
    title: 'Freelance Invoice Generator - Free Template & PDF | FreeInvoice',
    description: 'Free invoice generator built for freelancers and contractors. Add hourly or fixed-price work, set payment terms and download a PDF instantly.',
    h1: 'Freelance Invoice Generator',
    intro: 'Bill clients for hourly or fixed-price work and get paid faster with a clean, professional invoice.',
    kind: 'tool',
    preset: { notes: 'Payment due within 14 days. Thank you for your business!', items: [{ description: 'Web design (hours)', qty: 10, price: 50 }] },
    faq: [
      ['What should a freelance invoice include?', 'Your name and contact details, the client details, a unique invoice number, the invoice and due dates, a description of the work, the amount owed and your payment instructions.'],
      ['How soon should a freelancer send an invoice?', 'Send it as soon as the work or milestone is finished. Invoices sent promptly are usually paid faster.'],
      ['Do I need accounting software to invoice clients?', 'No. A simple PDF invoice with the details above is enough for most freelancers.'],
    ],
  },
  {
    path: '/receipt-generator',
    title: 'Free Receipt Generator - Make a Payment Receipt PDF | FreeInvoice',
    description: 'Make a simple payment receipt online for free. Add items, amounts and payment details, then download a PDF receipt.',
    h1: 'Free Receipt Generator',
    intro: 'Give customers proof of payment with a clean receipt. Same simple form, receipt-ready wording.',
    kind: 'tool',
    preset: { docType: 'RECEIPT', notes: 'Payment received. Thank you!' },
    faq: [
      ['What is the difference between an invoice and a receipt?', 'An invoice asks for payment. A receipt confirms that payment has been received.'],
    ],
  },
  {
    path: '/how-to-write-an-invoice',
    title: 'How to Write an Invoice: Step-by-Step Guide & Checklist | FreeInvoice',
    description: 'Learn how to write a professional invoice in 8 steps, with a checklist of what to include and tips to get paid on time.',
    h1: 'How to Write an Invoice',
    intro: 'A clear invoice helps you get paid faster. Follow these steps, or skip straight to the generator.',
    kind: 'guide',
    faq: [
      ['What must be on an invoice?', 'The word "invoice", a unique invoice number, dates, seller and buyer details, itemised charges, totals including any tax, and payment terms.'],
      ['How long should payment terms be?', 'Common terms are 7, 14 or 30 days. Shorter terms improve cash flow; agree the term with your client up front.'],
      ['Should I charge a late fee?', 'You can, as long as the late fee is stated on the invoice or in your contract before the work starts.'],
    ],
    steps: [
      ['Label it clearly', 'Put the word "Invoice" at the top so it is not mistaken for a quote or receipt.'],
      ['Add a unique invoice number', 'Use a simple sequence such as INV-001, INV-002. It makes tracking and bookkeeping easy.'],
      ['Include your details', 'Business or personal name, address, email, phone and any tax ID.'],
      ['Include your client details', 'Their name or company and billing address.'],
      ['Set the dates', 'Show the issue date and the payment due date.'],
      ['List what you are charging for', 'One line per item with description, quantity and unit price.'],
      ['Show totals and tax', 'Subtotal, any discount, tax (for example VAT) and the final amount due.'],
      ['Explain how to pay', 'Add bank details or a payment link, plus any late-fee terms.'],
    ],
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | FreeInvoice',
    description: 'How FreeInvoice handles your data, cookies, analytics and advertising.',
    h1: 'Privacy Policy',
    intro: '',
    kind: 'privacy',
  },
]

export const siteUrl = (import.meta.env?.VITE_SITE_URL || 'https://yourdomain.com').replace(/\/$/, '')
