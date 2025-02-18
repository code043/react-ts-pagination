import React from "react";

interface FollowerProps {
  avatar_url: string;
  html_url: string;
  login: string;
}

const Follower: React.FC<FollowerProps> = ({ avatar_url, html_url, login }) => {
  return (
    <article className="card">
      <img src={avatar_url} alt={login} />
      <h4>{login}</h4>
      <a href={html_url} className="btn">
        view profile
      </a>
    </article>
  );
};

export default Follower;
