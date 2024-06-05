import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface OptionsMenuProps {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  onClose: () => void;
  anchor: null | HTMLElement;
}

const OptionsMenu = ({ anchor, onClick, onClose }: OptionsMenuProps) => {
  return (
    <>
      <IconButton onClick={onClick} sx={{ marginLeft: "auto" }} aria-label="more">
        <MoreHorizIcon />
      </IconButton>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={onClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={onClose}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={onClose}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default OptionsMenu;
