import { useState, useEffect } from 'react';
import { TaskRepository, SubjectRepository } from '../../data/repositories';
import { Button, Card } from '../components/common';
import { formatDate } from '../../infrastructure/utils/helpers';
import TaskFormModal from '../components/tasks/TaskFormModal';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showStatistics, setShowStatistics] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [tasksData, subjectsData, statsData] = await Promise.all([
        TaskRepository.getToday(),
        SubjectRepository.getActive(),
        TaskRepository.getStats()
      ]);
      
      setTasks(tasksData);
      setSubjects(subjectsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (taskId, currentStatus) => {
    try {
      if (currentStatus) {
        await TaskRepository.markAsPending(taskId);
      } else {
        await TaskRepository.markAsCompleted(taskId);
      }
      loadData();
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-2">
            🎓 UniTask
          </h1>
          <p className="text-gray-400">
            Gestión de tareas académicas
          </p>
        </header>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setShowStatistics(false)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              !showStatistics
                ? 'bg-accent-500 text-white shadow-md'
                : 'bg-dark-700 text-gray-400 hover:bg-dark-600'
            }`}
          >
            📋 Tareas
          </button>
          <button
            onClick={() => setShowStatistics(true)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              showStatistics
                ? 'bg-accent-500 text-white shadow-md'
                : 'bg-dark-700 text-gray-400 hover:bg-dark-600'
            }`}
          >
            📊 Estadísticas
          </button>
        </div>

        {showStatistics ? (
          /* Statistics Section */
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-6">
                📊 Estadísticas Generales
              </h2>
              
              {stats && (
                <>
                  {/* Main Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-accent-400 mb-2">{stats.total}</p>
                        <p className="text-sm text-gray-400 uppercase tracking-wide">Total de Tareas</p>
                      </div>
                    </Card>
                    <Card>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-success-500 mb-2">{stats.completed}</p>
                        <p className="text-sm text-gray-400 uppercase tracking-wide">Completadas</p>
                      </div>
                    </Card>
                    <Card>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-warning-500 mb-2">{stats.pending}</p>
                        <p className="text-sm text-gray-400 uppercase tracking-wide">Pendientes</p>
                      </div>
                    </Card>
                    <Card>
                      <div className="text-center">
                        <p className="text-4xl font-bold text-danger-500 mb-2">{stats.overdue}</p>
                        <p className="text-sm text-gray-400 uppercase tracking-wide">Vencidas</p>
                      </div>
                    </Card>
                  </div>

                  {/* Completion Rate */}
                  <Card className="mb-8">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-100">
                          Tasa de Cumplimiento
                        </h3>
                        <span className="text-2xl font-bold text-accent-400">
                          {stats.completionRate.toFixed(1)}%
                        </span>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-dark-600 rounded-full h-4 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent-500 to-success-500 transition-all duration-500 flex items-center justify-end px-2"
                          style={{ width: `${stats.completionRate}%` }}
                        >
                          {stats.completionRate > 10 && (
                            <span className="text-xs font-semibold text-white">
                              {stats.completionRate.toFixed(0)}%
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-400">
                        Has completado {stats.completed} de {stats.total} tareas totales
                      </p>
                    </div>
                  </Card>

                  {/* Distribution Chart */}
                  <Card>
                    <h3 className="text-lg font-semibold text-gray-100 mb-6">
                      Distribución de Tareas
                    </h3>
                    <div className="space-y-4">
                      {/* Completed */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-300 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-success-500"></span>
                            Completadas
                          </span>
                          <span className="text-gray-400">
                            {stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : 0}%
                          </span>
                        </div>
                        <div className="w-full bg-dark-600 rounded-full h-2">
                          <div
                            className="h-full bg-success-500 rounded-full transition-all duration-500"
                            style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Pending */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-300 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-warning-500"></span>
                            Pendientes
                          </span>
                          <span className="text-gray-400">
                            {stats.total > 0 ? ((stats.pending / stats.total) * 100).toFixed(1) : 0}%
                          </span>
                        </div>
                        <div className="w-full bg-dark-600 rounded-full h-2">
                          <div
                            className="h-full bg-warning-500 rounded-full transition-all duration-500"
                            style={{ width: `${stats.total > 0 ? (stats.pending / stats.total) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Overdue */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-300 flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-danger-500"></span>
                            Vencidas
                          </span>
                          <span className="text-gray-400">
                            {stats.total > 0 ? ((stats.overdue / stats.total) * 100).toFixed(1) : 0}%
                          </span>
                        </div>
                        <div className="w-full bg-dark-600 rounded-full h-2">
                          <div
                            className="h-full bg-danger-500 rounded-full transition-all duration-500"
                            style={{ width: `${stats.total > 0 ? (stats.overdue / stats.total) * 100 : 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </>
              )}
            </section>
          </div>
        ) : (
          /* Tasks Section */
          <>
            {/* Quick Stats */}
            {stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-accent-400">{stats.total}</p>
                    <p className="text-xs text-gray-400 mt-1">Total</p>
                  </div>
                </Card>
                <Card>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-success-500">{stats.completed}</p>
                    <p className="text-xs text-gray-400 mt-1">Completadas</p>
                  </div>
                </Card>
                <Card>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-warning-500">{stats.pending}</p>
                    <p className="text-xs text-gray-400 mt-1">Pendientes</p>
                  </div>
                </Card>
                <Card>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-danger-500">{stats.overdue}</p>
                    <p className="text-xs text-gray-400 mt-1">Vencidas</p>
                  </div>
                </Card>
              </div>
            )}

            {/* Materias */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                📚 Materias
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {subjects.map(subject => (
                  <Card key={subject.id} hover>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl shadow-md"
                        style={{ backgroundColor: subject.color }}
                      >
                        📚
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-100">
                          {subject.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {subject.icon}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Tareas de hoy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-100 mb-4">
                📅 Tareas de hoy
              </h2>
              {tasks.length === 0 ? (
                <Card>
                  <p className="text-center text-gray-400 py-8">
                    No tienes tareas para hoy 🎉
                  </p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {tasks.map(task => (
                    <Card key={task.id} hover>
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleToggleTask(task.id, task.completed)}
                          className="mt-1 w-5 h-5 text-accent-500 bg-dark-600 border-dark-400 rounded focus:ring-accent-500 focus:ring-offset-dark-900"
                        />
                        <div className="flex-1">
                          <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className="text-sm text-gray-400 mt-1">
                              {task.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-xs text-gray-500">
                              📅 {formatDate(task.dueDate)}
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              task.priority === 'high' ? 'bg-danger-500/20 text-danger-400 border border-danger-500/30' :
                              task.priority === 'medium' ? 'bg-warning-500/20 text-warning-400 border border-warning-500/30' :
                              'bg-accent-500/20 text-accent-400 border border-accent-500/30'
                            }`}>
                              {task.priority === 'high' ? '🔴 Alta' : task.priority === 'medium' ? '🟡 Media' : '🔵 Baja'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {/* Botón flotante */}
        <button 
          onClick={() => setShowTaskForm(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-accent-500 text-white rounded-full shadow-dark hover:bg-accent-600 transition-all flex items-center justify-center text-2xl hover:scale-110"
        >
          +
        </button>

        {/* Task Form Modal */}
        <TaskFormModal
          isOpen={showTaskForm}
          onClose={() => setShowTaskForm(false)}
          onTaskCreated={loadData}
          subjects={subjects}
        />
      </div>
    </div>
  );
};

export default HomePage;
