import { useQuery } from "@tanstack/react-query";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";

const COLORS = ["#00a66c", "#facc15", "#3b82f6", "#f87171", "#a78bfa"];

const Statistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/stats");
      return res.data;
    },
  });

  const pieData = [
    { name: "Accepted", value: data.acceptedCount || 0 },
    { name: "Pending", value: data.pendingCount || 0 },
    { name: "All Products", value: data.totalProducts || 0 },
    { name: "Users", value: data.totalUsers || 0 },
    { name: "Reviews", value: data.totalReviews || 0 },
  ];

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10 max-w-5xl mx-auto p-6 sm:p-8 md:p-10 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl my-5 text-secondary-content">
        <div className="bg-[#3b82f6]  p-6 rounded-lg text-center shadow">
          <h3 className="text-xl font-semibold">Total Products</h3>
          <p className="text-3xl font-bold mt-2">{data.totalProducts}</p>
        </div>
        <div className="bg-[#00a66c]  p-6 rounded-lg text-center shadow">
          <h3 className="text-xl font-semibold">Accepted Products</h3>
          <p className="text-3xl font-bold mt-2">{data.acceptedCount}</p>
        </div>
        <div className="bg-[#facc15]  p-6 rounded-lg text-center shadow">
          <h3 className="text-xl font-semibold">Pending Products</h3>
          <p className="text-3xl font-bold mt-2">{data.pendingCount}</p>
        </div>
        <div className="bg-[#f87171]  p-6 rounded-lg text-center shadow">
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-3xl font-bold mt-2">{data.totalUsers}</p>
        </div>
        <div className="bg-[#a78bfa]  p-6 rounded-lg text-center shadow">
          <h3 className="text-xl font-semibold">Total Reviews</h3>
          <p className="text-3xl font-bold mt-2">{data.totalReviews}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 sm:p-8 md:p-10 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] rounded-2xl my-5">
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;
