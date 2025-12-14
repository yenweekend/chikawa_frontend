import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormInputField } from "@/components/ui/form-input";
import { NumericInput } from "@/components/ui/numeric-input";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface AddressFormProps<TFormData extends FieldValues> {
  form: UseFormReturn<TFormData>;
  isPending: boolean;
}

export const AddressForm = <TFormData extends FieldValues>({
  form,
  isPending,
}: AddressFormProps<TFormData>) => {
  return (
    <div className="space-y-2">
      <FormField
        control={form.control}
        name={`country` as Path<TFormData>}
        render={({ field }) => (
          <FormInputField
            label="Country"
            required
            showRequiredIcon
            inputProps={{
              placeholder: "Country",
              disabled: isPending,
              ...field,
            }}
          />
        )}
      />
      <FormField
        control={form.control}
        name={`city` as Path<TFormData>}
        render={({ field }) => (
          <FormInputField
            label="City"
            required
            showRequiredIcon
            inputProps={{
              placeholder: "City",
              disabled: isPending,
              ...field,
            }}
          />
        )}
      />
      <FormField
        control={form.control}
        name={`province` as Path<TFormData>}
        render={({ field }) => (
          <FormInputField
            label="Province"
            required
            showRequiredIcon
            inputProps={{
              placeholder: "Province",
              disabled: isPending,
              ...field,
            }}
          />
        )}
      />
      <FormField
        control={form.control}
        name={`locationDetail` as Path<TFormData>}
        render={({ field }) => (
          <FormInputField
            label="Location Detail"
            required
            showRequiredIcon
            inputProps={{
              placeholder: "Location Detail",
              disabled: isPending,
              ...field,
            }}
          />
        )}
      />
      <FormField
        control={form.control}
        name={`recipientName` as Path<TFormData>}
        render={({ field }) => (
          <FormInputField
            label="Recipoent's Name"
            required
            showRequiredIcon
            inputProps={{
              placeholder: "Recipoent's Name",
              disabled: isPending,
              ...field,
            }}
          />
        )}
      />
      <FormField
        control={form.control}
        name={`phoneNumber` as Path<TFormData>}
        render={({ field }) => (
          <NumericInput
            label="Phone number"
            required
            showRequiredIcon
            maxLength={11}
            onChange={field.onChange}
            inputProps={{
              disabled: isPending,
              ...field,
            }}
          />
        )}
      />
      <FormField
        control={form.control}
        name={`isDefaultAddress` as Path<TFormData>}
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-2">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isPending}
                  className="size-5"
                />
              </FormControl>
              <FormLabel>
                <div className="text-base font-medium">
                  Set as default address
                </div>
              </FormLabel>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
