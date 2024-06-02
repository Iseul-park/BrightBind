import AuthorizeView from "../Components/AuthorizeView.tsx";
import BookListTable from "../Components/BookListTable.tsx";

function Book() {
  return (
    <AuthorizeView>
      <BookListTable />
    </AuthorizeView>
  );
}

export default Book;
