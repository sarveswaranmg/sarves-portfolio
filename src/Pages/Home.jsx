import { ReactTyped } from "react-typed";
import profileImg from "../assets/final.png";
import "./Home.css";
import Space from "../Components/Space";

function Home() {
  const roles = ["Software Developer.", "ML Engineer.", "Web Designer."];

  return (
    <div className="home-container">
      <Space />

      <div className="img-container">
        <img className="home-image" src={profileImg} alt="profile" />
      </div>

      <div className="home-text">
        <p className="name">I am Sarveswaran,</p>
        <div className="role">
          <ReactTyped
            strings={roles}
            typeSpeed={100}
            backSpeed={50}
            backDelay={2000}
            loop
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
