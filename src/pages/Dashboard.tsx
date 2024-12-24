import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatsCard from '@/components/dashboard/StatsCard';
import SalesChart from '@/components/dashboard/SalesChart';

const Dashboard = () => {
  const { user } = useAuth();

  const AdminDashboard = () => (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Products"
          value="120"
          description="+4 from last month"
        />
        <StatsCard 
          title="Total Stock Value"
          value="$12,234"
          description="+2.1% from last month"
        />
        <StatsCard 
          title="Low Stock Items"
          value="7"
          description="Requires attention"
        />
        <StatsCard 
          title="Total Orders"
          value="432"
          description="+19% from last month"
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Monthly Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart />
        </CardContent>
      </Card>
    </div>
  );

  const StaffDashboard = () => (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard 
          title="Pending Orders"
          value="12"
          description="Requires processing"
        />
        <StatsCard 
          title="Processing Orders"
          value="8"
          description="In progress"
        />
        <StatsCard 
          title="Completed Today"
          value="24"
          description="+3 from yesterday"
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart />
        </CardContent>
      </Card>
    </div>
  );

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back, here's your overview for today.
          </p>
        </div>
        {user?.role === 'admin' ? <AdminDashboard /> : <StaffDashboard />}
      </div>
    </Layout>
  );
};

export default Dashboard;