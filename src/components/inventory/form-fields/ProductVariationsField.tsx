import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/types/inventory";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { sizes, colors } from "@/lib/constants";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface ProductVariationsFieldProps {
  form: UseFormReturn<ProductFormValues>;
}

const ProductVariationsField = ({ form }: ProductVariationsFieldProps) => {
  const [newSize, setNewSize] = useState("");
  const [newColor, setNewColor] = useState("");
  const [newStock, setNewStock] = useState<number>(0);

  const variations = form.watch("variations") || [];

  const handleAddVariation = () => {
    if (!newSize || !newColor || newStock < 0) return;

    // Check if variation already exists
    const exists = variations.some(
      (v) => v.size === newSize && v.color === newColor
    );

    if (exists) {
      form.setError("variations", {
        message: "This size and color combination already exists",
      });
      return;
    }

    const newVariation: ProductVariation = {
      id: crypto.randomUUID(),
      size: newSize,
      color: newColor,
      stock: newStock,
    };

    form.setValue("variations", [...variations, newVariation]);
    
    // Reset inputs
    setNewSize("");
    setNewColor("");
    setNewStock(0);
  };

  const handleRemoveVariation = (variationId: string) => {
    const updatedVariations = variations.filter((v) => v.id !== variationId);
    form.setValue("variations", updatedVariations);
  };

  return (
    <FormField
      control={form.control}
      name="variations"
      render={() => (
        <FormItem className="space-y-4">
          <FormLabel>Product Variations</FormLabel>
          
          <div className="flex gap-4 items-end">
            <Select value={newSize} onValueChange={setNewSize}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                {sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={newColor} onValueChange={setNewColor}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                {colors.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="number"
              placeholder="Stock"
              className="w-[120px]"
              value={newStock}
              onChange={(e) => setNewStock(parseInt(e.target.value) || 0)}
              min={0}
            />

            <Button 
              type="button" 
              variant="secondary"
              onClick={handleAddVariation}
            >
              Add Variation
            </Button>
          </div>

          {variations.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Size</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {variations.map((variation) => (
                  <TableRow key={variation.id}>
                    <TableCell>{variation.size}</TableCell>
                    <TableCell>{variation.color}</TableCell>
                    <TableCell>{variation.stock}</TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveVariation(variation.id)}
                        className="h-8 w-8 text-slate-600 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ProductVariationsField;