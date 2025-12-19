// En tu componente de Navegación/Dropdown
import { LogOut } from 'lucide-react';

export default function UserMenu() {
    const handleLogout = async () => {
        const API_URL = import.meta.env.PUBLIC_API_URL;
        try {
            const response = await fetch(`${API_URL}/api/logout`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                },
                credentials: 'include', 
            });

            if (response.ok) {
                window.location.assign('/');
            } else {
                console.error("Error al cerrar sesión en el servidor");
            }
        } catch (error) {
            console.error("Error de red:", error);
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