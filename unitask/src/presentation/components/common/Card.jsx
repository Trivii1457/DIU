import { cn } from '../../../infrastructure/utils/helpers';

/**
 * Componente Card reutilizable
 * @param {Object} props
 * @param {React.ReactNode} props.children - Contenido de la tarjeta
 * @param {string} props.className - Clases adicionales
 * @param {Function} props.onClick - Función al hacer clic
 * @param {boolean} props.hover - Si debe tener efecto hover
 */
export const Card = ({ 
  children, 
  className = '', 
  onClick,
  hover = false,
  ...props 
}) => {
  const baseStyles = 'bg-surface-light dark:bg-surface-dark rounded-card shadow-soft p-4 transition-all duration-200';
  const hoverStyles = hover ? 'hover:shadow-medium cursor-pointer' : '';
  
  return (
    <div
      className={cn(baseStyles, hoverStyles, className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
