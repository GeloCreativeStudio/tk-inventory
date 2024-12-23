import Layout from "@/components/Layout";

const Inventory = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Inventory</h2>
          <p className="text-muted-foreground">
            Manage your inventory items here.
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <p>Inventory management coming soon...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Inventory;