import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { testOrders } from "@/data/testOrders";
import { Order, OrderStatus } from "@/types/orders";
import OrderViewDialog from "@/components/orders/OrderViewDialog";
import OrderForm from "@/components/orders/OrderForm";
import { processOrder } from "@/lib/utils/orderProcessing";
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
import { useToast } from "@/hooks/use-toast";
import OrdersFilter from "@/components/orders/OrdersFilter";
import OrdersTable from "@/components/orders/OrdersTable";

const Orders = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  const filteredOrders = testOrders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    const orderToUpdate = filteredOrders.find(order => order.id === orderId);
    if (!orderToUpdate) return;

    try {
      const updatedOrder = await processOrder(orderToUpdate, newStatus);
      console.log("Order processed:", updatedOrder);
      toast({
        title: "Order Updated",
        description: `Order status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process order",
        variant: "destructive",
      });
    }
  };

  const handleCreateOrder = (orderData: Order) => {
    console.log("Creating order:", orderData);
    toast({
      title: "Order Created",
      description: "New order has been created successfully",
    });
    setIsFormDialogOpen(false);
  };

  const handleUpdateOrder = (orderData: Order) => {
    console.log("Updating order:", orderData);
    toast({
      title: "Order Updated",
      description: "Order has been updated successfully",
    });
    setIsFormDialogOpen(false);
  };

  const handleDeleteOrder = () => {
    if (!orderToDelete) return;
    
    console.log("Deleting order:", orderToDelete);
    toast({
      title: "Order Deleted",
      description: "Order has been deleted successfully",
    });
    setIsDeleteDialogOpen(false);
    setOrderToDelete(null);
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
            <p className="text-muted-foreground">
              View and manage customer orders
            </p>
          </div>
          <Button onClick={() => setIsFormDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
        </div>

        <Card className="p-6">
          <OrdersFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
          />

          <div className="rounded-md border">
            <OrdersTable
              filteredOrders={filteredOrders}
              onViewOrder={(order) => {
                setSelectedOrder(order);
                setIsViewDialogOpen(true);
              }}
              onEditOrder={(order) => {
                setSelectedOrder(order);
                setIsFormDialogOpen(true);
              }}
              onDeleteOrder={(order) => {
                setOrderToDelete(order);
                setIsDeleteDialogOpen(true);
              }}
              onStatusChange={handleStatusChange}
            />
          </div>
        </Card>
      </div>

      <OrderViewDialog
        order={selectedOrder}
        open={isViewDialogOpen}
        onOpenChange={setIsViewDialogOpen}
      />

      <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedOrder ? "Edit Order" : "Create New Order"}
            </DialogTitle>
          </DialogHeader>
          <OrderForm
            mode={selectedOrder ? "edit" : "create"}
            initialData={selectedOrder || undefined}
            onSubmit={selectedOrder ? handleUpdateOrder : handleCreateOrder}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the order.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteOrder}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default Orders;