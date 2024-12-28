import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product";
import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { sizes, colors } from "@/lib/constants";

interface ProductVariationsFieldProps {
  form: UseFormReturn<ProductFormValues>;
}

const ProductVariationsField = ({ form }: ProductVariationsFieldProps) => {
  const variations = form.watch("variations") || [];

  const addVariation = () => {
    form.setValue("variations", [
      ...variations,
      { id: uuidv4(), size: "", color: "", stock: 0 },
    ]);
  };

  const removeVariation = (index: number) => {
    const newVariations = variations.filter((_, i) => i !== index);
    form.setValue("variations", newVariations);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel>Product Variations</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addVariation}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" /> Add Variation
        </Button>
      </div>

      {variations.map((_, index) => (
        <div key={index} className="grid grid-cols-4 gap-4 items-start">
          <FormField
            control={form.control}
            name={`variations.${index}.size`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Size</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Size" />
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

          <FormField
            control={form.control}
            name={`variations.${index}.color`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Color</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Color" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {colors.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`variations.${index}.stock`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Stock</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    placeholder="Stock"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => removeVariation(index)}
            className="mt-2"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default ProductVariationsField;