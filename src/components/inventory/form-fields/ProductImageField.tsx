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
import { useState } from "react";
import { Image } from "lucide-react";

interface ProductImageFieldProps {
  form: UseFormReturn<Partial<Product>>;
}

const ProductImageField = ({ form }: ProductImageFieldProps) => {
  const [preview, setPreview] = useState<string | null>(null);

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
      render={({ field: { value, ...field } }) => (
        <FormItem>
          <FormLabel>Product Image</FormLabel>
          <FormControl>
            <div className="space-y-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                {...field}
              />
              {(preview || value) && (
                <div className="relative w-32 h-32 border rounded-md overflow-hidden">
                  <img
                    src={preview || value}
                    alt="Product preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {!preview && !value && (
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