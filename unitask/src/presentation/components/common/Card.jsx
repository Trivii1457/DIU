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
  const baseStyles = 'bg-dark-700 rounded-card shadow-dark border border-dark-500 p-4 transition-all duration-200';
  const hoverStyles = hover ? 'hover:bg-dark-600 hover:border-dark-400 cursor-pointer' : '';
  
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
