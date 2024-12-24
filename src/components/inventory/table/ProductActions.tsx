import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Product } from "@/types/inventory";

interface ProductActionsProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductActions = ({ product, onEdit, onDelete }: ProductActionsProps) => {
  return (
    <div className="space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onEdit(product)}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onDelete(product)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ProductActions;