import { useFieldArray, UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ProductFormValues } from "@/lib/validations/product";
import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import ProductSizeField from "./ProductSizeField";
import ProductColorField from "./ProductColorField";
import ProductStockField from "./ProductStockField";

interface ProductVariationsFieldProps {
  form: UseFormReturn<ProductFormValues>;
}

const ProductVariationsField = ({ form }: ProductVariationsFieldProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variations",
  });

  const addVariation = () => {
    append({
      id: uuidv4(),
      size: "",
      color: "",
      stock: 0,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <FormLabel className="text-base">Product Variations</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addVariation}
          className="h-8"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Variation
        </Button>
      </div>

      <FormField
        control={form.control}
        name="variations"
        render={() => (
          <FormItem>
            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex items-start space-x-4 rounded-lg border p-4 shadow-sm"
                >
                  <div className="grid flex-1 gap-4 md:grid-cols-3">
                    <ProductSizeField
                      form={form}
                      name={`variations.${index}.size`}
                    />
                    <ProductColorField
                      form={form}
                      name={`variations.${index}.color`}
                    />
                    <ProductStockField
                      form={form}
                      name={`variations.${index}.stock`}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                    className="h-8 w-8 flex-shrink-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductVariationsField;