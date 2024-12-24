import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StockBadgeProps {
  stock: number;
}

const StockBadge = ({ stock }: StockBadgeProps) => {
  const getStockStatus = (stock: number) => {
    if (stock <= 5) return "critical";
    if (stock <= 10) return "warning";
    return "normal";
  };

  const status = getStockStatus(stock);
  
  const badgeStyles = {
    critical: "bg-red-100 text-red-700 hover:bg-red-100",
    warning: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
    normal: "bg-green-100 text-green-700 hover:bg-green-100",
  };

  return (
    <Badge 
      variant="secondary"
      className={cn(
        "font-medium",
        badgeStyles[status]
      )}
    >
      {stock} in stock
    </Badge>
  );
};

export default StockBadge;