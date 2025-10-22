import { cn, getPriorityColor, getPriorityLabel } from '../../../infrastructure/utils/helpers';

/**
 * Badge de prioridad
 */
export const PriorityBadge = ({ priority, className = '' }) => {
  return (
    <span className={cn('priority-badge', getPriorityColor(priority), className)}>
      {getPriorityLabel(priority)}
    </span>
  );
};

export default PriorityBadge;
