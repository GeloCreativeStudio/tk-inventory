import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OrderStatus } from "@/types/orders";

interface OrdersFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: OrderStatus | "all";
  onStatusFilterChange: (value: OrderStatus | "all") => void;
}

const OrdersFilter = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}: OrdersFilterProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder="Search by customer name or email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-slate-50"
        />
      </div>
      <div className="w-full sm:w-48">
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default OrdersFilter;