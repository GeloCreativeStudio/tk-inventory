import Layout from "@/components/Layout";

const Orders = () => {
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">
            Manage your orders here.
          </p>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <p>Order management coming soon...</p>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;