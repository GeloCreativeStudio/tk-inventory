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
import OrderForm from "./OrderForm";
import { Order } from "@/types/orders";

interface OrdersDialogsProps {
  open: boolean;
  editOrder: Order | null;
  deleteOrder: Order | null;
  setOpen: (open: boolean) => void;
  setEditOrder: (order: Order | null) => void;
  setDeleteOrder: (order: Order | null) => void;
  handleAddOrder: (data: Partial<Order>) => void;
  handleEditOrder: (data: Partial<Order>) => void;
  handleDeleteConfirm: () => void;
}

const OrdersDialogs = ({
  open,
  editOrder,
  deleteOrder,
  setOpen,
  setEditOrder,
  setDeleteOrder,
  handleAddOrder,
  handleEditOrder,
  handleDeleteConfirm,
}: OrdersDialogsProps) => {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] p-0 max-w-[95vw] w-full lg:max-w-[800px]">
          <DialogHeader className="px-8 pt-8">
            <DialogTitle>Add New Order</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[calc(90vh-8rem)] px-8 pb-8">
            <OrderForm onSubmit={handleAddOrder} />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editOrder} onOpenChange={() => setEditOrder(null)}>
        <DialogContent className="max-h-[90vh] p-0 max-w-[95vw] w-full lg:max-w-[800px]">
          <DialogHeader className="px-8 pt-8">
            <DialogTitle>Edit Order</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[calc(90vh-8rem)] px-8 pb-8">
            <OrderForm
              mode="edit"
              initialData={editOrder || undefined}
              onSubmit={handleEditOrder}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteOrder}
        onOpenChange={() => setDeleteOrder(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              order from the system.
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

export default OrdersDialogs;