import { CURRENCIES } from '../lib/currencies.js'
import { trackEvent } from '../lib/analytics.js'

function Party({ title, value, onChange }) {
  const set = (k) => (e) => onChange({ ...value, [k]: e.target.value })
  return (
    <fieldset className="space-y-2">
      <legend className="mb-1 text-sm font-semibold">{title}</legend>
      <input className="field" placeholder="Name / Business" value={value.name} onChange={set('name')} />
      <input className="field" type="email" placeholder="Email" value={value.email} onChange={set('email')} />
      <textarea className="field" rows={2} placeholder="Address" value={value.address} onChange={set('address')} />
    </fieldset>
  )
}

export default function InvoiceForm({ inv, setInv }) {
  const up = (patch) => setInv((p) => ({ ...p, ...patch }))
  const setItem = (id, patch) => setInv((p) => ({ ...p, items: p.items.map((i) => (i.id === id ? { ...i, ...patch } : i)) }))
  const addItem = () => {
    trackEvent('add_item')
    setInv((p) => ({ ...p, items: [...p.items, { id: Date.now(), description: '', qty: 1, price: 0 }] }))
  }
  const removeItem = (id) => setInv((p) => ({ ...p, items: p.items.length > 1 ? p.items.filter((i) => i.id !== id) : p.items }))

  const onLogo = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > 500 * 1024) return alert('Please choose an image under 500 KB.')
    const r = new FileReader()
    r.onload = () => up({ logo: r.result })
    r.readAsDataURL(f)
  }

  return (
    <div className="space-y-5 rounded-lg border border-slate-200 bg-white p-4 sm:p-5 print:hidden">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label" htmlFor="num">{inv.docType === 'RECEIPT' ? 'Receipt' : 'Invoice'} number</label>
          <input id="num" className="field" value={inv.number} onChange={(e) => up({ number: e.target.value })} />
        </div>
        <div>
          <label className="label" htmlFor="cur">Currency</label>
          <select id="cur" className="field" value={inv.currency} onChange={(e) => up({ currency: e.target.value })}>
            {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="d1">Issue date</label>
          <input id="d1" type="date" className="field" value={inv.issueDate} onChange={(e) => up({ issueDate: e.target.value })} />
        </div>
        {inv.docType !== 'RECEIPT' && (
          <div>
            <label className="label" htmlFor="d2">Due date</label>
            <input id="d2" type="date" className="field" value={inv.dueDate} onChange={(e) => up({ dueDate: e.target.value })} />
          </div>
        )}
      </div>

      <div>
        <label className="label" htmlFor="logo">Logo (optional)</label>
        <div className="flex items-center gap-3">
          <input id="logo" type="file" accept="image/*" onChange={onLogo} className="text-xs" />
          {inv.logo && <button type="button" className="text-xs text-red-600 underline" onClick={() => up({ logo: '' })}>Remove</button>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Party title="From" value={inv.from} onChange={(from) => up({ from })} />
        <Party title="Bill to" value={inv.to} onChange={(to) => up({ to })} />
      </div>

      <div>
        <p className="mb-2 text-sm font-semibold">Items</p>
        <div className="space-y-2">
          {inv.items.map((i) => (
            <div key={i.id} className="grid grid-cols-12 gap-2">
              <input aria-label="Description" className="field col-span-12 sm:col-span-6" placeholder="Description" value={i.description} onChange={(e) => setItem(i.id, { description: e.target.value })} />
              <input aria-label="Quantity" placeholder="qty" className="field col-span-4 sm:col-span-2" type="number" min="0" step="any" value={i.qty} onChange={(e) => setItem(i.id, { qty: e.target.value })} />
              <input aria-label="Unit price" className="field col-span-6 sm:col-span-3" type="number" min="0" step="any" value={i.price} onChange={(e) => setItem(i.id, { price: e.target.value })} />
              <button type="button" aria-label="Remove item" className="col-span-2 text-slate-400 hover:text-red-600 sm:col-span-1" onClick={() => removeItem(i.id)}>&times;</button>
            </div>
          ))}
        </div>
        <button type="button" className="btn-ghost mt-3" onClick={addItem}>+ Add item</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label" htmlFor="tax">Tax / VAT (%)</label>
          <input id="tax" type="number" min="0" step="any" className="field" value={inv.taxRate} onChange={(e) => up({ taxRate: e.target.value })} />
        </div>
        <div>
          <label className="label" htmlFor="disc">Discount (amount)</label>
          <input id="disc" type="number" min="0" step="any" className="field" value={inv.discount} onChange={(e) => up({ discount: e.target.value })} />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="notes">Notes / payment details</label>
        <textarea id="notes" rows={3} className="field" placeholder="Bank details, payment terms, thank-you note..." value={inv.notes} onChange={(e) => up({ notes: e.target.value })} />
      </div>
    </div>
  )
}
