"use client";
import React, { FC, useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";

type Props = {
  isTeam: boolean;
};

const AllCourses: FC<Props> = ({ isTeam }) => {
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [role, setRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [userId, setUerId] = useState("");

  const [email, setEmail] = useState("");
  const [updateUserRole, { error: UpdatError, isSuccess }] =
    useUpdateUserRoleMutation();

  const [deleteUser, { isSuccess: deleteSuccess, error: deletError }] =
    useDeleteUserMutation();

  useEffect(() => {
    if (UpdatError) {
      if ("data" in UpdatError) {
        const errorMessage = UpdatError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (isSuccess) {
      refetch();
      toast.success("use Role Updated succesfully");
      setActive(false);

      // window.location.reload();
    }
    if (deleteSuccess) {
      refetch();
      toast.success("Userb Delateted succesfully");
      setOpen(false);
      // window.location.reload();
    }
    if (deletError) {
      if ("data" in deletError) {
        const errorMessage = deletError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, UpdatError, deleteSuccess, deletError]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.7 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setUerId(params.row.id);
              }}
            >
              <AiOutlineDelete color="white" size={20} />
            </Button>
          </>
        );
      },
    },
    {
      field: "emailsend",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        const handleSendEmail = () => {
          window.open(
            `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
              params.row.email
            )}`,
            "_blank"
          );
        };

        return (
          <>
            <Button onClick={handleSendEmail}>
              <AiOutlineMail color="white" size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const rows: any = [];
  if (isTeam) {
    const newData =
      data && data.users.filter((item: any) => item.role === "admin");
    newData &&
      newData.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          created_at: format(item.createdAt),
        });
      });
  }
  const handleSubmit = async () => {
    await updateUserRole({ email, role });
  };
  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box m="20px">
          {isTeam && (
            <div className="w-full flex justify-end">
              <div
                style={{ border: "2px solid #ffffffa6" }}
                className={`${styles.button} !rounded-[10px] !h-[25px] !w-[160px] bg-[#8d51ba]  `}
                onClick={() => setActive(!active)}
              >
                Add New Member
              </div>
            </div>
          )}

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
          {active && (
            <Modal
              open={active}
              onClose={() => setActive(!active)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                style={{ outline: "none" }}
                className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 md:w-[450px] bg-slate-900 rounded-[8px] shadow p-4 "
              >
                <h1 style={{ fontSize: "25px" }} className={`${styles.title}`}>
                  Add New Member
                </h1>
                <div className="mt-4">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email..."
                    className={`${styles.input}`}
                  />
                  <select
                    name=""
                    id=""
                    className={`${styles.input} !mt-6`}
                    value={role} // Bind the value of role to the select element
                    onChange={(e) => setRole(e.target.value)} // Update role based on selection
                  >
                    <option
                      style={{ backgroundColor: "#0f172a", color: "white" }}
                      value="admin"
                    >
                      Admin
                    </option>
                    <option
                      style={{ backgroundColor: "#0f172a", color: "white" }}
                      value="user"
                    >
                      User
                    </option>
                    <br />
                    <br />
                  </select>
                  <br />
                  <br />
                  <br />
                  <div
                    className={`${styles.button} my-6 !h-[30px]`}
                    onClick={handleSubmit}
                  >
                    Submit
                  </div>
                </div>
              </Box>
            </Modal>
          )}
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
                  Are You sure want to delete this use ?
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
