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
import { Product } from "@/types/inventory";
import { sizes } from "@/lib/constants";

interface ProductSizeFieldProps {
  form: UseFormReturn<Partial<Product>>;
}

const ProductSizeField = ({ form }: ProductSizeFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="size"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Size</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
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