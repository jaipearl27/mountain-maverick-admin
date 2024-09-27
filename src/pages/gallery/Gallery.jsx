import { Pagination, Skeleton, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { instance } from "../../services/axiosInterceptor";

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    color: "black",
  },
}));

const Gallery = () => {
  const [data, setData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const getData = () => {
    setIsLoading(true);
    instance
      .get(`/gallery?page=${page}`)
      .then((res) => {
        setData(res?.data?.data);
        setTotalPages(res?.data?.totalPages);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, [page]);

  const handlePagination = (e, p) => {
    setPage(p);
    setSearchParams({ page: p });
  };

  const deleteItem = (item) => {
    if (window.confirm(`Are you sure you want to delete this image?`)) {
      instance
        .delete(`${import.meta.env.VITE_API_URL}/gallery/${item._id}`)
        .then((res) => {
          toast.success(res.data.message, {
            style: {
              background: "green",
              color: "white",
            },
          });
          getData();
        })
        .catch((err) => {
          console.log(err);
          toast.error("There was some issue deleting the tour", {
            style: {
              background: "red",
              color: "white",
            },
          });
        });
    }
  };

  return (
    <div>
      <Toaster />

      <div className="p-10 ">
        <div className="text-2xl">Gallery</div>
        <div className="flex items-center justify-end flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-8 bg-white ">
          <Link
            to="/gallery/add"
            className="bg-blue-600 rounded-md text-white px-3 py-1 font-semibold "
          >
            Add
          </Link>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center">
            {isLoading && (
              <>
                <Skeleton animation="wave" height={300} width={300} />
                <Skeleton animation="wave" height={300} width={300} />
                <Skeleton animation="wave" height={300} width={300} />
              </>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-center">
            {data &&
              data?.map((item) => (
                <div className="flex flex-col w-[300px]" key={item?._id}>
                <div
                  className="w-[300px] h-[300px] border rounded-md flex flex-col justify-center items-center"
                  
                  >
                  <img src={item?.file[0]?.secure_url} className="object-contain max-w-full max-h-full" alt="" />
                </div>
                <div className="flex">
                  <Link to={`/gallery/update/${item?._id}`} className="text-white text-center bg-blue-500 hover:bg-blue-600 w-1/2 p-2 transition duration-300" >View/Edit</Link>
                  <button type="button" className="text-white text-center bg-red-500 hover:bg-red-600 rounded-br-md w-1/2 p-2 transition duration-300" onClick={() => deleteItem(item)} >Delete</button>

                </div>
                  </div>
              ))}
          </div>
        </div>
        {!isLoading && data && (
          <div className="flex flex-row justify-center w-full mt-10">
            <StyledPagination
              count={totalPages}
              page={Number(page)}
              color="primary"
              onChange={handlePagination}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
