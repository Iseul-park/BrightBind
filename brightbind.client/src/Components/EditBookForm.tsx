import React from "react";
import { TextField, Grid, Typography, Button, Modal, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Book {
  id: number;
  userId: string;
  imagePath: string;
  title: string;
  author: string;
  brand: string;
  totalPage: number;
  startDate: string;
  endDate: string;
  authorizedUserInfo: string;
}

interface EditBookFormProps {
  id: number;
  title: string;
  author: string;
  brand?: string;
  totalPage: number;
  imageURL?: string;
  startDate: string;
  endDate?: string;
  onSave: (updatedBook: Book) => Promise<void>;
  open: boolean;
  onClose: () => void;
}

const EditBookForm: React.FC<EditBookFormProps> = ({
  id,
  title,
  author,
  brand = "",
  totalPage,
  imageURL = "",
  startDate,
  endDate = "",
  onSave,
  open,
  onClose,
}) => {
  const [editedTitle, setEditedTitle] = React.useState(title);
  const [editedAuthor, setEditedAuthor] = React.useState(author);
  const [editedBrand, setEditedBrand] = React.useState(brand);
  const [editedTotalPage, setEditedTotalPage] = React.useState(totalPage);
  const [editedStartDate, setEditedStartDate] = React.useState(startDate);
  const [editedEndDate, setEditedEndDate] = React.useState(endDate);
  const [editedImageURL, setEditedImageURL] = React.useState(imageURL);

  React.useEffect(() => {
    if (open) {
      setEditedTitle(title);
      setEditedAuthor(author);
      setEditedBrand(brand);
      setEditedTotalPage(totalPage);
      setEditedStartDate(startDate);
      setEditedEndDate(endDate);
      setEditedImageURL(imageURL);
    }
  }, [open, title, author, brand, totalPage, startDate, endDate, imageURL]);

  const handleSave = () => {
    onSave({
      id,
      title: editedTitle,
      author: editedAuthor,
      brand: editedBrand,
      totalPage: editedTotalPage,
      startDate: editedStartDate,
      endDate: editedEndDate,
      imagePath: editedImageURL,
      userId: "",
      authorizedUserInfo: "",
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          maxHeight: "90%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflow: "auto",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <form>
          <Typography variant="h4" sx={{ mb: 4 }}>
            Edit Book
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField label="Title" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Author"
                value={editedAuthor}
                onChange={(e) => setEditedAuthor(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Brand" value={editedBrand} onChange={(e) => setEditedBrand(e.target.value)} fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Total Page"
                value={editedTotalPage}
                onChange={(e) => setEditedTotalPage(isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value))}
                type="number"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URL"
                value={editedImageURL}
                onChange={(e) => setEditedImageURL(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              {editedImageURL ? (
                <img
                  src={editedImageURL}
                  alt="Book cover"
                  style={{ width: "30%", maxHeight: "300px", objectFit: "cover" }}
                />
              ) : (
                <Typography variant="body2" color="textSecondary">
                  No Image Available
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Start Date"
                value={editedStartDate}
                onChange={(e) => setEditedStartDate(e.target.value)}
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="End Date"
                value={editedEndDate}
                onChange={(e) => setEditedEndDate(e.target.value)}
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default EditBookForm;
