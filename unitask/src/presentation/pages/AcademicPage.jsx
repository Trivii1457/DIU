import { Link, Outlet, useLocation } from 'react-router-dom';

const AcademicPage = () => {
  const location = useLocation();
  const isRootPath = location.pathname === '/academic';

  const tabs = [
    { path: '/academic/tasks', label: '📋 Tareas', icon: '📋' },
    { path: '/academic/subjects', label: '📚 Materias', icon: '📚' }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          📚 Gestión Académica
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Administra tus materias y tareas
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-dark-700">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`px-6 py-3 font-medium transition-all border-b-2 ${
              location.pathname === tab.path
                ? 'border-accent-500 text-accent-500 dark:text-accent-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-dark-600'
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Content */}
      {isRootPath ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/academic/tasks">
            <div className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl p-8 hover:border-accent-500/50 transition-all cursor-pointer">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Tareas
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Gestiona tus tareas y proyectos académicos
              </p>
            </div>
          </Link>

          <Link to="/academic/subjects">
            <div className="bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-700 rounded-xl p-8 hover:border-accent-500/50 transition-all cursor-pointer">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Materias
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Administra tus materias y cursos
              </p>
            </div>
          </Link>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default AcademicPage;
