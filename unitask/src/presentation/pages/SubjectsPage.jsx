import { useState, useEffect } from 'react';
import { SubjectRepository } from '../../data/repositories';
import { Card, Button, Input, Modal } from '../components/common';
import { useToast } from '../../context/ToastContext';

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    color: '#2563EB',
    icon: '📚'
  });
  const [errors, setErrors] = useState({});
  const { success, error: showError } = useToast();

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      setLoading(true);
      const data = await SubjectRepository.getActive();
      setSubjects(data);
    } catch (err) {
      console.error('Error al cargar materias:', err);
      showError('Error al cargar las materias');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (subject = null) => {
    if (subject) {
      setEditingSubject(subject);
      setFormData({
        name: subject.name,
        color: subject.color,
        icon: subject.icon || '📚'
      });
    } else {
      setEditingSubject(null);
      setFormData({
        name: '',
        color: '#2563EB',
        icon: '📚'
      });
    }
    setShowModal(true);
    setErrors({});
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingSubject(null);
    setFormData({ name: '', color: '#2563EB', icon: '📚' });
    setErrors({});
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (editingSubject) {
        await SubjectRepository.update(editingSubject.id, {
          name: formData.name,
          color: formData.color,
          icon: formData.icon
        });
        success('Materia actualizada correctamente');
      } else {
        await SubjectRepository.create({
          name: formData.name,
          color: formData.color,
          icon: formData.icon,
          archived: false
        });
        success('¡Materia creada exitosamente!');
      }
      loadSubjects();
      handleCloseModal();
    } catch (err) {
      console.error('Error al guardar materia:', err);
      showError('Error al guardar la materia');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta materia? Todas las tareas asociadas también se eliminarán.')) {
      try {
        await SubjectRepository.delete(id);
        loadSubjects();
        success('Materia eliminada correctamente');
      } catch (err) {
        console.error('Error al eliminar materia:', err);
        showError('Error al eliminar la materia');
      }
    }
  };

  const iconOptions = ['📚', '📖', '📝', '🔬', '🎨', '💻', '🧮', '🌍', '⚙️', '🎵', '🏃', '🎭'];
  const colorOptions = [
    { name: 'Azul', value: '#2563EB' },
    { name: 'Verde', value: '#16a34a' },
    { name: 'Rojo', value: '#dc2626' },
    { name: 'Morado', value: '#9333ea' },
    { name: 'Naranja', value: '#ea580c' },
    { name: 'Rosa', value: '#db2777' },
    { name: 'Cyan', value: '#0891b2' },
    { name: 'Amarillo', value: '#ca8a04' }
  ];

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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            📚 Materias
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Administra tus materias académicas
          </p>
        </div>
        <Button onClick={() => handleOpenModal()}>
          ➕ Nueva Materia
        </Button>
      </div>

      {/* Subjects Grid */}
      {subjects.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              No tienes materias registradas
            </p>
            <Button onClick={() => handleOpenModal()}>
              Crear primera materia
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Card key={subject.id} hover>
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-3xl shadow-lg flex-shrink-0"
                  style={{ backgroundColor: subject.color }}
                >
                  {subject.icon || '📚'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-1 truncate">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Creada el {new Date(subject.createdAt).toLocaleDateString('es-ES')}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleOpenModal(subject)}
                      className="text-xs px-3 py-1 bg-accent-500/20 text-accent-400 rounded hover:bg-accent-500/30 transition-colors"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => handleDelete(subject.id)}
                      className="text-xs px-3 py-1 bg-danger-500/20 text-danger-400 rounded hover:bg-danger-500/30 transition-colors"
                    >
                      🗑️ Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingSubject ? '✏️ Editar Materia' : '➕ Nueva Materia'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nombre de la materia"
            placeholder="Ej: Diseño de Interfaces"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            error={errors.name}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Ícono
            </label>
            <div className="grid grid-cols-6 gap-2">
              {iconOptions.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => handleChange('icon', icon)}
                  className={`p-3 text-2xl rounded-lg border-2 transition-all ${
                    formData.icon === icon
                      ? 'border-accent-500 bg-accent-500/20'
                      : 'border-gray-200 dark:border-dark-600 hover:border-gray-300 dark:hover:border-dark-500'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Color
            </label>
            <div className="grid grid-cols-4 gap-2">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => handleChange('color', color.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.color === color.value
                      ? 'border-accent-500 scale-105'
                      : 'border-gray-200 dark:border-dark-600 hover:border-gray-300 dark:hover:border-dark-500'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  <span className="text-white text-xs font-semibold">
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseModal}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              {editingSubject ? 'Guardar Cambios' : 'Crear Materia'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SubjectsPage;
