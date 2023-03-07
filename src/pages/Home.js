import PostList from "../components/PostList";

const Home = () => {
  const posts = [
    { id: 1, title: "First Post", content: "This is the first post." },
    { id: 2, title: "Second Post", content: "This is the second post." },
    { id: 3, title: "Third Post", content: "This is the third post." },
  ];

  return (
    <div>
      <h2>Home Page</h2>
      <PostList posts={posts}></PostList>
    </div>
  );
};

export default Home;
