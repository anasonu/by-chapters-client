import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import PublishedBooks from "../../components/PublishedBooks.jsx";
import { getAuthorDetailService } from "../../services/author.services.js";

function AuthorProfile() {
  const navigate = useNavigate();
  const { authorId } = useParams();

    const [authorDetails, setAuthorDetails] = useState(null)

    useEffect(() => {
        getAuthorDetails();
    }, []);

    const getAuthorDetails = async () => {
        try {
            const response = await getAuthorDetailService(authorId);
            setAuthorDetails(response.data);
        } catch (error) {
            navigate("/error");
        }
    }

  if (authorDetails === null) {
    return <ClipLoader color={"black"} />;
  }

  return (
    <div className="profile-container">
      <h3>Perfil de {authorDetails.username}</h3>
    <div className="profile-info-container">
      <p className="profile-description">{authorDetails.description}</p>

    </div>
      <PublishedBooks authorDetails={authorDetails} />
    </div>
  );
}

export default AuthorProfile;
