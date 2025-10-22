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
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          'w-full px-4 py-2 border border-gray-300 rounded-lg transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
          'dark:bg-gray-800 dark:border-gray-600 dark:text-white',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;
