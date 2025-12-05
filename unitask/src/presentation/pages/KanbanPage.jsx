import { useState, useEffect } from 'react';
import { TaskRepository, SubjectRepository } from '../../data/repositories';
import { Card, Button } from '../components/common';
import { useToast } from '../../context/ToastContext';
import TaskFormModal from '../components/tasks/TaskFormModal';

const KanbanPage = () => {
  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);
  const { success, error } = useToast();

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
    } catch (err) {
      console.error('Error al cargar datos:', err);
      error('Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { id: 'pending', title: '📋 Pendientes', status: 'pending', color: 'warning' },
    { id: 'in-progress', title: '🔄 En Proceso', status: 'in-progress', color: 'accent' },
    { id: 'completed', title: '✅ Completadas', status: 'completed', color: 'success' }
  ];

  const getTasksByStatus = (status) => {
    return tasks.filter(task => {
      if (status === 'completed') return task.completed;
      if (status === 'in-progress') return !task.completed && task.status === 'in-progress';
      return !task.completed && task.status !== 'in-progress';
    });
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, targetStatus) => {
    e.preventDefault();
    if (!draggedTask) return;

    try {
      let updateData = {};
      
      if (targetStatus === 'completed') {
        await TaskRepository.markAsCompleted(draggedTask.id);
        updateData = { completed: true, status: 'completed' };
        success('¡Tarea completada! 🎉');
      } else if (targetStatus === 'in-progress') {
        await TaskRepository.update(draggedTask.id, { status: 'in-progress', completed: false });
        updateData = { completed: false, status: 'in-progress' };
        success('Tarea movida a "En Proceso"');
      } else {
        await TaskRepository.update(draggedTask.id, { status: 'pending', completed: false });
        updateData = { completed: false, status: 'pending' };
        success('Tarea movida a "Pendientes"');
      }

      setTasks(prev => prev.map(t => 
        t.id === draggedTask.id ? { ...t, ...updateData } : t
      ));
    } catch (err) {
      console.error('Error al actualizar tarea:', err);
      error('Error al mover la tarea');
    }

    setDraggedTask(null);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      try {
        await TaskRepository.delete(taskId);
        setTasks(prev => prev.filter(t => t.id !== taskId));
        success('Tarea eliminada correctamente');
      } catch (err) {
        console.error('Error al eliminar tarea:', err);
        error('Error al eliminar la tarea');
      }
    }
  };

  const getSubject = (subjectId) => {
    return subjects.find(s => s.id === subjectId);
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      high: 'bg-danger-500/20 text-danger-400 border-danger-500/30',
      medium: 'bg-warning-500/20 text-warning-400 border-warning-500/30',
      low: 'bg-accent-500/20 text-accent-400 border-accent-500/30'
    };
    const labels = {
      high: '🔴 Alta',
      medium: '🟡 Media',
      low: '🔵 Baja'
    };
    return (
      <span className={`text-xs px-2 py-0.5 rounded border ${styles[priority]}`}>
        {labels[priority]}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Cargando tablero...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            📊 Tablero Tareas
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Arrastra y suelta las tareas para cambiar su estado
          </p>
        </div>
        <Button onClick={() => setShowTaskForm(true)}>
          ➕ Nueva Tarea
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(column => (
          <div
            key={column.id}
            className="flex flex-col"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.status)}
          >
            {/* Column Header */}
            <div className={`flex items-center justify-between p-4 rounded-t-xl bg-${column.color}-500/10 border border-${column.color}-500/20`}>
              <h2 className="font-semibold text-gray-900 dark:text-gray-100">
                {column.title}
              </h2>
              <span className={`text-sm font-bold px-2 py-1 rounded-full bg-${column.color}-500/20 text-${column.color}-500 dark:text-${column.color}-400`}>
                {getTasksByStatus(column.status).length}
              </span>
            </div>

            {/* Column Body */}
            <div className="flex-1 min-h-[400px] p-3 bg-gray-100 dark:bg-dark-800 rounded-b-xl border border-t-0 border-gray-200 dark:border-dark-700 space-y-3">
              {getTasksByStatus(column.status).length === 0 ? (
                <div className="flex items-center justify-center h-32 text-gray-400 dark:text-gray-500 text-sm">
                  Sin tareas
                </div>
              ) : (
                getTasksByStatus(column.status).map(task => {
                  const subject = getSubject(task.subjectId);
                  const isOverdue = !task.completed && new Date(task.dueDate) < new Date();

                  return (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, task)}
                      className={`bg-white dark:bg-dark-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-dark-600 cursor-grab active:cursor-grabbing hover:shadow-md transition-all ${
                        draggedTask?.id === task.id ? 'opacity-50' : ''
                      }`}
                    >
                      {/* Task Title */}
                      <h3 className={`font-medium mb-2 ${task.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}>
                        {task.title}
                      </h3>

                      {/* Task Description */}
                      {task.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                          {task.description}
                        </p>
                      )}

                      {/* Task Meta */}
                      <div className="flex flex-wrap gap-2 mb-3">
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
                        {getPriorityBadge(task.priority)}
                      </div>

                      {/* Due Date & Actions */}
                      <div className="flex items-center justify-between">
                        <span className={`text-xs ${isOverdue ? 'text-danger-500' : 'text-gray-500 dark:text-gray-400'}`}>
                          📅 {new Date(task.dueDate).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'short'
                          })}
                          {isOverdue && ' (Vencida)'}
                        </span>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-gray-400 hover:text-danger-500 transition-colors p-1"
                          title="Eliminar"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Task Form Modal */}
      <TaskFormModal
        isOpen={showTaskForm}
        onClose={() => setShowTaskForm(false)}
        onTaskCreated={() => {
          loadData();
          success('¡Tarea creada exitosamente!');
        }}
        subjects={subjects}
      />
    </div>
  );
};

export default KanbanPage;
