import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const BasicModal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        {title && (
          <Typography id="modal-title" variant="h6" component="h2">
            {title}
          </Typography>
        )}
        <Typography id="modal-description" sx={{ mt: 2 }}>
          {children}
        </Typography>
        <Button onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default BasicModal;
