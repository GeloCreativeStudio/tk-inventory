import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils/currency";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import OrderProductVariationModal from "../OrderProductVariationModal";
import { Product } from "@/types/inventory";
import { OrderItem } from "@/types/orders";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface OrderSummarySectionProps {
  form: UseFormReturn<any>;
  products: Product[];
}

const OrderSummarySection = ({ form, products }: OrderSummarySectionProps) => {
  const [editingItem, setEditingItem] = useState<{
    product: Product;
    item: OrderItem;
    index: number;
  } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const { toast } = useToast();

  const calculateTotal = () => {
    const items = form.watch("items");
    return items.reduce((total: number, item: OrderItem) => 
      total + (item.price * item.quantity), 0
    );
  };

  const handleEdit = (item: OrderItem, index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const product = products?.find(p => p.id === item.productId);
    if (product) {
      setEditingItem({ product, item, index });
    }
  };

  const handleDelete = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setConfirmDelete(index);
  };

  const confirmDeleteItem = () => {
    if (confirmDelete === null) return;
    
    const items = form.getValues("items");
    const updatedItems = items.filter((_: any, i: number) => i !== confirmDelete);
    form.setValue("items", updatedItems);
    setConfirmDelete(null);
    toast({
      title: "Item Removed",
      description: "The item has been removed from the order",
    });
  };

  const handleUpdateItem = (updatedItem: OrderItem) => {
    if (editingItem === null) return;
    
    const items = form.getValues("items");
    const updatedItems = items.map((item: OrderItem, index: number) => 
      index === editingItem.index ? updatedItem : item
    );
    
    form.setValue("items", updatedItems);
    setEditingItem(null);
    toast({
      title: "Item Updated",
      description: "The item has been updated successfully",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {form.watch("items").map((item: OrderItem, index: number) => (
            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="font-medium">{item.productName}</div>
                <div className="text-sm text-muted-foreground">
                  Size: {item.variation.size}, Color: {item.variation.color}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatCurrency(item.price)} x {item.quantity}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="font-medium mr-4">
                  {formatCurrency(item.price * item.quantity)}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => handleEdit(item, index, e)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={(e) => handleDelete(index, e)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between items-center font-medium text-lg">
            <span>Total</span>
            <span>{formatCurrency(calculateTotal())}</span>
          </div>
        </div>
      </CardContent>

      {editingItem && (
        <OrderProductVariationModal
          product={editingItem.product}
          onClose={() => setEditingItem(null)}
          onAdd={handleUpdateItem}
          editingItem={editingItem.item}
        />
      )}

      <AlertDialog open={confirmDelete !== null} onOpenChange={() => setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the item from your order. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteItem}>
              Remove Item
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
};

export default OrderSummarySection;