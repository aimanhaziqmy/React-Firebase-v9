import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db, auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, onSnapshot } from "firebase/firestore";
import LikeArticle from "./LikeArticle";
import Comment from "./Comment";

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const docRef = doc(db, "Articles", id);
    onSnapshot(docRef, (snapshot) => {
      setArticle({ ...snapshot.data(), id: snapshot.id });
    });
  }, []);

  return (
    <div className="container border bg-light" style={{ marginTop: 100 }}>
      {article && (
        <div className="row">
          <div className="col-3">
            <img
              src={article.imageUrl}
              alt={article.title}
              style={{ width: "100%", padding: 10 }}
              className="img-fluid"
            />
          </div>
          <div className="col-9 mt-3">
            <h2>{article.title}</h2>
            <h5>Author : {article.createdBy}</h5>
            <div>posted on : {article.createdAt.toDate().toDateString()}</div>
            <hr />
            <div>{article.description}</div>

            <div className="d-flex flex-row-reverse">
              {user && <LikeArticle id={id} likes={article.likes} />}
              <div className="pe-2">
                <p>{article.likes.length}</p>
              </div>
            </div>
            <Comment id={id} />
          </div>
        </div>
      )}
    </div>
  );
}
