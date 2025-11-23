import { useState } from 'react';
import { Modal, Input, Textarea, Button } from '../common';
import { TaskRepository } from '../../../data/repositories';

export const TaskFormModal = ({ isOpen, onClose, onTaskCreated, subjects }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subjectId: '',
    priority: 'medium',
    dueDate: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'El título es requerido';
    if (!formData.subjectId) newErrors.subjectId = 'Selecciona una materia';
    if (!formData.dueDate) newErrors.dueDate = 'La fecha es requerida';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      await TaskRepository.create({
        ...formData,
        dueDate: new Date(formData.dueDate),
        completed: false,
      });
      
      setFormData({
        title: '',
        description: '',
        subjectId: '',
        priority: 'medium',
        dueDate: '',
      });
      setErrors({});
      onTaskCreated();
      onClose();
    } catch (error) {
      console.error('Error al crear tarea:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="➕ Nueva Tarea" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Título"
          placeholder="Nombre de la tarea"
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          error={errors.title}
          required
        />

        <Textarea
          label="Descripción"
          placeholder="Describe la tarea..."
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows={3}
        />

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Materia <span className="text-danger-500 ml-1">*</span>
          </label>
          <select
            value={formData.subjectId}
            onChange={(e) => handleChange('subjectId', parseInt(e.target.value))}
            className="w-full px-4 py-2 bg-dark-800 border border-dark-500 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
          >
            <option value="">Selecciona una materia</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          {errors.subjectId && (
            <p className="mt-1 text-sm text-danger-500">{errors.subjectId}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Prioridad
          </label>
          <select
            value={formData.priority}
            onChange={(e) => handleChange('priority', e.target.value)}
            className="w-full px-4 py-2 bg-dark-800 border border-dark-500 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500"
          >
            <option value="low">🔵 Baja</option>
            <option value="medium">🟡 Media</option>
            <option value="high">🔴 Alta</option>
          </select>
        </div>

        <Input
          label="Fecha límite"
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleChange('dueDate', e.target.value)}
          error={errors.dueDate}
          required
        />

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="flex-1"
          >
            {loading ? 'Creando...' : 'Crear Tarea'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskFormModal;
