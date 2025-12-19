export default function AuthLayout({ children, imageSrc, reverse = false }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="px-8 py-4 flex justify-between items-center bg-white">
        <a href="/" className="flex items-center gap-2 text-xl font-bold text-gray-800">
           <div className="bg-blue-700 text-white font-bold p-1 rounded text-lg">CO</div>
           ControlObra
        </a>
        <div className="flex gap-4 text-sm">
             <a href="/login" className="hover:text-blue-600">Iniciar sesión</a>
             <a href="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Crear cuenta</a>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 min-h-[600px]">
            {/* Contenido dinámico (Formulario o Imagen según reverse) */}
            <div className={`p-8 md:p-12 flex flex-col justify-center ${reverse ? 'order-2' : 'order-1'}`}>
                {children}
            </div>

            {/* Imagen Lateral */}
            <div className={`relative h-full ${reverse ? 'order-1' : 'order-2'}`}>
                <img 
                    src={imageSrc} 
                    alt="Construcción" 
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-900/20"></div>
            </div>
        </div>
      </main>
    </div>
  );
}