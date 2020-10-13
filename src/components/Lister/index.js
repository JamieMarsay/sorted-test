import React, { useEffect, useState } from "react";
import getPosts from "../../services/posts";
import Post from "./Post";
import CreatePost from "./CreatePost";
import Loader from "../Loader/Loader";

const Lister = () => {
  const [loading, setLoading] = useState(true);
  const [allPosts, setPosts] = useState([]);

  const noPosts = allPosts.length === 0;

  useEffect(() => {
    getPosts().then((data) => {
      setLoading(false);
      setPosts(data);
    });
  }, []);

  const onDeletePost = (id) => {
    setPosts(allPosts.filter((post) => post.id !== id));
  };

  const onCreatePost = (post) => {
    setPosts((prev) => [...prev, post]);
  };

  return (
    <div className="postList">
      {loading ? (
        <Loader />
      ) : (
        <div className="postList__inner">
          <CreatePost onCreate={onCreatePost} />
          <div>
            {allPosts.map((post) => (
              <Post
                key={`${post.title}-${post.author}`}
                {...post}
                onDelete={() => onDeletePost(post.id)}
              />
            ))}

            {/* Could be abstracted out into alert of some kind  */}
            {noPosts && !loading && (
              <h3 className="text--info">No posts available...</h3>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Lister;
