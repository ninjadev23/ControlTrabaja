import { useState, useEffect } from 'react';
import { Mail, Calendar, Eye, PenSquare, X, Upload, Save, Loader2, Globe, Cake, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ProfileManager({ initialUser }) {
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(user.profilePhoto);
  
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => setNotification({ ...notification, show: false }), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const showMsg = (message, type = 'success') => {
    setNotification({ show: true, message, type });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    try {
      const PUBLIC_API_URL = import.meta.env.PUBLIC_API_URL;
      const res = await fetch(`${PUBLIC_API_URL}/api/update-profile`, {
        method: 'PUT',
        body: formData,
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        const updatedUser = {
          ...data.user,
          profilePhoto: `${data.user.profilePhoto}?t=${Date.now()}`
        };
        setUser(updatedUser);
        setIsEditing(false);
        showMsg("¡Perfil actualizado correctamente!", "success");
      } else {
        const err = await res.json();
        showMsg(err.message || "Error al actualizar", "error");
      }
    } catch (err) {
      showMsg("Error de conexión con el servidor", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 relative">
      
      {notification.show && (
        <div className={`fixed top-5 right-5 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border animate-in slide-in-from-right-10 duration-300 ${
          notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 className="text-green-600" size={20} /> : <AlertCircle className="text-red-600" size={20} />}
          <p className="font-bold text-sm">{notification.message}</p>
          <button onClick={() => setNotification({ ...notification, show: false })} className="ml-4 opacity-50 hover:opacity-100">
            <X size={16} />
          </button>
        </div>
      )}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bienvenido <span className='text-blue-600'>{user.name}</span>!</h1>
          <p className="text-gray-500">Desde aquí puedes modificar tus datos personales.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition active:scale-95">
            <Eye size={16} /> Ver Público
          </button>
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black transition shadow-lg active:scale-95"
          >
            <PenSquare size={16} /> Editar Perfil
          </button>
        </div>
      </div>

      {/* GRID DE INFORMACIÓN (VISTA) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-50 shadow-inner">
            <img src={user.profilePhoto} alt="Perfil" className="w-full h-full object-cover" key={user.profilePhoto} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <span className="bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-xs font-bold mt-2 uppercase tracking-wider italic">
            {user.googleId ? "Cuenta Google" : "Usuario Estándar"}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <DetailItem icon={<Mail className="text-blue-500" />} label="Email" value={user.email} />
          <DetailItem icon={<Globe className="text-orange-500" />} label="Nacionalidad" value={user.nationality || "No definida"} />
          <DetailItem icon={<Cake className="text-purple-500" />} label="Fecha de Nacimiento" value={user.birthdate || "No definida"} />
          <DetailItem icon={<Calendar className="text-green-500" />} label="Estado de Cuenta" value="Activa" />
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-800">Actualizar Información Personal</h2>
              <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-gray-200 rounded-full transition"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div className="relative group">
                  <img src={preview} className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl" />
                  <label htmlFor="file-upload" className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 shadow-lg transition active:scale-90"><Upload size={16} /></label>
                  <input id="file-upload" name="fotoPerfil" type="file" hidden onChange={handleImageChange} accept="image/*" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputGroup label="Nombre" name="name" defaultValue={user.name} />
                <InputGroup label="Correo" name="email" defaultValue={user.email} type="email" />
                <InputGroup label="Nueva Contraseña" name="password" placeholder="Dejar en blanco si no cambias" type="password" icon={<Lock size={16}/>} />
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-bold text-gray-700">Nacionalidad</label>
                  <select name="nationality" defaultValue={user.nationality} className="w-full border border-gray-200 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20">
                    <option value="">Seleccionar...</option>
                    <option value="Chilena">Chilena</option>
                    <option value="Dominicana">Dominicana</option>
                    <option value="Mexicana">Mexicana</option>
                    <option value="Argentina">Argentina</option>
                  </select>
                </div>
                <InputGroup label="Nacimiento" name="birthdate" defaultValue={user.birthdate} type="date" />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t mt-4">
                <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2.5 text-gray-600 font-semibold hover:bg-gray-100 rounded-xl transition">Cancelar</button>
                <button disabled={loading} type="submit" className="bg-blue-600 text-white px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50 transition shadow-lg shadow-blue-100">
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                  {loading ? "Guardando..." : "Guardar Cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function DetailItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition">
      <div className="p-2 bg-white shadow-sm border border-gray-100 rounded-lg">{icon}</div>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{label}</p>
        <p className="text-gray-700 font-medium">{value}</p>
      </div>
    </div>
  );
}

function InputGroup({ label, name, defaultValue, type = "text", placeholder = "", icon }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-bold text-gray-700">{label}</label>
      <div className="relative">
        <input name={name} type={type} placeholder={placeholder} defaultValue={defaultValue} className="w-full border border-gray-200 p-2.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition" />
        {icon && <div className="absolute right-3 top-3.5 text-gray-400">{icon}</div>}
      </div>
    </div>
  );
}