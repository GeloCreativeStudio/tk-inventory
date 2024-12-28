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
import { useState, useEffect } from "react";
import { Image } from "lucide-react";

interface ProductImageFieldProps {
  form: UseFormReturn<ProductFormValues>;
}

const ProductImageField = ({ form }: ProductImageFieldProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    const currentValue = form.getValues("image");
    if (currentValue) {
      setPreview(currentValue);
    }
  }, [form]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        form.setValue("image", result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormField
      control={form.control}
      name="image"
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
                <div className="relative aspect-square rounded-lg border overflow-hidden bg-slate-50">
                  <img
                    src={preview || field.value}
                    alt="Product preview"
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              {!preview && !field.value && (
                <div className="aspect-square rounded-lg border flex items-center justify-center bg-slate-50">
                  <Image className="w-12 h-12 text-slate-300" />
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