import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllBooksService } from "../services/book.services";
import ClipLoader from "react-spinners/ClipLoader";

function Home() {
  const navigate = useNavigate();

  const [allBooks, setAllBooks] = useState(null);

  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = async () => {
    try {
      const response = await getAllBooksService();
      setAllBooks(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    }
  };

  return (
    <div>
      { allBooks === null && <ClipLoader color={"black"}/>}

      {
        allBooks!== null && allBooks.map((eachBook) => {
          return (
            <div key={eachBook._id}>
              <Link to={`/books/${eachBook._id}`}>{eachBook.title}</Link>
            </div>
          )
        })
      }
    </div>
  );
}

export default Home;
