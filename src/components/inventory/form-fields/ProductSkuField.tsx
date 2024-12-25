import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Product } from "@/types/inventory";

interface ProductSkuFieldProps {
  form: UseFormReturn<Partial<Product>>;
}

const ProductSkuField = ({ form }: ProductSkuFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="sku"
      render={({ field }) => (
        <FormItem>
          <FormLabel>SKU</FormLabel>
          <FormControl>
            <Input {...field} placeholder="Enter SKU" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductSkuField;