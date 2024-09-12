import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { instance } from "../../services/axiosInterceptor";
import { Toaster, toast } from "sonner";
import { ClipLoader } from "react-spinners";

const AddReviews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageName, setimageName] = useState({});

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

  const onSubmit = (data) => {
    if (isLoading) return;
    setIsLoading(true);
    const formData = new FormData();
    const { image } = data;
    if (image) {
      formData.append("image", image[0]);
    }
    formData.append("review", data.review);
    formData.append("title", data.title);
    formData.append("stars", data.stars);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("fromAdmin", true);

    // api call here
    instance
      .post(`/reviews`, formData)
      .then((res) => {
        reset();
        setIsLoading(false);
        toast.success(res.data.message, {
          style: {
            background: "green",
            color: "white",
          },
        });
        window.location.href = "/reviews";
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

  const temp = watch("image");

  useEffect(() => {
    setimageName(temp);
  }, [temp]);

  return (
    <div className="p-10">
      <Toaster />
      <div className=" flex justify-center">
        <h3 className="text-gray-600 text-2xl font-semibold sm:text-3xl">
          Add a Review
        </h3>
      </div>
      <div className="bg-white rounded-lg shadow p-4 py-6  sm:rounded-lg sm:max-w-5xl mt-8 mx-auto">
        <form
          className="space-y-6 mx-8 sm:mx-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="font-medium">Title</label>
            <input
              {...register("title", { required: "title is required" })}
              type="text"
              className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
            {errors.topic && (
              <span className="text-red-500">Review Title is required</span>
            )}
          </div>

          <div>
            <label className="font-medium">review</label>
            <textarea
              {...register("review", { required: true })}
              id="review"
              className="w-full h-[200px] !text-black rounded-md border border-slate-300 px-4 py-2 text-base leading-[140%]  outline-none  focus:outline-none focus:ring-[1px]  focus:border-teal-400 active:outline undefined resize-none"
              placeholder="write a review of max 300 characters"
              maxLength={300}
              type="text"
            />

            {errors?.description && (
              <span className="fw-normal fs-6 text-danger">
                review is required
              </span>
            )}
          </div>

          <div>
            <label className="font-medium">E-Mail</label>
            <input
              {...register("email", { required: "email is required" })}
              type="email"
              className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
            {errors.topic && (
              <span className="text-red-500">User E-mail is required</span>
            )}
          </div>
          <div>
            <label className="font-medium">Reviewer Name</label>
            <input
              {...register("name", { required: "name is required" })}
              type="text"
              className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
            {errors.topic && (
              <span className="text-red-500">Reviewer name is required</span>
            )}
          </div>

          <div>
            <label className="font-medium">Rating</label>
            <input
              {...register("stars", { required: "name is required" })}
              type="number"
              min={0}
              max={5}
              className="w-full mt-2 me-50 px-5 py-2 text-gray-500 border-slate-300 bg-transparent outline-none border focus:border-teal-400 shadow-sm rounded-lg"
            />
            {errors.topic && (
              <span className="text-red-500">Reviewer name is required</span>
            )}
          </div>
          <div className="flex-1 items-center mx-auto mb-3 space-y-4 sm:flex sm:space-y-0">
            <div className="relative w-full space-y-1">
              <label htmlFor="input" className="font-medium ">
                Image (optional)
              </label>
              <div className="items-center justify-center  mx-auto">
                <label
                  className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
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
                    {...register("image")}
                    className="hidden"
                    accept="image/png,image/jpeg,image/webp"
                    id="input"
                  />
                </label>
              </div>
              {errors.image && (
                <span className="text-red-500">image is required</span>
              )}
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button className="w-1/2 text-white rounded-md p-2 bg-blue-500 hover:bg-blue-700 transition duration-300">
              {isLoading ? <ClipLoader color="#c4c2c2" /> : <>Save</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviews;
