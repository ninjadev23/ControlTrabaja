// En tu componente de Navegación/Dropdown
import { LogOut } from 'lucide-react';

export default function UserMenu() {
    const handleLogout = async () => {
    const API_URL = import.meta.env.PUBLIC_API_URL;

    try {
        await fetch(`${API_URL}/api/logout`, {
            method: 'DELETE',
            credentials: 'include'
        });
    } catch (err) {
        console.error("Error al avisar al backend del logout", err);
    } finally {
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = '/login';
    }
};

    return (
        <button 
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors text-sm font-medium"
        >
            <LogOut size={16} />
            Cerrar Sesión
        </button>
    );
}