"use client";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit3 } from "react-icons/fi";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
import Link from "next/link";

type Props = {};

const AllCourses = (props: Props) => {
  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation();

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Link href={`/admin/edit-course/${params.row.id}`}>
              <FiEdit3 color="white" size={20} />
            </Link>
          </>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setCourseId(params.row.id);
              }}
            >
              <AiOutlineDelete color="white" size={20} />
            </Button>
          </>
        );
      },
    },
  ];
  const rows: any = [];
  {
    data &&
      data.courses.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          ratings: item.ratings,
          purchased: item.purchased,
          created_at: format(item.createdAt),
        });
      });
  }

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Course Deleted Successfully");
    }

    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, error]);

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
  };

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#000" : "#fff",
              },
              "& .MuiDataGrid-colCellWrapper": {
                backgroundColor: theme === "dark" ? "#A4A9fC" : "#3e4396",
                color: theme === "dark" ? "#000" : "#fff",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#000" : "#fff",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#000" : "#fff",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ccc !important"
                    : "1px solid #ffffff30 !important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#000" : "#fff",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#000" : "#fff",
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: theme === "dark" ? "#A4A9fC" : "#3e4396",
                borderBottom: "none",
                color: theme === "dark" ? "#000" : "#fff",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#F2Ffff0F0" : "#1F2A40",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: theme === "dark" ? "#A4A9fC" : "#3e4396",
                borderTop: "none",
                color: theme === "dark" ? "#000" : "#fff",
              },
              "& .MuiCheckbox-root": {
                color: "#b7ebde",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                "&.Mui-checked": {
                  color: "#b7ebde",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                },
                "&.MuiCheckbox-indeterminate": {
                  color: "#b7ebde",
                  "&:hover": {
                    backgroundColor: "transparent",
                  },
                },
              },
              "& .MuiButton-label .MuiSvgIcon-root": {
                color: "#fff",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid
              checkboxSelection
              rows={rows}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                style={{ outline: "none" }}
                className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 md:w-[450px] bg-slate-900 rounded-[8px] shadow p-4 "
              >
                <h1 style={{ fontSize: "25px" }} className={`${styles.title}`}>
                  Are You sure want to delete this course ?
                </h1>

                <div className="flex w-full items-center justify-between mb-6 mt-4">
                  <div
                    style={{ width: "120px", height: "30px" }}
                    className={`${styles.button}    bg-[#57c7a3]`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>
                  {/* Add margin to the right of the delete button */}
                  <div
                    style={{ width: "120px", height: "30px" }}
                    className={`${styles.button}    bg-[#d92020]`}
                    onClick={handleDelete}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
