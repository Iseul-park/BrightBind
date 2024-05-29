import LogoutIcon from "@mui/icons-material/Logout";
import LogoutLink from "../LogoutLink";
import { Button } from "@mui/material";

interface logoutBtnProp {
  open: boolean;
}
const LogoutButton = ({ open }: logoutBtnProp) => {
  return open ? (
    <LogoutLink>
      <Button
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          minWidth: 0,
          mt: 1.5,
          //color: theme.palette.primary.main,
        }}
        startIcon={<LogoutIcon />}
      >
        Log out
      </Button>
    </LogoutLink>
  ) : (
    <LogoutLink>
      <Button
        startIcon={
          <LogoutIcon
            sx={{
              minWidth: 0,
              mt: 1.5,
              ml: 1.5,
              justifyContent: "center",
            }}
          />
        }
      ></Button>
    </LogoutLink>
  );
};

export default LogoutButton;
