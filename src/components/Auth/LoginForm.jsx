import { useState } from 'react';
import AuthLayout from './AuthLayout';

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const PUBLIC_API_URL = import.meta.env.PUBLIC_API_URL;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch(`${PUBLIC_API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const ResponseData = await response.json();
                document.cookie = `access_token=${ResponseData.token}; path=/; max-age=${60 * 60 * 24 * 20}; SameSite=Lax; Secure`;
                window.location.assign('/dashboard');
            } else {
                alert('Credenciales incorrectas');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout imageSrc="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop">
            <div className="max-w-md mx-auto w-full">
                <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Inicio de sesión</h2>
                <p className="text-gray-500 text-center mb-8">Accede ahora y mantén tu trayectoria laboral al día.</p>

                <div className="space-y-3 mb-6">
                    <a
                        href="https://controltrabajaapi-production.up.railway.app/api/auth/google"
                        className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 transition font-medium text-gray-700"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                        Continuar con Google
                    </a>
                    <button className="w-full border border-gray-300 py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 font-medium text-gray-700">
                        <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-5 h-5" alt="F" />
                        Continuar con Facebook
                    </button>
                </div>

                <div className="relative my-6 text-center">
                    <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
                    <span className="relative bg-white px-2 text-sm text-gray-400 uppercase">O continúa con</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="email" name="email" placeholder="tu@email.com" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none" />
                    <input type="password" name="password" placeholder="Contraseña" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none" />

                    <button disabled={loading} type="submit" className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-lg font-bold transition">
                        {loading ? 'Entrando...' : 'Iniciar sesión con Email'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-600">
                    ¿No tienes cuenta? <a href="/register" className="text-blue-600 font-medium hover:underline">Regístrate</a>
                </p>
            </div>
        </AuthLayout>
    );
}