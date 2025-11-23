import { cn } from '../../../infrastructure/utils/helpers';

/**
 * Componente Textarea reutilizable
 */
export const Textarea = ({ 
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  rows = 4,
  className = '',
  ...props 
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {label}
          {required && <span className="text-danger-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={cn(
          'w-full px-4 py-2 bg-dark-800 border border-dark-500 rounded-lg transition-colors resize-none text-gray-100',
          'focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-accent-500',
          'placeholder-gray-500',
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

export default Textarea;
