'use client';

import React from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface AlertDialogConfig {
  open: boolean;
  title: React.ReactNode;
  children?: React.ReactNode;
  description?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  isLoading?: boolean;
  className?: string;
  cancelClassName?: string;
  confirmClassName?: string;
  footerClassName?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  formId?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

interface ConfirmAlertDialogProps extends AlertDialogConfig {
  onOpenChange: (open: boolean) => void;
}

export const ConfirmAlertDialog = ({
  open,
  onOpenChange,
  title,
  children,
  description,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  isLoading = false,
  className,
  cancelClassName,
  confirmClassName,
  footerClassName,
  type,
  formId,
  onCancel,
  onConfirm,
}: ConfirmAlertDialogProps) => {
  const handleCancel = () => {
    if (!isLoading) {
      onCancel?.();
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className={className}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        {children}
        <AlertDialogFooter className={footerClassName}>
          <AlertDialogCancel
            className={cancelClassName}
            onClick={handleCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            className={confirmClassName}
            onClick={onConfirm}
            disabled={isLoading}
            form={formId}
            type={type}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
