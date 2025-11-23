import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      path: '/',
      label: 'Inicio',
      icon: '🏠',
      exact: true
    },
    {
      path: '/academic',
      label: 'Gestión Académica',
      icon: '📚'
    },
    {
      path: '/calendar',
      label: 'Calendario',
      icon: '📅'
    },
    {
      path: '/statistics',
      label: 'Estadísticas',
      icon: '📊'
    }
  ];

  const isActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return location.pathname.startsWith(item.path);
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-dark-800 border-r border-dark-700 transition-all duration-300 z-50 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-dark-700">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-gray-100">🎓 UniTask</h1>
                <p className="text-xs text-gray-400 mt-1">
                  Hola, {user?.name || user?.username}
                </p>
              </div>
            )}
            <button
              onClick={onToggleCollapse}
              className="p-2 hover:bg-dark-700 rounded-lg text-gray-400 hover:text-gray-300 transition-colors"
              title={isCollapsed ? 'Expandir' : 'Contraer'}
            >
              {isCollapsed ? '→' : '←'}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                isActive(item)
                  ? 'bg-accent-500 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-dark-700 hover:text-gray-300'
              }`}
              title={isCollapsed ? item.label : ''}
            >
              <span className="text-2xl">{item.icon}</span>
              {!isCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-dark-700">
          <button
            onClick={logout}
            className={`flex items-center gap-3 px-3 py-3 rounded-lg text-gray-400 hover:bg-danger-500/10 hover:text-danger-400 transition-all w-full ${
              isCollapsed ? 'justify-center' : ''
            }`}
            title={isCollapsed ? 'Cerrar sesión' : ''}
          >
            <span className="text-2xl">🚪</span>
            {!isCollapsed && <span className="font-medium">Cerrar sesión</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
