import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Home from "./pages/Home";
import Error from "./pages/Error";
import AddBook from "./pages/AddBook";
import BookDetail from "./pages/BookDetail";
import ChapterDetail from "./pages/ChapterDetail";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import IsPrivate from "./components/IsPrivate";
import AddChapter from "./pages/AddChapter";

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
