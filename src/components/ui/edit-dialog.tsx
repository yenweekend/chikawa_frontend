"use client";

import { type FieldValues, type UseFormReturn } from "react-hook-form";
import { Trash2 } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/form-utils";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

interface EditDialogProps<T extends FieldValues> {
  open: boolean;
  onOpen: (open: boolean) => void;
  form: UseFormReturn<T>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  buttonType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  formId?: string;
  description?: string;
  children: React.ReactNode;
  submitText?: string;
  className?: string;
  contentClassName?: string;
  formClassName?: string;
  submitButtonVariant?: ButtonVariant;
  disabled?: boolean;
  handleClick?: () => void;
  deleteText?: string;
  onDelete?: () => void;
}

export const EditDialog = <T extends FieldValues>({
  open,
  onOpen,
  form,
  onSubmit,
  title,
  buttonType = "submit",
  formId,
  description,
  children,
  submitText = "Submit",
  className,
  contentClassName,
  formClassName,
  submitButtonVariant = "default",
  disabled,
  handleClick,
  deleteText = "消去",
  onDelete,
}: EditDialogProps<T>) => {
  const { isSubmitting, isValid } = form.formState;

  const handleClose = () => {
    if (!isSubmitting) {
      onOpen(false);
      setTimeout(() => {
        form.reset();
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className={cn(
          "flex max-h-[90vh] max-w-4xl flex-col overflow-hidden rounded-xl px-0 py-8",
          className
        )}
        aria-describedby={undefined}
      >
        <DialogHeader className="px-8">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <Form {...form}>
          <form
            id={formId}
            onSubmit={onSubmit}
            className={cn("space-y-6 overflow-y-auto px-8", formClassName)}
          >
            <div className={cn("space-y-8", contentClassName)}>{children}</div>

            <div className="flex justify-between">
              {onDelete ? (
                <Button
                  type="button"
                  variant="destructive"
                  className="rounded-xl py-5 text-sm text-white"
                  onClick={onDelete}
                  disabled={isSubmitting || disabled}
                >
                  <Trash2 className="size-4" />
                  {deleteText}
                </Button>
              ) : (
                <div />
              )}
              <div className="flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="border-border h-10 rounded-xl text-black shadow-sm hover:text-black"
                >
                  Cancel
                </Button>
                <Button
                  type={buttonType}
                  variant={submitButtonVariant}
                  className="h-10 rounded-xl shadow-sm"
                  disabled={!isValid || isSubmitting || disabled}
                  onClick={handleClick}
                >
                  {submitText}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
