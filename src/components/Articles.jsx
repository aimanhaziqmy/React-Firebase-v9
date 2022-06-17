import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import DeleteArticle from "./DeleteArticle";
import { useAuthState } from "react-firebase-hooks/auth";
export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [user] = useAuthState(auth);
  useEffect(() => {
    const articleRef = collection(db, "Articles");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const articles = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setArticles(articles);
    });
  });
  return (
    <div>
      {articles.length === 0 ? (
        <p>No article found</p>
      ) : (
        articles.map((article) => (
          <div key={article.id} className="border mt-3 p-3 bg-light">
            <div className="row">
              <div className="col-3">
                <img
                  src={article.imageUrl}
                  alt="title"
                  style={{ height: 180, width: 180 }}
                />
              </div>
              <div className="col-9 ps-3">
                <div className="row">
                  <div className="col-6">
                    {createdBy && (
                      <span className="badge bg-primary">{createdBy}</span>
                    )}
                  </div>
                  <div className="col-6 d-flex flex-row-reverse">
                    {user && user.uid === article.userId && (
                      <DeleteArticle
                        id={article.id}
                        imageUrl={article.imageUrl}
                      />
                    )}
                  </div>
                </div>
                <h2>{article.title}</h2>
                <p> {article.createdAt?.toDate().toDateString()}</p>
                <p>{article.description}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
