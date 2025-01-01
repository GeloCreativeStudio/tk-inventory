import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/types/orders";
import { formatCurrency } from "@/lib/utils/currency";
import { Package2 } from "lucide-react";

interface OrderViewDialogProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OrderViewDialog = ({ order, open, onOpenChange }: OrderViewDialogProps) => {
  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] p-0 max-w-[95vw] w-full lg:max-w-[1000px]">
        <DialogHeader className="px-8 pt-8">
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Package2 className="w-6 h-6" />
            Order Details
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-8rem)]">
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-lg font-medium">{order.customerName}</p>
                  <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                  <p className="text-sm text-muted-foreground">{order.customerPhone}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Order ID:</span>
                    <span className="font-mono">{order.id}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Date:</span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{order.shippingAddress}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          Size: {item.variation.size} / Color: {item.variation.color}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(item.price)} × {item.quantity}
                        </p>
                        <p className="font-medium">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-semibold">Total Amount</span>
                  <span className="text-lg font-semibold">
                    {formatCurrency(order.totalAmount)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default OrderViewDialog;