import "./App.css";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Projects from "./Pages/Projects";
import Skills from "./Pages/Skills";
import Education from "./Pages/Education";
import Contact from "./Pages/Contact";
function App() {
  return (
    <>
      <NavBar></NavBar>
      <div id="home">
        <Home></Home>
      </div>
      <div id="about">
        <About></About>
      </div>
      <div id="projects">
        <Projects></Projects>
      </div>
      <div id="skills">
        <Skills></Skills>
      </div>
      <div id="education">
        <Education></Education>
      </div>
      <div id="contact">
        <Contact></Contact>
      </div>
    </>
  );
}

export default App;
