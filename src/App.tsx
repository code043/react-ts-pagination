import React, { useState, useEffect } from "react";
import { useFetch } from "./hooks/useFetch";
import Follower from "./components/Follower";

interface FollowerType {
  id: number;
}

const App: React.FC = () => {
  const { loading, data } = useFetch(
    "https://api.github.com/users/node/followers?per_page=100"
  );
  const [page, setPage] = useState<number>(0);
  const [followers, setFollowers] = useState<FollowerType[]>([]);

  useEffect(() => {
    if (loading) return;
    setFollowers(data[page]);
  }, [loading, page, data]);

  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > data.length - 1) {
        nextPage = 0;
      }
      return nextPage;
    });
  };

  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = data.length - 1;
      }
      return prevPage;
    });
  };

  const handlePage = (index: number) => {
    setPage(index);
  };

  return (
    <main>
      <div className="section-title">
        <h1>{loading ? "loading..." : "pagination"}</h1>
        <div className="underline"></div>
      </div>
      <section className="followers">
        <div className="container">
          {followers.map((follower) => (
            <Follower
              avatar_url={""}
              html_url={""}
              login={""}
              key={follower.id}
              {...follower}
            />
          ))}
        </div>
        {!loading && (
          <div className="btn-container">
            <button className="prev-btn" onClick={prevPage}>
              prev
            </button>
            {data.map((_item: FollowerType[], index: number) => (
              <button
                key={index}
                className={`page-btn ${index === page ? "active-btn" : ""}`}
                onClick={() => handlePage(index)}
              >
                {index + 1}
              </button>
            ))}
            <button className="next-btn" onClick={nextPage}>
              next
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default App;
