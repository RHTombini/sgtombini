export { Sidebar } from './Sidebar';
export type { SidebarModule, SidebarProps } from './Sidebar';

export { Button } from './Button';
export type { ButtonProps } from './Button';

export { Input } from './Input';
export type { InputProps } from './Input';

export { Table } from './Table';
export type { TableProps, Column } from './Table';

export { Badge } from './Badge';
export type { BadgeProps, BadgeVariant } from './Badge';

export { Modal } from './Modal';
export type { ModalProps } from './Modal';

export { Toast } from './Toast';
export type { ToastProps, ToastVariant } from './Toast';

export { Tooltip } from './Tooltip';
export type { TooltipProps } from './Tooltip';

export const designSystemStyles = {
  tokens: '@sgt/design-system/tokens.css',
  base: '@sgt/design-system/base.css',
  components: '@sgt/design-system/components.css',
  print: '@sgt/design-system/print.css',
} as const;
