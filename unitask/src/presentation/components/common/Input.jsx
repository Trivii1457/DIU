import { cn } from '../../../infrastructure/utils/helpers';

/**
 * Componente Input reutilizable
 * @param {Object} props
 * @param {string} props.label - Etiqueta del input
 * @param {string} props.type - Tipo de input
 * @param {string} props.placeholder - Placeholder
 * @param {string} props.value - Valor del input
 * @param {Function} props.onChange - Función onChange
 * @param {string} props.error - Mensaje de error
 * @param {boolean} props.required - Si es requerido
 * @param {string} props.className - Clases adicionales
 */
export const Input = ({ 
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          'w-full px-4 py-2 bg-gray-50 dark:bg-dark-800 border border-gray-300 dark:border-dark-500 rounded-lg transition-colors text-gray-900 dark:text-gray-100',
          'focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500',
          'placeholder-gray-400 dark:placeholder-gray-500',
          error && 'border-danger-500 focus:ring-danger-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-danger-500">{error}</p>
      )}
    </div>
  );
};

export default Input;
