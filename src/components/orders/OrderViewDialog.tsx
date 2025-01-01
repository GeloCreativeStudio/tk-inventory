import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Order } from "@/types/orders";
import { formatCurrency } from "@/lib/utils/currency";
import { Package2, MapPin, Truck, Clock, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface OrderViewDialogProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const OrderViewDialog = ({ order, open, onOpenChange }: OrderViewDialogProps) => {
  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
      case "processing":
        return "bg-blue-500/10 text-blue-500";
      case "completed":
        return "bg-green-500/10 text-green-500";
      case "cancelled":
        return "bg-red-500/10 text-red-500";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(order.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-[95vw] w-full lg:max-w-[1000px]">
        <ScrollArea className="max-h-[calc(90vh-2rem)] px-6">
          <div className="space-y-6 py-6">
            {/* Header Section */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Order ID</p>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-semibold">#{order.id}</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleCopyId}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className={cn(
                "px-4 py-1 rounded-full text-sm font-medium",
                getStatusColor(order.status)
              )}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </div>
            </div>

            {/* Shipping Progress Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Package2 className="h-5 w-5 mt-1" />
                  <div className="flex-1 space-y-4">
                    <p className="font-medium">Package is on the way!</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{order.shippingAddress}</span>
                      </div>
                    </div>

                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ 
                          width: order.status === 'completed' ? '100%' : 
                                 order.status === 'processing' ? '50%' : '25%' 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delivery Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    <h3 className="font-medium">Estimated Arrival</h3>
                  </div>
                  <p className="text-2xl font-semibold">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <h3 className="font-medium">Processing Time</h3>
                  </div>
                  <p className="text-2xl font-semibold">3-5 Days</p>
                </CardContent>
              </Card>
            </div>

            {/* Customer Info */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-medium">Customer Information</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Name:</span>{" "}
                    {order.customerName}
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Email:</span>{" "}
                    {order.customerEmail}
                  </p>
                  <p className="text-sm">
                    <span className="text-muted-foreground">Phone:</span>{" "}
                    {order.customerPhone}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-medium">Order Items</h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-4 border-b last:border-0 last:pb-0"
                    >
                      <div className="space-y-1">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          Size: {item.variation.size} • Color: {item.variation.color}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(item.price)} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Amount</span>
                    <span className="text-lg font-semibold">
                      {formatCurrency(order.totalAmount)}
                    </span>
                  </div>
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