import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/lib/validations/product";
import { useState, useEffect } from "react";
import { Image, X, Upload } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ProductVariationImagesFieldProps {
  form: UseFormReturn<ProductFormValues>;
  index: number;
}

const ProductVariationImagesField = ({ form, index }: ProductVariationImagesFieldProps) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const name = `variations.${index}.images` as const;

  useEffect(() => {
    const currentImages = form.getValues(`variations.${index}.images`);
    if (currentImages && currentImages.length > 0) {
      setPreviews(currentImages);
    }
  }, [form, index]);

  const handleFiles = (files: File[]) => {
    const newPreviews: string[] = [];
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          newPreviews.push(result);
          if (newPreviews.length === files.length) {
            const currentImages = form.getValues(`variations.${index}.images`) || [];
            const updatedImages = [...currentImages, ...newPreviews];
            form.setValue(name, updatedImages);
            setPreviews(updatedImages);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const removeImage = (imageIndex: number) => {
    const currentImages = form.getValues(`variations.${index}.images`) || [];
    const updatedImages = currentImages.filter((_, i) => i !== imageIndex);
    form.setValue(name, updatedImages);
    setPreviews(updatedImages);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Variation Images</FormLabel>
          <FormControl>
            <div className="space-y-4">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "border-2 border-dashed rounded-lg p-6 transition-colors",
                  "flex flex-col items-center justify-center gap-2",
                  isDragging ? "border-primary bg-primary/5" : "border-border",
                  "cursor-pointer"
                )}
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground text-center">
                  Drag and drop your images here, or click to select files
                </p>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  multiple
                  id={`file-upload-${index}`}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById(`file-upload-${index}`)?.click()}
                >
                  Choose Files
                </Button>
              </div>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {previews.map((preview, i) => (
                    <div key={i} className="relative group">
                      <div className="relative aspect-square rounded-md overflow-hidden border bg-slate-50">
                        <img
                          src={preview}
                          alt={`Variation preview ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(i)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {previews.length === 0 && (
                    <div className="aspect-square rounded-md border flex items-center justify-center bg-slate-50">
                      <Image className="w-8 h-8 text-slate-300" />
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductVariationImagesField;