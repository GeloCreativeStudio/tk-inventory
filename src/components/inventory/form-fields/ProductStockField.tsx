import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product";

interface ProductStockFieldProps {
  form: UseFormReturn<ProductFormValues>;
  index?: number;
}

const ProductStockField = ({ form, index }: ProductStockFieldProps) => {
  const name = index !== undefined ? `variations.${index}.stock` as const : `variations.0.stock` as const;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Stock</FormLabel>
          <FormControl>
            <Input 
              type="number"
              {...field}
              onChange={(e) => field.onChange(Number(e.target.value))}
              value={field.value || 0}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductStockField;