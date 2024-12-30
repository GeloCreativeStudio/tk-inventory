import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, X, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface OrdersFilterProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
}

const OrdersFilter = ({
  searchQuery,
  onSearchChange,
  selectedStatus,
  onStatusChange,
}: OrdersFilterProps) => {
  const hasActiveFilters = searchQuery || selectedStatus !== "all";

  const clearAllFilters = () => {
    onSearchChange("");
    onStatusChange("all");
  };

  return (
    <Card className="bg-white border-slate-200 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-slate-900">Filters</CardTitle>
            <CardDescription className="text-sm text-slate-500">
              Narrow down orders by using the filters below
            </CardDescription>
          </div>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="h-8 text-slate-600 hover:text-white hover:bg-slate-900"
            >
              <RefreshCw className="mr-2 h-3 w-3" />
              Clear Filters
            </Button>
          )}
        </div>
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-4">
            {searchQuery && (
              <Badge variant="secondary" className="text-xs">
                Search: {searchQuery}
              </Badge>
            )}
            {selectedStatus !== "all" && (
              <Badge variant="secondary" className="text-xs">
                Status: {selectedStatus}
              </Badge>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by customer name or email..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-slate-50 border-slate-200 placeholder:text-slate-400 focus:border-slate-300 focus:ring-slate-300 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-500"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              <Select value={selectedStatus} onValueChange={onStatusChange}>
                <SelectTrigger className="w-full pl-9 bg-slate-50 border-slate-200 hover:border-slate-300 focus:border-slate-300 focus:ring-slate-300 transition-colors">
                  <SelectValue placeholder="Status" />
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
        </div>
      </CardContent>
    </Card>
  );
};

export default OrdersFilter;