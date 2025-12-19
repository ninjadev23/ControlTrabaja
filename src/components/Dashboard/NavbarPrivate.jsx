import { useState, useRef, useEffect } from 'react';
import { Bell, Search, Briefcase, LayoutDashboard, User, Settings, LogOut, ChevronDown } from 'lucide-react';
import Logout from "../Auth/Logout"
export default function NavbarPrivate({ userEmail = "janselroa2424@gmail.com" }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Cerrar dropdown al hacer click fuera
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-40">
            <div className="flex items-center gap-8">
                <a href="/dashboard" className="flex items-center gap-2 text-xl font-bold text-gray-800">
                    <div className="bg-blue-700 text-white font-bold p-1 rounded">CO</div>
                    ControlObra
                </a>
                
                <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
                    <a href="#" className="flex items-center gap-2 hover:text-blue-600"><LayoutDashboard size={18}/> Dashboard</a>
                    <a href="#" className="flex items-center gap-2 hover:text-blue-600"><Search size={18}/> Explorar</a>
                    <a href="#" className="flex items-center gap-2 hover:text-blue-600"><Briefcase size={18}/> Mi Perfil</a>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="text-gray-500 hover:bg-gray-100 p-2 rounded-full relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>

                <div className="relative" ref={dropdownRef}>
                    <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 focus:outline-none">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                            J
                        </div>
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                            <div className="px-4 py-3 border-b border-gray-100">
                                <p className="text-sm font-bold text-gray-900">Jansel Roa</p>
                                <p className="text-xs text-gray-500 truncate">{userEmail}</p>
                            </div>
                            
                            <div className="py-1">
                                <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                    <User size={16} /> Mi Perfil
                                </a>
                                <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                    <Settings size={16} /> Configuración
                                </a>
                            </div>
                            
                            <div className="py-1 border-t border-gray-100">
                               <Logout/>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}