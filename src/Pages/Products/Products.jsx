import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import ProductCard from "./ProductCard";

const Products = () => {
  const axiosInstance=useAxios()
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const { data = {}, refetch } = useQuery({
    queryKey: ["accepted-products", searchText, page],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/products/accepted?search=${searchText}&page=${page}`
      );
      return res.data;
    },
  });

  const { products = [], totalPages = 0 } = data;

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    refetch();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search by tag (e.g., social, ai, app)"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="input input-bordered w-full max-w-md mr-4"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} refetch={refetch} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-4 py-2 rounded ${
              p === page ? "bg-primary text-white" : "bg-base-200"
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
