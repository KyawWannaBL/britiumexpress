import React from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Clock, Headset, Mail, Phone, MapPin } from "lucide-react";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border bg-white shadow-soft ${className}`}>{children}</div>;
}

export default function ContactPage() {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [subject, setSubject] = React.useState("General Inquiry");
  const [message, setMessage] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [ok, setOk] = React.useState<string | null>(null);
  const [err, setErr] = React.useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setOk(null);
    setErr(null);
    try {
      await addDoc(collection(db, "contact_messages"), {
        name: name.trim(),
        phone: phone.trim(),
        subject,
        message: message.trim(),
        createdAt: serverTimestamp(),
        source: "web",
      });
      setOk("Message sent. We will contact you soon.");
      setName("");
      setPhone("");
      setSubject("General Inquiry");
      setMessage("");
    } catch (e: any) {
      setErr(e?.message ?? "Failed to send message.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-10 slide-up">
      <section className="rounded-3xl overflow-hidden border shadow-soft">
        <div className="brand-gradient text-white p-8 md:p-12 relative">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(600px_280px_at_20%_10%,rgba(255,107,0,.35),transparent_60%),radial-gradient(700px_360px_at_85%_20%,rgba(255,255,255,.12),transparent_60%)]" />
          <div className="relative">
            <h1 className="text-4xl md:text-5xl font-extrabold">Get in Touch</h1>
            <p className="mt-3 text-white/85 text-lg">We are here to assist you with your logistics needs.</p>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {[
          { icon: <Headset className="w-5 h-5" />, title: "Call Us", lines: ["+95-9-897447744", "+95-9-897447755"] },
          { icon: <Mail className="w-5 h-5" />, title: "Email Us", lines: ["info@britiumexpress.com", "sales@britiumexpress.com"] },
          { icon: <Clock className="w-5 h-5" />, title: "Operating Hours", lines: ["Mon - Sat: 9:00am - 5:30pm", "Closed on Sundays"] },
        ].map((c) => (
          <Card key={c.title}>
            <div className="p-5">
              <div className="w-11 h-11 rounded-2xl brand-accent text-white grid place-items-center">{c.icon}</div>
              <div className="mt-3 text-lg font-extrabold text-slate-900">{c.title}</div>
              <div className="mt-2 text-sm text-slate-600 space-y-1">
                {c.lines.map((l) => (
                  <div key={l} className={l.includes("Closed") ? "text-red-600 font-extrabold" : ""}>{l}</div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid lg:grid-cols-2 gap-6 items-start">
        <Card>
          <div className="p-6">
            <div className="text-2xl font-extrabold text-slate-900">Send us a Message</div>
            <div className="text-sm text-slate-600 mt-1">We will respond during operating hours.</div>

            {ok ? <div className="mt-4 rounded-xl border bg-green-50 text-green-700 text-sm font-semibold p-3">{ok}</div> : null}
            {err ? <div className="mt-4 rounded-xl border bg-red-50 text-red-700 text-sm font-semibold p-3">{err}</div> : null}

            <form onSubmit={submit} className="mt-5 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <div className="text-xs font-extrabold text-slate-600 mb-1">Your Name</div>
                  <input className="w-full rounded-xl border px-3 py-2 text-sm" value={name} onChange={(e) => setName(e.target.value)} placeholder="U Ba Maung" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-slate-600 mb-1">Phone Number</div>
                  <input className="w-full rounded-xl border px-3 py-2 text-sm" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="09xxxxxxxxx" />
                </div>
              </div>

              <div>
                <div className="text-xs font-extrabold text-slate-600 mb-1">Subject</div>
                <select className="w-full rounded-xl border px-3 py-2 text-sm" value={subject} onChange={(e) => setSubject(e.target.value)}>
                  <option>General Inquiry</option>
                  <option>Rate Quotation</option>
                  <option>Corporate Partnership</option>
                  <option>Report an Issue</option>
                </select>
              </div>

              <div>
                <div className="text-xs font-extrabold text-slate-600 mb-1">Message</div>
                <textarea className="w-full rounded-xl border px-3 py-2 text-sm" value={message} onChange={(e) => setMessage(e.target.value)} rows={6} placeholder="How can we help you?" />
              </div>

              <button type="submit" disabled={busy} className="w-full rounded-xl py-3 font-extrabold brand-accent text-white disabled:opacity-60">
                {busy ? "SENDING…" : "SEND MESSAGE"}
              </button>
            </form>
          </div>
        </Card>

        <div className="space-y-4">
          <div className="text-2xl font-extrabold text-slate-900">Our Locations</div>

          <div className="rounded-3xl overflow-hidden border shadow-soft h-[300px] bg-white">
            <iframe
              title="Britium Express Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3818.604245636043!2d96.1951!3d16.8458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDUwJzQ0LjkiTiA5NsKwMTEnNDIuNCJF!5e0!3m2!1sen!2smm!4v1620000000000!5m2!1sen!2smm"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {[
            { title: "Yangon Head Office", desc: "No. 277, Corner of Anawrahta Road and Bo Moe Gyo St., East Dagon Township.", phone: "09-897447744" },
            { title: "Mandalay Hub", desc: "Serving Upper Myanmar Region.", phone: "09-422299994" },
            { title: "Nay Pyi Taw Hub", desc: "Serving the Capital & Union Territory.", phone: "09-782326699" },
          ].map((b) => (
            <Card key={b.title}>
              <div className="p-5">
                <div className="flex gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-slate-50 border grid place-items-center text-[var(--brand-blue)]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900">{b.title}</div>
                    <div className="text-sm text-slate-600 mt-1">{b.desc}</div>
                    <div className="mt-2 inline-flex items-center gap-2 text-sm font-extrabold text-[var(--brand-blue)]">
                      <Phone className="w-4 h-4" /> {b.phone}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
