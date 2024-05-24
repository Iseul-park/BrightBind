import React from "react";
import { TextField, Grid, Typography } from "@mui/material";

interface EditBookFormProps {
  bookId: string;
  title: string;
  author: string;
  brand?: string;
  totalPage: number;
  imageURL?: string;
  startDate?: string;
  endDate?: string;
  isCompleted: boolean;
  isWishlist: boolean;
}

const EditBookForm: React.FC<EditBookFormProps> = ({
  //   bookId,
  title,
  author,
  brand,
  totalPage,
  imageURL,
  startDate,
  endDate,
  isCompleted,
  isWishlist,
}) => {
  return (
    <form>
      <Typography variant="h6">Edit Book Form</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Title" defaultValue={title} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Author" defaultValue={author} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Brand" defaultValue={brand} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Total Page" defaultValue={totalPage} type="number" fullWidth />
        </Grid>
        <Grid item xs={12}>
          {imageURL ? (
            <img
              src={imageURL}
              alt="Book cover"
              style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
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
            defaultValue={startDate}
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="End Date"
            defaultValue={endDate}
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Completed"
            defaultValue={isCompleted ? "Yes" : "No"}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Wishlist" defaultValue={isWishlist ? "Yes" : "No"} fullWidth disabled />
        </Grid>
      </Grid>
    </form>
  );
};

export default EditBookForm;
