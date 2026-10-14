import { totals, money } from '../lib/invoice.js'

const Block = ({ label, p }) => (
  <div>
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-1 font-medium">{p.name || '—'}</p>
    {p.email && <p className="text-sm text-slate-600">{p.email}</p>}
    {p.address && <p className="whitespace-pre-line text-sm text-slate-600">{p.address}</p>}
  </div>
)

export default function InvoicePreview({ inv }) {
  const t = totals(inv)
  const m = (n) => money(n, inv.currency)
  const isReceipt = inv.docType === 'RECEIPT'
  return (
    <div id="invoice-print" className="rounded-lg border border-slate-200 bg-white p-6 text-slate-800 shadow-sm sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{isReceipt ? 'RECEIPT' : 'INVOICE'}</h2>
          <p className="text-sm text-slate-600">#{inv.number}</p>
        </div>
        {inv.logo && <img src={inv.logo} alt="Logo" className="max-h-16 max-w-[160px] object-contain" />}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6">
        <Block label="From" p={inv.from} />
        <Block label={isReceipt ? 'Received by' : 'Bill to'} p={inv.to} />
      </div>

      <div className="mt-4 flex gap-8 text-sm">
        <p><span className="text-slate-500">Issued:</span> {inv.issueDate}</p>
        {!isReceipt && <p><span className="text-slate-500">Due:</span> {inv.dueDate}</p>}
      </div>

      <table className="mt-6 w-full text-sm">
        <thead>
          <tr className="border-b border-slate-300 text-left text-xs uppercase text-slate-500">
            <th className="py-2 font-semibold">Description</th>
            <th className="py-2 text-right font-semibold">Qty</th>
            <th className="py-2 text-right font-semibold">Price</th>
            <th className="py-2 text-right font-semibold">Amount</th>
          </tr>
        </thead>
        <tbody>
          {inv.items.map((i) => (
            <tr key={i.id} className="border-b border-slate-100">
              <td className="py-2 pr-2">{i.description || '—'}</td>
              <td className="py-2 text-right">{i.qty}</td>
              <td className="py-2 text-right">{m(Number(i.price) || 0)}</td>
              <td className="py-2 text-right">{m((Number(i.qty) || 0) * (Number(i.price) || 0))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className="ml-auto mt-4 w-full max-w-xs space-y-1 text-sm">
        <div className="flex justify-between"><dt className="text-slate-500">Subtotal</dt><dd>{m(t.subtotal)}</dd></div>
        {t.discount > 0 && <div className="flex justify-between"><dt className="text-slate-500">Discount</dt><dd>-{m(t.discount)}</dd></div>}
        {Number(inv.taxRate) > 0 && <div className="flex justify-between"><dt className="text-slate-500">Tax ({inv.taxRate}%)</dt><dd>{m(t.tax)}</dd></div>}
        <div className="flex justify-between border-t border-slate-300 pt-2 text-base font-bold"><dt>{isReceipt ? 'Total paid' : 'Total due'}</dt><dd>{m(t.total)}</dd></div>
      </dl>

      {inv.notes && (
        <div className='flex justify-between items-end mt-4'>
          <div className="mt-6 border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Notes</p>
            <p className="mt-1 whitespace-pre-line text-sm text-slate-600">{inv.notes}</p>
          </div>
          <div>
            <p className='text-gray-500 text-xs mt-auto'>Invoice By: </p>
            <a className='text-blue-500 text-sm' href="freeinvoice247.web.app">freeinvoice247.web.app</a>
          </div>
        </div>
      )}
    </div>
  )
}
