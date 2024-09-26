import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { instance } from "../../services/axiosInterceptor";
import { Toaster, toast } from "sonner";
import { ClipLoader } from "react-spinners";
import { useParams } from "react-router-dom";

const UpdateGallery = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageName, setImageName] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm({
    defaultValues: {},
  });

  const convertToBase64 = (item) => {
    const reader = new FileReader();

    reader.readAsDataURL(item);

    reader.onload = () => {
      console.log(reader.result);
      setPreviewImage(reader.result);
    };
  };

  const onSubmit = (data) => {
    if (isLoading) return;
    setIsLoading(true);
    const formData = new FormData();
    const { file } = data;
    formData.append("file", file[0]);

    instance
      .patch(`/gallery/${id}`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        reset();
        setIsLoading(false);
        toast.success(res.data.message, {
          style: {
            background: "green",
            color: "white",
          },
        });
        reset();
        setPreviewImage(null);
        window.location.href = '/gallery'
      })
      .catch((err) => {
        reset();

        setIsLoading(false);
        toast.error(err, {
          style: {
            background: "red",
            color: "white",
          },
        });
      });
  };

  const temp = watch("file");

  useEffect(() => {
    if (temp?.length > 0) {
      convertToBase64(temp[0]);
      setImageName(temp);
    }
  }, [temp]);

  useEffect(() => {
    setIsLoading(true);
    instance
      .get(`/gallery/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setPreviewImage(res?.data?.data?.file[0]?.secure_url);
      })
      .catch((err) => {
        setIsLoading(false);

        toast.error(err, {
          style: {
            background: "red",
            color: "white",
          },
        });
      });
  }, []);

  return (
    <div className="p-10">
      <Toaster />
      <div className=" flex justify-center ">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Update Gallery Item
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
        <form
          className="space-y-6 mx-8 sm:mx-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex-1 gap-2 items-center mx-auto mb-3 space-y-4 sm:flex sm:space-y-0">
            <div className="relative w-1/2 space-y-1">
              <label htmlFor="input" className="font-medium ">
                Image
              </label>
              <div className="items-center justify-center  mx-auto">
                <label
                  className="flex justify-center w-full h-[300px] px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                  id="drop"
                >
                  <span className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <span className="font-medium text-gray-600">
                      {Array.isArray(Array.from(imageName || {})) &&
                      Array.from(imageName || {}).length > 0
                        ? imageName[0]?.name
                        : "Drop files to Attach, or "}
                      <span className="text-blue-600 underline ml-[4px]">
                        browse
                      </span>
                    </span>
                  </span>
                  <input
                    type="file"
                    {...register("file", { required: "Image is required" })}
                    className="hidden"
                    accept="image/*"
                    id="input"
                  />
                </label>
              </div>
              {errors.file && (
                <span className="text-red-500">Image is required</span>
              )}
            </div>
            <div>
              <label htmlFor="input" className="font-medium ">
                Preview
              </label>
              <div className="flex justify-center items-center border w-[300px] h-[300px]">
                {previewImage && (
                  <div>
                    <img
                      src={previewImage}
                      className="max-h-full max-w-full object-contain"
                      width={"300px"}
                      height={"300px"}
                      alt=""
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button className="w-1/2 text-white rounded-md p-2 bg-blue-500 hover:bg-blue-700 transition duration-300">
              {isLoading ? <ClipLoader color="#c4c2c2" /> : <>Update</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateGallery;
