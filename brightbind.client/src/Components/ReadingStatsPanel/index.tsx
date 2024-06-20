// import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import BookIcon from "@mui/icons-material/Book";

type ReadingStatsPanelProps = {
  /** Number of books the user read this year */
  booksReadThisYear: number;

  /** Number of books the user is currently reading */
  currentBooksReading: number;

  /** Total number of books read by the user */
  totalBooksRead: number;
};

function ReadingStatsPanel({
  booksReadThisYear,
  currentBooksReading,
  totalBooksRead,
}: ReadingStatsPanelProps) {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} p={2}>
      <Card sx={{ width: "100%", display: "flex", alignItems: "center", p: 2 }}>
        <LibraryBooksIcon sx={{ fontSize: 44, mr: 2 }} />
        <CardContent>
          <Typography variant="h4">{booksReadThisYear}</Typography>
          <Typography variant="body1">Read Books</Typography>
        </CardContent>
      </Card>
      <Card sx={{ width: "100%", display: "flex", alignItems: "center", p: 2 }}>
        <MenuBookIcon sx={{ fontSize: 44, mr: 2 }} />
        <CardContent>
          <Typography variant="h4">{currentBooksReading}</Typography>
          <Typography variant="body1">Reading Books</Typography>
        </CardContent>
      </Card>
      <Card sx={{ width: "100%", display: "flex", alignItems: "center", p: 2 }}>
        <BookIcon sx={{ fontSize: 44, mr: 2 }} />
        <CardContent>
          <Typography variant="h4">{totalBooksRead}</Typography>
          <Typography variant="body1">Readed Books</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
export default ReadingStatsPanel;
