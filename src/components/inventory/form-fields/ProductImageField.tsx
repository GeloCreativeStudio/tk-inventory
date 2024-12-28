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
import { useState, useEffect } from "react";
import { Image } from "lucide-react";

interface ProductImageFieldProps {
  form: UseFormReturn<ProductFormValues>;
  index?: number;
}

const ProductImageField = ({ form, index }: ProductImageFieldProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fieldName = index !== undefined ? `variations.${index}.images.0` : 'variations.0.images.0';

  // Update preview when form value changes
  useEffect(() => {
    const currentValue = form.getValues(fieldName);
    if (currentValue) {
      setPreview(currentValue);
    }
  }, [form, fieldName]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        form.setValue(fieldName, result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Product Image</FormLabel>
          <FormControl>
            <div className="space-y-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="cursor-pointer"
              />
              {(preview || field.value) && (
                <div className="relative w-32 h-32 border rounded-md overflow-hidden">
                  <img
                    src={preview || field.value}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {!preview && !field.value && (
                <div className="w-32 h-32 border rounded-md flex items-center justify-center bg-slate-50">
                  <Image className="w-8 h-8 text-slate-300" />
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductImageField;