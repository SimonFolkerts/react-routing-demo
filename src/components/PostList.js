import { Link } from "react-router-dom";

const PostList = ({ posts }) => {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/posts/${post.id}`} state={post}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
