import { useState, useEffect } from 'react';
import { TaskRepository, SubjectRepository } from '../../data/repositories';
import { Card } from '../components/common';

const StatisticsPage = () => {
  const [stats, setStats] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsData, subjectsData] = await Promise.all([
        TaskRepository.getStats(),
        SubjectRepository.getActive()
      ]);

      // Get task count per subject
      const subjectsWithStats = await Promise.all(
        subjectsData.map(async (subject) => {
          const tasks = await TaskRepository.getBySubject(subject.id);
          return {
            ...subject,
            taskCount: tasks.length,
            completedCount: tasks.filter((t) => t.completed).length
          };
        })
      );

      setStats(statsData);
      setSubjects(subjectsWithStats);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          📊 Estadísticas
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Analiza tu progreso académico
        </p>
      </div>

      {stats && (
        <>
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-accent-500/10 to-accent-600/5 border-accent-500/20">
              <div className="text-center">
                <div className="text-4xl mb-3">📝</div>
                <p className="text-5xl font-bold text-accent-400 mb-2">
                  {stats.total}
                </p>
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Total de Tareas
                </p>
              </div>
            </Card>
            <Card className="bg-gradient-to-br from-success-500/10 to-success-600/5 border-success-500/20">
              <div className="text-center">
                <div className="text-4xl mb-3">✅</div>
                <p className="text-5xl font-bold text-success-500 mb-2">
                  {stats.completed}
                </p>
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Completadas
                </p>
              </div>
            </Card>
            <Card className="bg-gradient-to-br from-warning-500/10 to-warning-600/5 border-warning-500/20">
              <div className="text-center">
                <div className="text-4xl mb-3">⏰</div>
                <p className="text-5xl font-bold text-warning-500 mb-2">
                  {stats.pending}
                </p>
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Pendientes
                </p>
              </div>
            </Card>
            <Card className="bg-gradient-to-br from-danger-500/10 to-danger-600/5 border-danger-500/20">
              <div className="text-center">
                <div className="text-4xl mb-3">🔥</div>
                <p className="text-5xl font-bold text-danger-500 mb-2">
                  {stats.overdue}
                </p>
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Vencidas
                </p>
              </div>
            </Card>
          </div>

          {/* Completion Rate */}
          <Card className="mb-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  Tasa de Cumplimiento
                </h3>
                <span className="text-4xl font-bold text-accent-500 dark:text-accent-400">
                  {stats.completionRate.toFixed(1)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-6 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-accent-500 to-success-500 transition-all duration-500 flex items-center justify-end px-3"
                  style={{ width: `${stats.completionRate}%` }}
                >
                  {stats.completionRate > 10 && (
                    <span className="text-sm font-semibold text-white">
                      {stats.completionRate.toFixed(0)}%
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-400">
                Has completado {stats.completed} de {stats.total} tareas totales
              </p>
            </div>
          </Card>

          {/* Distribution Chart */}
          <Card className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Distribución de Tareas
            </h3>
            <div className="space-y-6">
              {/* Completed */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300 flex items-center gap-3 text-lg">
                    <span className="w-4 h-4 rounded-full bg-success-500"></span>
                    Completadas
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 font-semibold">
                    {stats.total > 0
                      ? ((stats.completed / stats.total) * 100).toFixed(1)
                      : 0}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-4">
                  <div
                    className="h-full bg-success-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        stats.total > 0
                          ? (stats.completed / stats.total) * 100
                          : 0
                      }%`
                    }}
                  ></div>
                </div>
              </div>

              {/* Pending */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300 flex items-center gap-3 text-lg">
                    <span className="w-4 h-4 rounded-full bg-warning-500"></span>
                    Pendientes
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 font-semibold">
                    {stats.total > 0
                      ? ((stats.pending / stats.total) * 100).toFixed(1)
                      : 0}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-4">
                  <div
                    className="h-full bg-warning-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        stats.total > 0 ? (stats.pending / stats.total) * 100 : 0
                      }%`
                    }}
                  ></div>
                </div>
              </div>

              {/* Overdue */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 dark:text-gray-300 flex items-center gap-3 text-lg">
                    <span className="w-4 h-4 rounded-full bg-danger-500"></span>
                    Vencidas
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 font-semibold">
                    {stats.total > 0
                      ? ((stats.overdue / stats.total) * 100).toFixed(1)
                      : 0}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-4">
                  <div
                    className="h-full bg-danger-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        stats.total > 0 ? (stats.overdue / stats.total) * 100 : 0
                      }%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </Card>

          {/* Subjects Statistics */}
          <Card>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
              Estadísticas por Materia
            </h3>
            {subjects.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                No hay materias registradas
              </p>
            ) : (
              <div className="space-y-4">
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-dark-700 rounded-lg"
                  >
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-2xl"
                      style={{ backgroundColor: subject.color }}
                    >
                      {subject.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {subject.name}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span>📝 {subject.taskCount} tareas</span>
                        <span>✅ {subject.completedCount} completadas</span>
                        {subject.taskCount > 0 && (
                          <span className="text-accent-500 dark:text-accent-400 font-semibold">
                            {((subject.completedCount / subject.taskCount) * 100).toFixed(0)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </>
      )}
    </div>
  );
};

export default StatisticsPage;
