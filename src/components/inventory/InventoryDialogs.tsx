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
        <DialogContent className="max-h-[90vh] p-0 max-w-[95vw] w-full lg:max-w-[800px]">
          <DialogHeader className="px-8 pt-8">
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[calc(90vh-8rem)] px-8 pb-8">
            <ProductForm onSubmit={handleAddProduct} />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editProduct} onOpenChange={() => setEditProduct(null)}>
        <DialogContent className="max-h-[90vh] p-0 max-w-[95vw] w-full lg:max-w-[800px]">
          <DialogHeader className="px-8 pt-8">
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[calc(90vh-8rem)] px-8 pb-8">
            <ProductForm
              mode="edit"
              initialData={editProduct || undefined}
              onSubmit={handleEditProduct}
            />
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