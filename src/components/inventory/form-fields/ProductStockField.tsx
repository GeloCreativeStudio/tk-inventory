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
  const name = index !== undefined ? `variations.${index}.stock` as const : "stock";

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
              value={field.value || 0}
              onChange={(e) => field.onChange(e.target.valueAsNumber)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductStockField;