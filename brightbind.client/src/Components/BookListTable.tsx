import { useEffect, useMemo, useState, useContext } from "react";
import BaseURL from "../../config";
import { UserContext } from "./AuthorizeView";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
  MRT_ActionMenuItem,
} from "material-react-table";
import { Edit, Delete } from "@mui/icons-material";
import { Box, Container } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
import ConfirmModal from "./ConfirmModal";

type Book = {
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
};

const BookListTable = () => {
  const [columns, setColumns] = useState<MRT_ColumnDef<Book>[]>([]);
  const [bookData, setBookData] = useState<Book[]>([]);
  //const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const apiUrl = `${BaseURL}/api/Book/GetAllBooks`;

  const user = useContext(UserContext);
  console.log("user1: ", user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const fetchedData: Book[] = data.map((item: Book) => ({
          id: item.id,
          userId: item.userId,
          imagePath: item.imagePath,
          title: item.title,
          author: item.author,
          brand: item.brand,
          totalPage: item.totalPage,
          startDate: new Date(item.startDate).toISOString().split("T")[0],
          endDate: new Date(item.endDate).toISOString().split("T")[0],
        }));

        const filteredData = fetchedData.filter((book) => book.userId === user?.id);

        const columns: MRT_ColumnDef<Book>[] = [
          {
            accessorKey: "imagePath",
            enableSorting: false,
            header: "",
            size: 50,
            Cell: ({ cell }) => (
              <img src={cell.getValue<string>()} alt="Book image" style={{ width: "100px", height: "auto" }} />
            ),
          },
          { accessorKey: "title", header: "Title" },
          { accessorKey: "author", header: "Author", size: 20 },
          { accessorKey: "brand", header: "Brand" },
          { accessorKey: "totalPage", header: "Total Page", size: 20 },
          { accessorKey: "startDate", header: "Start Date", size: 50 },
          { accessorKey: "endDate", header: "End Date", size: 50 },
        ];
        setColumns(columns);
        setBookData(filteredData);
      } catch (error) {
        //setError(error.message);
        console.error("Error fetching book data:", error);
      }
    };

    fetchData();
  }, [apiUrl, user?.id]);

  const handleClose = () => {
    console.log("Cancel Confirmation");
    setShowDeleteModal(false);
  };

  const openModal = () => {
    console.log("Delete Confirmation");
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const deleteUrl = `${BaseURL}/api/Book/DeleteBook/${selectedBookId}`;
      const response = await fetch(deleteUrl, {
        method: "DELETE",
      });

      if (response.ok) {
        setBookData((prevBookData) => prevBookData.filter((book) => book.id !== selectedBookId));
      } else {
        throw new Error("Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      //setError(error.message);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const table = useMaterialReactTable({
    columns: useMemo(() => columns, [columns]),
    data: useMemo(() => bookData, [bookData]),
    enableRowActions: true,
    // positionActionsColumn: "last",
    displayColumnDefOptions: {
      "mrt-row-actions": {
        header: "Actions",
        size: 30,
        muiTableBodyCellProps: {
          //align: "center",
        },
      },
    },
    renderRowActionMenuItems: ({ row, table }) => [
      <MRT_ActionMenuItem icon={<Edit />} key="edit" label="Edit" onClick={() => console.info("Edit")} table={table} />,
      <MRT_ActionMenuItem
        icon={<Delete />}
        key="delete"
        label="Delete"
        table={table}
        sx={{ border: 0 }}
        //onClick={openModal}
        onClick={() => {
          setSelectedBookId(row.original.id);
          openModal();
        }}
      />,
      <MRT_ActionMenuItem
        icon={<NotesIcon />}
        key="review"
        label="Review"
        onClick={() => console.info("review")}
        table={table}
      />,
    ],

    // muiTablePaperProps: {
    //   elevation: 0,
    //   sx: {
    //     borderRadius: "10",
    //   },
    // },
    // muiTableHeadCellProps: ({ column }) => ({
    //   //conditionally style pinned columns
    //   sx: {
    //     backgroundColor: column.getIsPinned() ? "#f5f5f5" : "inherit",
    //   },
    // }),
    muiTableBodyProps: {
      sx: {
        //stripe the rows, make odd rows a darker color
        "& tr:nth-of-type(odd) > td": {
          backgroundColor: "#fbe9e7",
        },
      },
    },
    // mrtTheme: (theme) => ({
    //   baseBackgroundColor: "#fff8e1",
    //   draggingBorderColor: theme.palette.secondary.main,
    // }),
  });

  return (
    <>
      {/* {error && <div>Error: {error}</div>} */}
      <Container sx={{ padding: "20px" }}>
        <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
          <MaterialReactTable table={table} />
        </Box>
      </Container>
      {showDeleteModal && (
        <ConfirmModal
          title="Delete"
          text="Do you really want to delete this book?"
          open={showDeleteModal}
          onConfirm={handleDeleteConfirm}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default BookListTable;
