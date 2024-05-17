import WeatherForcast from "../Components/WeatherForcast.tsx";
import LogoutLink from "../Components/LogoutLink.tsx";
import AuthorizeView, { AuthorizedUser } from "../Components/AuthorizeView.tsx";
import BookListPage from "./BookListPage.tsx";

function Home() {
  return (
    <AuthorizeView>
      <span>
        <LogoutLink>
          Logout <AuthorizedUser value="email"></AuthorizedUser>
        </LogoutLink>
      </span>
      <BookListPage></BookListPage>
    </AuthorizeView>
  );
}

export default Home;
