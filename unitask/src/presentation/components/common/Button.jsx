import { cn } from '../../../infrastructure/utils/helpers';

/**
 * Componente Button reutilizable
 * @param {Object} props
 * @param {string} props.variant - Variante del botón: 'primary', 'secondary', 'success', 'danger'
 * @param {string} props.size - Tamaño: 'sm', 'md', 'lg'
 * @param {boolean} props.disabled - Si el botón está deshabilitado
 * @param {Function} props.onClick - Función al hacer clic
 * @param {React.ReactNode} props.children - Contenido del botón
 * @param {string} props.className - Clases adicionales
 */
export const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  onClick,
  children,
  className = '',
  type = 'button',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-dark-900 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-500 shadow-md',
    secondary: 'bg-gray-200 dark:bg-dark-500 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-dark-400 focus:ring-gray-400 dark:focus:ring-dark-400 border border-gray-300 dark:border-dark-400',
    success: 'bg-success-500 text-white hover:bg-success-600 focus:ring-success-500 shadow-md',
    danger: 'bg-danger-500 text-white hover:bg-danger-600 focus:ring-danger-500 shadow-md',
    outline: 'border-2 border-accent-500 text-accent-500 dark:text-accent-400 hover:bg-gray-100 dark:hover:bg-dark-700 focus:ring-accent-500',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <button
      type={type}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
