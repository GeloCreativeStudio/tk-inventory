import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { useToast } from "@/hooks/use-toast";
import { Order } from "@/types/orders";
import OrdersTable from "@/components/orders/OrdersTable";
import OrdersFilter from "@/components/orders/OrdersFilter";
import OrderViewDialog from "@/components/orders/OrderViewDialog";
import OrdersHeader from "@/components/orders/OrdersHeader";
import OrdersDialogs from "@/components/orders/OrdersDialogs";
import { testOrders } from "@/data/testOrders";
import { testProducts } from "@/data/testProducts";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>(testOrders);
  const [open, setOpen] = useState(false);
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [deleteOrder, setDeleteOrder] = useState<Order | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const { toast } = useToast();

  // Filter orders based on search query and status
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const searchMatch = searchQuery.trim() === "" || 
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

      const statusMatch = selectedStatus === "all" || 
        order.status.toLowerCase() === selectedStatus.toLowerCase();

      return searchMatch && statusMatch;
    });
  }, [orders, searchQuery, selectedStatus]);

  const handleAddOrder = (data: Order) => {
    setOrders([...orders, data]);
    setOpen(false);
    toast({
      title: "Success",
      description: "Order added successfully",
    });
  };

  const handleEditOrder = (data: Order) => {
    const updatedOrders = orders.map((order) =>
      order.id === data.id ? data : order
    );

    setOrders(updatedOrders);
    setEditOrder(null);
    toast({
      title: "Success",
      description: "Order updated successfully",
    });
  };

  const handleDeleteConfirm = () => {
    if (!deleteOrder) return;

    const filteredOrders = orders.filter(
      (order) => order.id !== deleteOrder.id
    );

    setOrders(filteredOrders);
    setDeleteOrder(null);
    toast({
      title: "Success",
      description: "Order deleted successfully",
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        <OrdersHeader setOpen={setOpen} />

        <OrdersFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />

        <OrdersTable
          filteredOrders={filteredOrders}
          onView={setViewOrder}
          onEdit={setEditOrder}
          onDelete={setDeleteOrder}
        />

        <OrdersDialogs
          open={open}
          editOrder={editOrder}
          deleteOrder={deleteOrder}
          setOpen={setOpen}
          setEditOrder={setEditOrder}
          setDeleteOrder={setDeleteOrder}
          handleAddOrder={handleAddOrder}
          handleEditOrder={handleEditOrder}
          handleDeleteConfirm={handleDeleteConfirm}
        />

        <OrderViewDialog 
          order={viewOrder}
          open={!!viewOrder}
          onOpenChange={() => setViewOrder(null)}
        />
      </div>
    </Layout>
  );
};

export default Orders;