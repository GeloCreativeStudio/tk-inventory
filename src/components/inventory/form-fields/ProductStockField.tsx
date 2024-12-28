import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/types/inventory";

interface ProductStockFieldProps {
  form: UseFormReturn<ProductFormValues>;
  name: string;
}

const ProductStockField = ({ form, name }: ProductStockFieldProps) => {
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