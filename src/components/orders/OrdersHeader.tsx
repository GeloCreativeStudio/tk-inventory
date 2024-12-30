import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface OrdersHeaderProps {
  setOpen: (open: boolean) => void;
}

const OrdersHeader = ({ setOpen }: OrdersHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <p className="text-muted-foreground">
          Manage customer orders here
        </p>
      </div>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" /> Add Order
      </Button>
    </div>
  );
};

export default OrdersHeader;