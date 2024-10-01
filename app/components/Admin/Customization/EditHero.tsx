import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import { AiOutlineCamera } from "react-icons/ai";
import { useState, useEffect } from "react";
import { styles } from "@/app/styles/style";
import "./EditHero.css";
import toast from "react-hot-toast";

const EditHero = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, error, isLoading }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout.banner.title);
      setSubTitle(data?.layout.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url || "");
    }
    if (isSuccess) {
      refetch();
      toast.success("Hero Updated Successfully!");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [data, isSuccess, error]);

  // const handleUpdate = (e: any) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       if (reader.readyState === 2) {
  //         const imageData = e.target?.result as string; // Cast to string
  //         setImage(imageData); // Update the image state with the base64 data
  //       }
  //     };
  //     reader.readAsDataURL(file); // Read the file as data URL
  //   }
  // };

  const handleUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return; // No file selected, do nothing
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const imageData = fileReader.result as string; // Cast to string
        setImage(imageData);
      }
    };
    fileReader.readAsDataURL(file);
  };

  const handleEdit = async (e: any) => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  return (
    <div className="container">
      <div className="content-wrapper">
        <div className="image-container">
          <img src={image} alt="" className="image hero_animation " />
          <input
            type="file"
            name=""
            id="banner"
            accept="image/*"
            onChange={handleUpdate}
            className="hidden"
          />
          <label htmlFor="banner" className="edit-icon">
            <AiOutlineCamera
              style={{ fontSize: "30px" }}
              className="text-white cursor-pointer"
            />
          </label>
        </div>
        <div className="text-container">
          <textarea
            value={title}
            style={{ fontSize: "30px" }}
            className="title"
            placeholder="Improve Explore Endless Learning Possibilities Elevate Your Skills With KnowledgeFlow"
            onChange={(e) => setTitle(e.target.value)}
            rows={5}
          />

          <textarea
            value={subTitle}
            style={{ fontSize: "18px" }}
            className="subtitle"
            placeholder="Dive into our vast library of courses and tutorials Accelerate your learning journey with us"
            rows={4}
            onChange={(e) => setSubTitle(e.target.value)}
          ></textarea>
          <br />
          <br />

          <div
            className={`save-button ${styles.button} ${
              !data ||
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? "enabled"
                : "disabled"
            }`}
            onClick={
              (data && data?.layout?.banner?.title !== title) ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? handleEdit
                : () => null
            }
          >
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHero;
