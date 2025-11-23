import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TaskRepository, SubjectRepository } from '../../data/repositories';
import { Card, Button } from '../components/common';
import { useAuth } from '../../context/AuthContext';

const WelcomePage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsData, tasksData, subjectsData] = await Promise.all([
        TaskRepository.getStats(),
        TaskRepository.getAll(),
        SubjectRepository.getActive()
      ]);

      setStats(statsData);
      // Get 5 most recent pending tasks
      const pending = tasksData
        .filter(t => !t.completed)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setRecentTasks(pending);
      setSubjects(subjectsData);
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
          <p className="text-gray-400">Cargando...</p>
        </div>
      </div>
    );
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '¡Buenos días';
    if (hour < 19) return '¡Buenas tardes';
    return '¡Buenas noches';
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Welcome Header */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-gray-100 mb-2">
          {getGreeting()}, {user?.name || user?.username}! 👋
        </h1>
        <p className="text-gray-400 text-lg">
          Bienvenido a tu espacio de gestión académica
        </p>
      </section>

      {/* Quick Stats */}
      {stats && (
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-br from-accent-500/10 to-accent-600/5 border-accent-500/20">
              <div className="text-center">
                <div className="text-4xl mb-3">📝</div>
                <p className="text-4xl font-bold text-accent-400 mb-2">
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
                <p className="text-4xl font-bold text-success-400 mb-2">
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
                <p className="text-4xl font-bold text-warning-400 mb-2">
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
                <p className="text-4xl font-bold text-danger-400 mb-2">
                  {stats.overdue}
                </p>
                <p className="text-sm text-gray-400 uppercase tracking-wide">
                  Vencidas
                </p>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Quick Actions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-100 mb-6">
          🚀 Accesos Rápidos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/academic/tasks">
            <Card hover className="h-full cursor-pointer">
              <div className="text-center p-4">
                <div className="text-5xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  Mis Tareas
                </h3>
                <p className="text-sm text-gray-400">
                  Gestiona tus tareas y proyectos
                </p>
              </div>
            </Card>
          </Link>

          <Link to="/academic/subjects">
            <Card hover className="h-full cursor-pointer">
              <div className="text-center p-4">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  Materias
                </h3>
                <p className="text-sm text-gray-400">
                  Administra tus materias
                </p>
              </div>
            </Card>
          </Link>

          <Link to="/calendar">
            <Card hover className="h-full cursor-pointer">
              <div className="text-center p-4">
                <div className="text-5xl mb-4">📅</div>
                <h3 className="text-xl font-semibold text-gray-100 mb-2">
                  Calendario
                </h3>
                <p className="text-sm text-gray-400">
                  Visualiza tus próximas entregas
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </section>

      {/* Recent Tasks */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-100">
            📝 Tareas Recientes
          </h2>
          <Link to="/academic/tasks">
            <Button variant="secondary" size="sm">
              Ver todas
            </Button>
          </Link>
        </div>

        {recentTasks.length === 0 ? (
          <Card>
            <p className="text-center text-gray-400 py-8">
              No tienes tareas pendientes 🎉
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <Card key={task.id} hover>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-100">
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(task.dueDate).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${
                      task.priority === 'high'
                        ? 'bg-danger-500/20 text-danger-400 border border-danger-500/30'
                        : task.priority === 'medium'
                        ? 'bg-warning-500/20 text-warning-400 border border-warning-500/30'
                        : 'bg-accent-500/20 text-accent-400 border border-accent-500/30'
                    }`}
                  >
                    {task.priority === 'high'
                      ? '🔴 Alta'
                      : task.priority === 'medium'
                      ? '🟡 Media'
                      : '🔵 Baja'}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Motivational Quote */}
      <section>
        <Card className="bg-gradient-to-br from-accent-500/10 to-purple-500/10 border-accent-500/20">
          <div className="text-center p-6">
            <p className="text-xl text-gray-100 mb-2 font-medium">
              💡 "El éxito es la suma de pequeños esfuerzos repetidos día tras día"
            </p>
            <p className="text-sm text-gray-400">
              ¡Sigue así, vas por buen camino!
            </p>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default WelcomePage;
