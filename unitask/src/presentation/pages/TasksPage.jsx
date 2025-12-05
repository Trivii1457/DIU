import { useState, useEffect } from 'react';
import { TaskRepository, SubjectRepository } from '../../data/repositories';
import { Button, Card } from '../components/common';
import { formatDate } from '../../infrastructure/utils/helpers';
import TaskFormModal from '../components/tasks/TaskFormModal';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [filter, setFilter] = useState('all'); // all, pending, completed

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [tasksData, subjectsData] = await Promise.all([
        TaskRepository.getAll(),
        SubjectRepository.getActive()
      ]);

      setTasks(tasksData);
      setSubjects(subjectsData);
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

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      try {
        await TaskRepository.delete(taskId);
        loadData();
      } catch (error) {
        console.error('Error al eliminar tarea:', error);
      }
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  }).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

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
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'all'
                ? 'bg-accent-500 text-white'
                : 'bg-gray-200 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-dark-600'
            }`}
          >
            Todas ({tasks.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'pending'
                ? 'bg-accent-500 text-white'
                : 'bg-gray-200 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-dark-600'
            }`}
          >
            Pendientes ({tasks.filter((t) => !t.completed).length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filter === 'completed'
                ? 'bg-accent-500 text-white'
                : 'bg-gray-200 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-dark-600'
            }`}
          >
            Completadas ({tasks.filter((t) => t.completed).length})
          </button>
        </div>
        <Button onClick={() => setShowTaskForm(true)}>➕ Nueva Tarea</Button>
      </div>

      {/* Tasks List */}
      {filteredTasks.length === 0 ? (
        <Card>
          <p className="text-center text-gray-600 dark:text-gray-400 py-12">
            {filter === 'all' && 'No tienes tareas registradas'}
            {filter === 'pending' && 'No tienes tareas pendientes 🎉'}
            {filter === 'completed' && 'No tienes tareas completadas'}
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task) => {
            const subject = subjects.find((s) => s.id === task.subjectId);
            const isOverdue =
              !task.completed && new Date(task.dueDate) < new Date();

            return (
              <Card key={task.id} hover>
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task.id, task.completed)}
                    className="mt-1 w-5 h-5 text-accent-500 bg-gray-100 dark:bg-dark-600 border-gray-300 dark:border-dark-400 rounded focus:ring-accent-500 focus:ring-offset-white dark:focus:ring-offset-dark-900"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3
                          className={`font-semibold text-lg ${
                            task.completed
                              ? 'line-through text-gray-400 dark:text-gray-500'
                              : 'text-gray-900 dark:text-gray-100'
                          }`}
                        >
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {task.description}
                          </p>
                        )}
                        <div className="flex items-center gap-3 mt-3">
                          {subject && (
                            <span
                              className="text-xs px-2 py-1 rounded flex items-center gap-1"
                              style={{
                                backgroundColor: `${subject.color}20`,
                                color: subject.color,
                                border: `1px solid ${subject.color}40`
                              }}
                            >
                              {subject.icon} {subject.name}
                            </span>
                          )}
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              isOverdue
                                ? 'bg-danger-500/20 text-danger-400 border border-danger-500/30'
                                : 'text-gray-500'
                            }`}
                          >
                            📅 {formatDate(task.dueDate)}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
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
                      </div>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-gray-400 hover:text-danger-400 transition-colors p-2"
                        title="Eliminar tarea"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Task Form Modal */}
      <TaskFormModal
        isOpen={showTaskForm}
        onClose={() => setShowTaskForm(false)}
        onTaskCreated={loadData}
        subjects={subjects}
      />
    </div>
  );
};

export default TasksPage;
