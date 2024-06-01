import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface DrawerHandlerProps {
  open: boolean;
  onClick: () => void;
}

const DrawerHandler = ({ open, onClick }: DrawerHandlerProps) => {
  const theme = useTheme();

  const DrawerHandlerDiv = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 2),
    borderRight: "none",
    ...theme.mixins.toolbar,
  }));

  return (
    <DrawerHandlerDiv>
      <IconButton onClick={onClick}>
        {open ? (
          theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )
        ) : theme.direction === "rtl" ? (
          <ChevronLeftIcon />
        ) : (
          <ChevronRightIcon />
        )}
      </IconButton>
    </DrawerHandlerDiv>
  );
};

export default DrawerHandler;
