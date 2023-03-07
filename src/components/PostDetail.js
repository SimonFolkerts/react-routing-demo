import { useParams, useLocation } from "react-router-dom";
const PostDetail = () => {
  return (
    <div>
      <h2>param: {useParams().id}</h2>
      <h2>state: {useLocation().state.title}</h2>
    </div>
  );
};

export default PostDetail;
