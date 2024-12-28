import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";
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
  const hasVariations = variations.length > 0 && variations[0].size !== "";

  return (
    <div className="border rounded-lg overflow-hidden">
      {!hasVariations ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="text-muted-foreground mb-2">
            No variations added yet
          </div>
          <div className="text-sm text-muted-foreground/80 mb-4">
            Add your first product variation by clicking the "Add Variation" button above
          </div>
        </div>
      ) : (
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
              <TableRow key={variation.id}>
                <TableCell>{variation.size}</TableCell>
                <TableCell>{variation.color}</TableCell>
                <TableCell>
                  <StockBadge stock={variation.stock} />
                </TableCell>
                <TableCell>{variation.images.length} images</TableCell>
                <TableCell className="text-right space-x-2">
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
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ProductVariationsTable;