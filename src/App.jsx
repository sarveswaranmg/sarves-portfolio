import "./App.css";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Projects from "./Pages/Projects";
import Skills from "./Pages/Skills";
function App() {
  return (
    <>
      <NavBar></NavBar>
      <Home></Home>
      <About></About>
      <Projects></Projects>
      <Skills></Skills>
    </>
  );
}

export default App;
