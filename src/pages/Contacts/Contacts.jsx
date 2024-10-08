import { Modal, Pagination, Skeleton, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { instance } from "../../services/axiosInterceptor";

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    color: "black",
  },
}));

const Contacts = () => {
  const [data, setData] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // modal states
  const [previewData, setPreviewData] = useState(null);
  const [open, setOpen] = useState(false);

  const viewItem = (data) => {
    setPreviewData(data);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const getData = () => {
    setIsLoading(true);
    instance
      .get(`/contact`)
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
    if (window.confirm(`Are you sure you want to delete contact`)) {
      instance
        .delete(`${import.meta.env.VITE_API_URL}/contact/${item._id}`)
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
          toast.error("There was some issue deleting the contact", {
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
        <div className="text-2xl mb-4">Contacts</div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {isLoading && (
            <>
              <Skeleton animation="wave" height={50} />
              <Skeleton animation="wave" height={50} />
              <Skeleton animation="wave" height={50} />
              <Skeleton animation="wave" height={50} />
            </>
          )}
          {data && (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S.No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    E-Mail
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Mobile
                  </th>
                  <th scope="col" className=" px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr
                    className="bg-white border-b   hover:bg-gray-50 "
                    key={item?._id}
                    onClick={() => {
                      viewItem(item);
                    }}
                  >
                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
                    >
                      <div className="ps-3">{idx + 1}</div>
                    </th>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.email}</td>

                    <td className="px-6 py-4">{item.mobile}</td>

                    <td className="px-6 py-4 text-center flex gap-4">
                      <button
                        className="font-medium text-blue-600  hover:underline"
                        onClick={() => {
                          e.preventDefault();
                          e.stopPropagation();
                          viewItem(item);
                        }}
                      >
                        View
                      </button>
                      <button
                        className="font-medium text-red-600  hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteItem(item);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="relative w-[95vw] md:w-[60vw] bg-white shadow-[0_0_0_1px#ffdd00] rounded-md left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-3">
            <div className="p-4 md:p-6 text-black grid grid-cols-2 gap-2 justify-center">
              <p className="text-lg font-bold line-clamp-2">Name:</p>
              <p className="text-lg font-bold line-clamp-2">
                {previewData?.name}
              </p>
              <p className="text-lg font-semibold mb-2">E-Mail:</p>
              <p className="text-lg  font-semibold mb-2 line-clamp-2">
                {previewData?.email}
              </p>
              <p className="text-lg font-semibold mb-2">Mobile:</p>
              <p className="text-lg font-semibold mb-2">
                {previewData?.mobile}
              </p>
              <p className="text-lg font-semibold mb-2">Message:</p>
              <p className="text-lg font-semibold mb-2">
                {previewData?.message}
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Contacts;
