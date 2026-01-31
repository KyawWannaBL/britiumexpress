import React from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";

export default function SendParcel() {
  const [fromName, setFromName] = React.useState("");
  const [fromPhone, setFromPhone] = React.useState("");
  const [toName, setToName] = React.useState("");
  const [toPhone, setToPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [note, setNote] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [status, setStatus] = React.useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setStatus(null);
    try {
      const ref = await addDoc(collection(db, "shipments"), {
        fromName: fromName.trim(),
        fromPhone: fromPhone.trim(),
        toName: toName.trim(),
        toPhone: toPhone.trim(),
        address: address.trim(),
        note: note.trim(),
        createdAt: serverTimestamp(),
        status: "Created",
      });
      setStatus(`Shipment created: ${ref.id}`);
      setFromName(""); setFromPhone(""); setToName(""); setToPhone(""); setAddress(""); setNote("");
    } catch (e: any) {
      setStatus(e?.message ?? "Failed to create shipment");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto rounded-3xl border bg-white shadow-soft p-6 slide-up">
      <div className="text-2xl font-extrabold text-slate-900">Send a Parcel</div>
      <div className="text-sm text-slate-600 mt-1">Create a shipment request (saved to Firestore).</div>

      {status ? <div className="mt-4 rounded-xl border bg-slate-50 p-3 text-sm font-semibold">{status}</div> : null}

      <form onSubmit={submit} className="mt-5 grid gap-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <input className="rounded-xl border px-3 py-2 text-sm" value={fromName} onChange={(e) => setFromName(e.target.value)} placeholder="Sender Name" />
          <input className="rounded-xl border px-3 py-2 text-sm" value={fromPhone} onChange={(e) => setFromPhone(e.target.value)} placeholder="Sender Phone" />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <input className="rounded-xl border px-3 py-2 text-sm" value={toName} onChange={(e) => setToName(e.target.value)} placeholder="Receiver Name" />
          <input className="rounded-xl border px-3 py-2 text-sm" value={toPhone} onChange={(e) => setToPhone(e.target.value)} placeholder="Receiver Phone" />
        </div>
        <input className="rounded-xl border px-3 py-2 text-sm" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Delivery Address" />
        <textarea className="rounded-xl border px-3 py-2 text-sm" value={note} onChange={(e) => setNote(e.target.value)} rows={5} placeholder="Notes (optional)" />

        <button disabled={busy} className="rounded-xl py-3 font-extrabold brand-accent text-white disabled:opacity-60">
          {busy ? "CREATING…" : "CREATE SHIPMENT"}
        </button>
      </form>
    </div>
  );
}
