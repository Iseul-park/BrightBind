import AuthorizeView from "../Components/AuthorizeView.tsx";
import BookListTable from "../Components/BookListTable.tsx";

function Book() {
  return (
    <AuthorizeView>
      <h1 id="tabelLabel">Book List</h1>
      <BookListTable />
    </AuthorizeView>
  );
}

export default Book;
