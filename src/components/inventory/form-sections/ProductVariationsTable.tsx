import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductFormValues } from "@/lib/validations/product";
import StockBadge from "../table/StockBadge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface ProductVariationsTableProps {
  variations: ProductFormValues['variations'];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const ProductVariationsTable = ({ 
  variations, 
  onEdit, 
  onDelete 
}: ProductVariationsTableProps) => {
  const hasValidVariations = variations?.some(v => v.size && v.color);

  if (!hasValidVariations) {
    return (
      <div className="border rounded-lg">
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="text-muted-foreground mb-2">
            No variations added yet
          </div>
          <div className="text-sm text-muted-foreground/80 mb-4">
            Add your first product variation by clicking the "Add Variation" button above
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <ScrollArea className="w-full whitespace-nowrap rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Size</TableHead>
              <TableHead className="font-semibold">Color</TableHead>
              <TableHead className="font-semibold">Stock</TableHead>
              <TableHead className="font-semibold">Images</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variations.map((variation, index) => (
              variation.size && variation.color ? (
                <TableRow key={variation.id}>
                  <TableCell>{variation.size}</TableCell>
                  <TableCell>{variation.color}</TableCell>
                  <TableCell>
                    <StockBadge stock={variation.stock} />
                  </TableCell>
                  <TableCell>{variation.images?.length || 0} images</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(index)}
                      className="h-8 w-8 text-slate-600 hover:text-white hover:bg-slate-900"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(index)}
                      className="h-8 w-8 text-slate-600 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ) : null
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default ProductVariationsTable;