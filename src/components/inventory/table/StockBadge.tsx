import { Badge } from "@/components/ui/badge";

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
  const variants = {
    critical: "destructive",
    warning: "warning",
    normal: "secondary",
  } as const;

  return (
    <Badge variant={variants[status]}>
      {stock} in stock
    </Badge>
  );
};

export default StockBadge;