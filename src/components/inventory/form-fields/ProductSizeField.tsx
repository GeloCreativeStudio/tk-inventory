import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product";
import { sizes } from "@/lib/constants";

interface ProductSizeFieldProps {
  form: UseFormReturn<ProductFormValues>;
  index?: number;
}

const ProductSizeField = ({ form, index }: ProductSizeFieldProps) => {
  const name = index !== undefined ? `variations.${index}.size` as const : "size";

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Size</FormLabel>
          <Select onValueChange={field.onChange} value={field.value?.toString() || ""}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {sizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductSizeField;