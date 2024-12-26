import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Eye } from "lucide-react";
import { Product } from "@/types/inventory";

interface ProductActionsProps {
  product: Product;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductActions = ({ product, onView, onEdit, onDelete }: ProductActionsProps) => {
  return (
    <div className="space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onView(product)}
        className="h-8 w-8 text-slate-600 hover:text-slate-900"
      >
        <Eye className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit(product)}
        className="h-8 w-8 text-slate-600 hover:text-slate-900"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(product)}
        className="h-8 w-8 text-slate-600 hover:text-red-600"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ProductActions;