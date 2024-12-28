import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import ProductForm from "./ProductForm";
import { Product } from "@/types/inventory";

interface InventoryDialogsProps {
  open: boolean;
  editProduct: Product | null;
  deleteProduct: Product | null;
  setOpen: (open: boolean) => void;
  setEditProduct: (product: Product | null) => void;
  setDeleteProduct: (product: Product | null) => void;
  handleAddProduct: (data: Partial<Product>) => void;
  handleEditProduct: (data: Partial<Product>) => void;
  handleDeleteConfirm: () => void;
}

const InventoryDialogs = ({
  open,
  editProduct,
  deleteProduct,
  setOpen,
  setEditProduct,
  setDeleteProduct,
  handleAddProduct,
  handleEditProduct,
  handleDeleteConfirm,
}: InventoryDialogsProps) => {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              {editProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-full max-h-[calc(90vh-8rem)]">
            <div className="p-6">
              <ProductForm
                mode={editProduct ? "edit" : "create"}
                initialData={editProduct || undefined}
                onSubmit={editProduct ? handleEditProduct : handleAddProduct}
              />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteProduct}
        onOpenChange={() => setDeleteProduct(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product from your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default InventoryDialogs;