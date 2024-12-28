import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";

interface InventoryHeaderProps {
  setOpen: (open: boolean) => void;
}

const InventoryHeader = ({ setOpen }: InventoryHeaderProps) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
        <p className="text-muted-foreground">
          {isAdmin 
            ? "Manage your inventory items here."
            : "Browse inventory items here."}
        </p>
      </div>
      {isAdmin && (
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      )}
    </div>
  );
};

export default InventoryHeader;