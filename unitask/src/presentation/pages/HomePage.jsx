import { useState, useEffect } from 'react';
import { TaskRepository, SubjectRepository } from '../../data/repositories';
import { Button, Card } from '../components/common';
import { formatDate } from '../../infrastructure/utils/helpers';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          🎓 UniTask
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gestión de tareas académicas
        </p>
      </header>

      {/* Estadísticas */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-500">{stats.total}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-3xl font-bold text-success-500">{stats.completed}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completadas</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-500">{stats.pending}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pendientes</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-500">{stats.overdue}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Vencidas</p>
            </div>
          </Card>
        </div>
      )}

      {/* Materias */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Materias
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subjects.map(subject => (
            <Card key={subject.id} hover>
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl"
                  style={{ backgroundColor: subject.color }}
                >
                  📚
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Tareas de hoy
        </h2>
        {tasks.length === 0 ? (
          <Card>
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
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
                    className="mt-1 w-5 h-5 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <div className="flex-1">
                    <h3 className={`font-semibold ${task.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {task.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-gray-500">
                        📅 {formatDate(task.dueDate)}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        task.priority === 'high' ? 'bg-red-100 text-red-700' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Media' : 'Baja'}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Botón flotante */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors flex items-center justify-center text-2xl">
        +
      </button>
    </div>
  );
};

export default HomePage;
