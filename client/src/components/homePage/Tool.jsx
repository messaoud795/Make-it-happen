import React, { useEffect } from "react";
import "./Tool.css";
import pomodoro from "../../pictures/pomodoro.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Tool() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    });
  }, []);
  return (
    <div className="home__pomodoro">
      <h1>Get things done </h1>
      <div className="pomodoro__description">
        <ul>
          <li data-aos="fade-down">
            Use Pomodoro tool: an effective tool that boost focus and improve
            performance.The concept is to concentrate on the task on hand for
            short period like 15mn then relax and repeat this cycle again.
          </li>
          <li data-aos="fade-down" data-aos-delay={5000}>
            this website will keep track of your performances and set
            accordingly a new target for you in order to improve your capacities
            in continous way.
          </li>
        </ul>
        <img src={pomodoro} alt="" className="pomodoro__img" />{" "}
      </div>
    </div>
  );
}
