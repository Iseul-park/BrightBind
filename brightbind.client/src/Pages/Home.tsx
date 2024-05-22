import LogoutLink from "../Components/LogoutLink.tsx";
import AuthorizeView, { AuthorizedUser } from "../Components/AuthorizeView.tsx";

function Home() {
  return (
    <AuthorizeView>
      <span>
        <LogoutLink>
          Logout <AuthorizedUser value="email"></AuthorizedUser>
        </LogoutLink>
      </span>
      <h1>
        Hello! <AuthorizedUser value="email"></AuthorizedUser>{" "}
      </h1>
    </AuthorizeView>
  );
}

export default Home;
