import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash } from "lucide-react";
import { Order } from "@/types/orders";
import { formatCurrency } from "@/lib/utils/currency";
import OrderStatusSelect from "./OrderStatusSelect";

interface OrdersTableProps {
  filteredOrders: Order[];
  onViewOrder: (order: Order) => void;
  onEditOrder: (order: Order) => void;
  onDeleteOrder: (order: Order) => void;
  onStatusChange: (orderId: string, newStatus: any) => Promise<void>;
}

const OrdersTable = ({
  filteredOrders,
  onViewOrder,
  onEditOrder,
  onDeleteOrder,
  onStatusChange,
}: OrdersTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredOrders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              <div>
                <div className="font-medium">{order.customerName}</div>
                <div className="text-sm text-muted-foreground">
                  {order.customerEmail}
                </div>
              </div>
            </TableCell>
            <TableCell>{order.items.length} items</TableCell>
            <TableCell>{formatCurrency(order.totalAmount)}</TableCell>
            <TableCell>
              <OrderStatusSelect
                order={order}
                onStatusChange={onStatusChange}
              />
            </TableCell>
            <TableCell>
              {new Date(order.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onViewOrder(order)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEditOrder(order)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteOrder(order)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;