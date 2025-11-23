import { useState, useEffect } from 'react';
import { TaskRepository } from '../../data/repositories';
import { Card } from '../components/common';

const CalendarPage = () => {
  const [tasks, setTasks] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await TaskRepository.getAll();
      setTasks(data);
    } catch (error) {
      console.error('Error al cargar tareas:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const getTasksForDate = (date) => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-danger-500';
      case 'medium':
        return 'bg-warning-500';
      case 'low':
        return 'bg-accent-500';
      default:
        return 'bg-gray-500';
    }
  };

  const changeMonth = (delta) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + delta, 1)
    );
  };

  const { daysInMonth, startingDayOfWeek, year, month } =
    getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long' });

  const renderCalendar = () => {
    const days = [];
    const totalCells = Math.ceil((daysInMonth + startingDayOfWeek) / 7) * 7;

    for (let i = 0; i < totalCells; i++) {
      const dayNumber = i - startingDayOfWeek + 1;
      const isValidDay = dayNumber > 0 && dayNumber <= daysInMonth;
      const date = isValidDay ? new Date(year, month, dayNumber) : null;
      const dayTasks = date ? getTasksForDate(date) : [];
      const isToday =
        date &&
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear();

      days.push(
        <div
          key={i}
          className={`min-h-[120px] border border-dark-700 p-2 ${
            !isValidDay ? 'bg-dark-800/30' : 'bg-dark-800 hover:bg-dark-700'
          } transition-colors ${isToday ? 'ring-2 ring-accent-500' : ''}`}
        >
          {isValidDay && (
            <>
              <div
                className={`text-sm font-semibold mb-2 ${
                  isToday ? 'text-accent-400' : 'text-gray-300'
                }`}
              >
                {dayNumber}
              </div>
              <div className="space-y-1">
                {dayTasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className={`text-xs px-2 py-1 rounded truncate ${getPriorityColor(
                      task.priority
                    )} text-white`}
                    title={task.title}
                  >
                    {task.title}
                  </div>
                ))}
                {dayTasks.length > 3 && (
                  <div className="text-xs text-gray-400 px-2">
                    +{dayTasks.length - 3} más
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      );
    }

    return days;
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

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-100 mb-2">
          📅 Calendario
        </h1>
        <p className="text-gray-400">
          Visualiza tus tareas organizadas por fecha
        </p>
      </div>

      {/* Calendar Controls */}
      <Card className="mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => changeMonth(-1)}
            className="px-4 py-2 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600 transition-colors"
          >
            ← Anterior
          </button>
          <h2 className="text-2xl font-bold text-gray-100 capitalize">
            {monthName} {year}
          </h2>
          <button
            onClick={() => changeMonth(1)}
            className="px-4 py-2 bg-dark-700 text-gray-300 rounded-lg hover:bg-dark-600 transition-colors"
          >
            Siguiente →
          </button>
        </div>
      </Card>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-danger-500 rounded"></div>
          <span className="text-sm text-gray-400">Alta prioridad</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-warning-500 rounded"></div>
          <span className="text-sm text-gray-400">Media prioridad</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-accent-500 rounded"></div>
          <span className="text-sm text-gray-400">Baja prioridad</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card className="p-4">
        {/* Week days header */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
            <div
              key={day}
              className="text-center font-semibold text-gray-400 py-2"
            >
              {day}
            </div>
          ))}
        </div>
        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>
      </Card>

      {/* Tasks Summary */}
      <Card className="mt-6">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">
          Resumen de tareas este mes
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-accent-400">
              {
                tasks.filter(
                  (t) =>
                    new Date(t.dueDate).getMonth() === month &&
                    new Date(t.dueDate).getFullYear() === year
                ).length
              }
            </p>
            <p className="text-sm text-gray-400 mt-1">Total</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-success-400">
              {
                tasks.filter(
                  (t) =>
                    new Date(t.dueDate).getMonth() === month &&
                    new Date(t.dueDate).getFullYear() === year &&
                    t.completed
                ).length
              }
            </p>
            <p className="text-sm text-gray-400 mt-1">Completadas</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-warning-400">
              {
                tasks.filter(
                  (t) =>
                    new Date(t.dueDate).getMonth() === month &&
                    new Date(t.dueDate).getFullYear() === year &&
                    !t.completed
                ).length
              }
            </p>
            <p className="text-sm text-gray-400 mt-1">Pendientes</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CalendarPage;
