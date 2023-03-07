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
- `NavLink` is a component that creates a link to a specified route and applies an `active` class to the link when the current route matches the link's `to` prop. This makes it easy to style the active link differently from the other links in a navbar, for example.
- `NavLink` also supports `exact`, which allow you to further customize how the active link is styled and matched to the current route.

We can add some css to style the active class on the `NavLink`:

```css
a.active {
  font-weight: bold;
}
```
