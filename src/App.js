import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home";
import Error from "./pages/error-pages/Error";
import AddBook from "./pages/books/AddBook";
import BookDetail from "./pages/books/BookDetail";
import ChapterDetail from "./pages/chapters/ChapterDetail";
import NotFound from "./pages/error-pages/NotFound";
import Profile from "./pages/profile/Profile";
import IsPrivate from "./components/IsPrivate";
import AddChapter from "./pages/chapters/AddChapter";
import EditChapter from "./pages/chapters/EditChapter";
import EditBook from "./pages/books/EditBook";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/books/:bookId" element={<BookDetail />} />
        <Route
          path="/books/:bookId/edit"
          element={
            <IsPrivate>
              <EditBook />
            </IsPrivate>
          }
        />
        <Route
          path="/new-book"
          element={
            <IsPrivate>
              <AddBook />
            </IsPrivate>
          }
        />
        <Route
          path="/books/:bookId/new-chapter"
          element={
            <IsPrivate>
              <AddChapter />
            </IsPrivate>
          }
        />
        <Route
          path="/books/:bookId/:chapterId"
          element={
            <IsPrivate>
              <ChapterDetail />
            </IsPrivate>
          }
        />
        <Route
          path="/books/:bookId/:chapterId/edit"
          element={
            <IsPrivate>
              <EditChapter />
            </IsPrivate>
          }
        />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <Profile />
            </IsPrivate>
          }
        />

        <Route path="/error" element={<Error />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
