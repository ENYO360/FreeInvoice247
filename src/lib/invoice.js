export const today = () => new Date().toISOString().slice(0, 10)
export const inDays = (n) => new Date(Date.now() + n * 864e5).toISOString().slice(0, 10)

export const blankInvoice = () => ({
  docType: 'INVOICE',
  number: 'INV-001',
  issueDate: today(),
  dueDate: inDays(14),
  currency: 'USD',
  from: { name: '', email: '', address: '' },
  to: { name: '', email: '', address: '' },
  logo: '',
  items: [{ id: 1, description: '', qty: 1, price: 0 }],
  taxRate: 0,
  discount: 0,
  notes: '',
})

export function totals(inv) {
  const subtotal = inv.items.reduce((s, i) => s + (Number(i.qty) || 0) * (Number(i.price) || 0), 0)
  const discount = Math.min(Number(inv.discount) || 0, subtotal)
  const tax = ((subtotal - discount) * (Number(inv.taxRate) || 0)) / 100
  return { subtotal, discount, tax, total: subtotal - discount + tax }
}

export function money(n, currency) {
  try { return new Intl.NumberFormat('en', { style: 'currency', currency }).format(n || 0) }
  catch { return `${currency} ${(n || 0).toFixed(2)}` }
}
