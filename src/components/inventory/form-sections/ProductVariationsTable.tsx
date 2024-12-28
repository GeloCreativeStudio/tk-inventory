import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductFormValues } from "@/lib/validations/product";
import StockBadge from "../table/StockBadge";

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
    <div className="border rounded-lg">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 whitespace-nowrap">
              <TableHead className="font-semibold whitespace-nowrap">Size</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">Color</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">Stock</TableHead>
              <TableHead className="font-semibold whitespace-nowrap">Images</TableHead>
              <TableHead className="font-semibold text-right whitespace-nowrap">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variations.map((variation, index) => (
              variation.size && variation.color ? (
                <TableRow key={variation.id} className="whitespace-nowrap">
                  <TableCell className="whitespace-nowrap">{variation.size}</TableCell>
                  <TableCell className="whitespace-nowrap">{variation.color}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <StockBadge stock={variation.stock} />
                  </TableCell>
                  <TableCell className="whitespace-nowrap">{variation.images?.length || 0} images</TableCell>
                  <TableCell className="text-right space-x-2 whitespace-nowrap">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(index)}
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(index)}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ) : null
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductVariationsTable;