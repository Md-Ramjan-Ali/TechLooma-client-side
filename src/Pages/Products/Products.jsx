import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import Loading from "../../Components/Loading/Loading";
import { FaSearch } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const Products = () => {
  const axiosInstance = useAxios();
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);

  const {
    data = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["accepted-products", searchText, page],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get(
          `/products/accepted?search=${searchText}&page=${page}`
        );
        return res.data;
      } catch (error) {
        console.log(error);
        return []
      }
    },
  });

  const { products = [], totalPages = 0 } = data;

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    setSearchText(form.searchText.value);
    setPage(1);
    refetch();
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-2 py-10">
      <Helmet>
        <title>Products | TechLooma</title>
      </Helmet>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="mb-8 flex justify-center sticky top-0 z-50"
      >
        <div className="relative w-full max-w-5xl">
          <input
            type="text"
            name="searchText"
            placeholder="Search by tags..."
            defaultValue={searchText}
            className="relative input focus:outline-0 rounded-tl-full rounded-bl-full w-full  lg:pl-15  py-6 backdrop-blur-md bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] text-secondary-content"
          />
          <span className="absolute  top-1/2 left-6 transform -translate-y-1/2 text-xl z-20 hidden md:block">
            <FaSearch className="text-secondary-content" />
          </span>
        </div>

        <button
          type="submit"
          className="px-5 py-2 bg-base-content/60 border border-primary/30 shadow-[0_0_20px_rgba(0,255,255,0.2)] text-secondary-content rounded-tr-full rounded-br-full cursor-pointer"
        >
          Search
        </button>
      </form>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} refetch={refetch} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
};

export default Products;
