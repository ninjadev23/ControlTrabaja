import { useState } from 'react';
import { Mail, ArrowLeft, Eye, EyeOff, Loader2, CheckCircle2, XCircle } from 'lucide-react';

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setLoading(true);

    const formData = new FormData(e.target);
    const { name, email, password, confirmPassword } = Object.fromEntries(formData);

    if (password !== confirmPassword) {
      setStatus({ type: 'error', message: "Las contraseñas no coinciden" });
      setLoading(false);
      return;
    }

    try {
      const API_URL = import.meta.env.PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/api/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        if(data.token) {
            document.cookie = `access_token=${data.token}; path=/; max-age=${60 * 60 * 24 * 20}; SameSite=Lax; Secure`;
        }
        setStatus({ type: 'success', message: "¡Cuenta creada! Redirigiendo..." });
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        const errData = await response.json();
        setStatus({ type: 'error', message: errData.message || "Error al crear la cuenta" });
        setLoading(false);
      }
    } catch (err) {
      setStatus({ type: 'error', message: "Error de conexión con el servidor" });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl w-full border border-gray-100 animate-in fade-in zoom-in-95 duration-500">
      
      <div className="hidden md:block md:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop"
          alt="Construcción"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/20 backdrop-brightness-90"></div>
      </div>

      <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <div className="text-center mb-8">
          <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">ControlObra.cl</span>
          <h2 className="text-3xl font-bold text-gray-900 mt-2">Crea tu futuro</h2>
          <p className="text-gray-500 text-sm mt-2">Únete a la red profesional líder en construcción.</p>
        </div>

        {status.message && (
          <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 border animate-in slide-in-from-top-2 duration-300 ${
            status.type === 'success' ? 'bg-green-50 border-green-100 text-green-700' : 'bg-red-50 border-red-100 text-red-700'
          }`}>
            {status.type === 'success' ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
            <span className="text-sm font-bold">{status.message}</span>
          </div>
        )}

        {step === 1 ? (
          <div className="space-y-4 animate-in fade-in duration-300">
            <a href="https://controltrabajaapi-production.up.railway.app/api/auth/google" className="flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition font-medium text-gray-700">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" />
              <span>Continuar con Google</span>
            </a>
            
            <div className="relative my-8 text-center">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
              <span className="relative bg-white px-4 text-xs text-gray-400 uppercase tracking-widest">O con tu correo</span>
            </div>

            <button onClick={() => setStep(2)} className="w-full bg-gray-900 hover:bg-black text-white py-3.5 rounded-xl flex items-center justify-center gap-2 transition font-bold shadow-lg shadow-gray-200">
              <Mail size={18} />
              Registrarse con Email
            </button>

            <p className="text-center text-sm text-gray-600 mt-6">
              ¿Ya tienes una cuenta? <a href="/login" className="text-blue-600 font-bold hover:underline">Inicia sesión</a>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 animate-in slide-in-from-right-4 duration-300">
            <button type="button" onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-500 text-sm font-medium hover:text-blue-600 transition mb-2">
              <ArrowLeft size={16} /> Volver
            </button>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Nombre completo</label>
              <input name="name" type="text" required placeholder="Ej: Juan Pérez" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition" />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
              <input name="email" type="email" required placeholder="tu@email.com" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block text-sm font-bold text-gray-700 mb-1">Contraseña</label>
                <input name="password" type={showPass ? "text" : "password"} required className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-9 text-gray-400">{showPass ? <EyeOff size={18} /> : <Eye size={18} />}</button>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Repetir</label>
                <input name="confirmPassword" type="password" required className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition" />
              </div>
            </div>

            <button disabled={loading} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-blue-100 mt-4">
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Crear Cuenta"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}