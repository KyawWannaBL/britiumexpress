/* =========================================================
   File: src/components/AuthModal.tsx
   ========================================================= */
import { X } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export function AuthModal({
  open,
  mode,
  onClose,
}: {
  open: boolean;
  mode: "login" | "signup";
  onClose: () => void;
}) {
  const { login, signUp } = useAuth();
  const [tab, setTab] = useState<"login" | "signup">(mode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setTab(mode);
      setErr(null);
      setBusy(false);
      setPw("");
    }
  }, [open, mode]);

  if (!open) return null;

  async function onSubmit() {
  const { t } = useI18n();

    setErr(null);
    setBusy(true);
    try {
      if (tab === "signup") {
        await signUp({ name, email, password: pw });
      } else {
        await login({ email, password: pw });
      }
      onClose();
    } catch (e: any) {
      setErr(e?.message ?? "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-end sm:items-center justify-center p-3">
      <div className="w-full sm:w-[420px] bg-white rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="font-extrabold text-[#0d2c54]">{t("Britium Express")}</div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-2 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setTab("login")}
              className={`py-2 rounded-lg font-bold text-sm ${
                tab === "login" ? "bg-white shadow" : "text-gray-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setTab("signup")}
              className={`py-2 rounded-lg font-bold text-sm ${
                tab === "signup" ? "bg-white shadow" : "text-gray-600"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {tab === "signup" && (
              <div>
                <label className="text-xs font-bold text-gray-600 uppercase">{t("Full Name")}</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0d2c54]"
                  placeholder={t("Your name")}
                />
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-gray-600 uppercase">{t("Email")}</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0d2c54]"
                placeholder={t("name@email.com")}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-600 uppercase">{t("Password")}</label>
              <input
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                type="password"
                className="mt-1 w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0d2c54]"
                placeholder={t("••••••••")}
              />
            </div>

            {err && <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-xl">{err}</div>}

            <button
              onClick={onSubmit}
              disabled={busy || !email || !pw || (tab === "signup" && !name.trim())}
              className="w-full py-3 rounded-xl font-extrabold text-white bg-[#0d2c54] hover:bg-blue-950 disabled:opacity-50"
            >
              {busy ? "Please wait..." : tab === "signup" ? "Create Account" : "Login"}
            </button>

            <div className="text-xs text-gray-500">
              Demo auth stores users in your browser. For production, wire this UI to Firebase/Supabase Auth.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}