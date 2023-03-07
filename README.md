# Using React Router

## Simplified Implementation

First we create a new project, removing unneccesary boilerplate.

To add the ability to switch pages, we can either use conditional rendering to display different components depending on state, or we can change the way the site is rendered on reload.
Doing this on reload is inefficient as it requires the entire site to be re-rendered, so we would rather dynamically swap out different views using JS without reload.

Rather than code this ourselves, we can use a prebuilt solution, called `react-router-dom`.

### Installation

`npm install react-router-dom`

### Implementing the Router and Routes

React router has several parts to it that can be used to construct a router system for displaying different pages.

The `BrowserRouter` is the main wrapper within which routing is enabled. It usually goes around the entire app.
`Routes` is the container in which each Route is rendered.
A `Route` is one of the specific paths that can be visited in the front end, each has a main component associated with it.

The individual `Route` componenets must be defined, and given a path and an element to render. You can do this directly in the `Routes` container, or imported in from a separate file.
In this example we will use a separate file to keep things organised.

Create a new file `Routes.js` in your project's root directory. This file will contain all the routes of your application.

```javascript
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
```

In this example, we define four routes: `/` for the Home component, `/about` for the About component, `/contact` for the Contact component, and `*` for the NotFound component.

Create your components that will be used as routes. You can organise these into a folder, in the above example they are in a folder called 'pages'. For example, Home.js could look like this:

```javascript
const Home = () => {
  return <h1>Welcome to my website!</h1>;
};

export default Home;
```

In your main App.js file, import the `Routes`,

```javascript
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
};

export default App;
```

The BrowserRouter component wraps around the App, enabling the router functionality within its scope. We can then specify where we want the Routes to be rendered by placing the `<Routes />` component into the template. This is where the pages created earlier will be rendered.

Now by entering the routes into the address bar, it is possible to render different views based on the url

### Navigation with Links

We can also create special links that allow the user to trigger page switches by clicking on them.
We can create a navbar as part of the main app that is persistent and remains in place while the views switch.

First, create a new component Navbar.js:

```javascript
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
```

The link for the currently active page will by default have a class of active applied to it

Import the Navbar component in your App.js file and add it above the Routes component:

```javascript
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Navbar from "./Navbar";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
};

export default App;
```

Both `Link` and `NavLink` are components provided by `react-router-dom` that can be used to create links between different routes in your application. However, there are some differences in how they work.

The main difference between `Link` and `NavLink` is that `NavLink` provides some additional features for styling and behavior, specifically for links that represent the current active route. Here are some key differences:

- `Link` is a basic component that creates a normal link to a specified route. It does not provide any special styling or behavior by default.
- `NavLink` is a component that creates a link to a specified route and applies an `activeClassName` to the link when the current route matches the link's `to` prop. This makes it easy to style the active link differently from the other links in a navbar, for example.
- `NavLink` also supports additional props like `activeStyle` and `exact`, which allow you to further customize how the active link is styled and matched to the current route.

We can add some css to style the active class on the `NavLink`:

```css
a.active {
  font-weight: bold;
}
```

## List/Detail Model

As well as page like navigation using a navbar, we can use `Link` components to enable the user to click on a list item and be taken to a detailed view of that list item.

Assume we have a list of blog posts that we want to display on a page, and we want to create a link for each post that takes the user to a detail view for that post.

Create a new component `PostList.js` that will display the list of blog posts:

```javascript
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
```

In this example, we're using a `Link` component to create a link to the detail view for each blog post. The URL for the link is constructed using the `post.id` value. We are also passing a value into a prop called State.
There are two ways that are being used here to transfer data between pages. We can use the dynamic url to put data into the url, like an id for example. This is accessed in the child using `useParams` hook.
The other way is with the state prop, that can pass data through without encoding it into the URL. It is accessed with the `useLocation` hook in the child. We will demonstrate both.

Create a new component `PostDetail.js` that will display the details for a single blog post:

```javascript
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
```

Here the child is importing both useParams and useLocation. useParams, when called, returns an object that contains properties that prepresent the params in the url, as specified in the Routes component.
useLocation allows us access to the state cache, inside which is stored whatever was passed through the link in the parent. In the example we are accessing the title of the value in the state.

Which method you use depends on where the data is coming from and how it should be transmitted, either through the url or as a transfer of data through the state.

If you were pulling this data from an API, then you would probably want to use params. Each list item is a Link that when clicked on will load the detail view up, sending the id of the clicked item through as a url param.
This param is then read in the detail view using useParam and then appended to the url of a GET request using fetch() to GET the item by id.

If the data is local then the state cache would make more sense.

We can implement the post list on the `Home.js` component

```javascript
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
```

You can see that the post list is added and being passed into the `PostList` component.

Now we need to add a route for the detail view.

```javascript
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PostDetail from "./components/PostDetail";
import NotFound from "./pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
```

Now we have a route with a dynamic segment. Each list item gets a link that goes to this route, but each gets its own id attached to the route as a param. When a link is clicked, the detail view on the route loads, and receives
the id of the link that was clicked. This could then be used to make a GET to the API for example.

In addition, each link also is making use of the state cache. The post that is being used to generate the link is being passed into the state cache, where it can then be accessed in the detail view using useLocation().

Two different means of transmitting data from page to page.
