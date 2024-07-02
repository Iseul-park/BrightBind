import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState } from "react";
import OptionsMenu from "./ReviewOptionsMenu.tsx";
import ConfirmModal from "./ConfirmModal.tsx";
import BaseURL from "../../config.ts";

interface ReviewCardProps {
  id: number;
  imagePath: string;
  title: string;
  author: string;
  brand: string;
  comment: string;
  updateDate: Date;
  onDelete: (id: number) => void;
}

const ReviewCard = ({ id, title, comment, imagePath, author, brand, updateDate, onDelete }: ReviewCardProps) => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleDeleteModalClose = () => {
    console.log("Cancel Confirmation");
    setShowDeleteModal(false);
  };

  const handleDeleteConfirm = async () => {
    try {
      const deleteUrl = `${BaseURL}/api/Review/DeleteReview/${id}`;
      const response = await fetch(deleteUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        onDelete(id);
      } else {
        throw new Error("Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    } finally {
      setShowDeleteModal(false);
    }
  };
  return (
    <>
      <Card
        sx={{
          display: "flex",
          maxWidth: "98%",
          backgroundColor: "white",
          padding: "5px",
          width: "100%",
        }}
      >
        <CardMedia
          component="img"
          sx={{ height: 250, width: 180, borderRadius: "16px", padding: "1%" }}
          image={imagePath}
          alt="Book Image"
        />
        <Box sx={{ display: "flex", flexDirection: "column", borderRadius: "16px", width: "100%" }}>
          <CardContent sx={{ flex: "1 0 auto", position: "relative" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
              <OptionsMenu
                anchor={anchor}
                onClick={handleClick}
                onClose={handleClose}
                onDelete={() => {
                  setShowDeleteModal(true);
                  handleClose();
                }}
              ></OptionsMenu>
            </Box>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3, // the number of the text line
                textOverflow: "ellipsis",
                width: "100%",
              }}
            >
              {comment}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "row",
              borderRadius: "16px",
              alignContent: "center",
              alignItems: "center",
              margin: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                marginTop: "2px",
              }}
            >
              <Typography sx={{ fontSize: 16, fontWeight: 600 }}>{author}</Typography>
              <Typography variant="subtitle1" color="#AAADB2" sx={{ fontSize: 14 }}>
                {brand}
              </Typography>
              <Typography variant="subtitle1" color="#AAADB2" sx={{ fontSize: 14 }}>
                {updateDate.toDateString()}
              </Typography>
            </Box>
            <IconButton sx={{ marginLeft: 1 }} aria-label="arrow">
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>
      {showDeleteModal && (
        <ConfirmModal
          title="Delete"
          text="Do you really want to delete this review?"
          open={showDeleteModal}
          onConfirm={handleDeleteConfirm}
          onClose={handleDeleteModalClose}
        />
      )}
    </>
  );
};

export default ReviewCard;
