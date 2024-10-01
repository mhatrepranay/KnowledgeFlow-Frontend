"use client";
import React, { FC } from "react";
import { Modal, Box } from "@mui/material";

type Props = {
  open: boolean; // Define the open prop
  setOpen: (open: boolean) => void; // Define the setOpen function
  activeItem: any;
  component: any;
  setRoute?: (route: string) => void;
  refetch?: any;
};

const CustomModel: FC<Props> = ({
  open,
  setOpen,
  setRoute,
  component: Component,
  refetch,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        style={{ outline: "none" }}
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 md:w-[450px] bg-slate-900 rounded-[8px] shadow p-4 outline-none"
      >
        <Component setOpen={setOpen} setRoute={setRoute} refetch={refetch} />
      </Box>
    </Modal>
  );
};

export default CustomModel;
