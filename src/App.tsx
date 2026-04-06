import { Canvas, useThree } from '@react-three/fiber'
import { useTexture, Stars } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useScroll } from './hooks/scroll';
import * as THREE from "three";

import Computer from './models/Computer';

import "./App.css"
import Cap from './models/Cap';
import Plane from './models/Plane';
import Hammer from './models/Hammer';
import Sign from './models/Sign';
import Card from './components/Card';
import Info from './components/Info';


function Background() {
  const texture = useTexture("/texture/space.jpg");
  const { scene } = useThree();

  useEffect(() => {
    scene.background = texture
  }, [scene, texture])


  return null;
}

function App() {
  const textRef = useRef<HTMLDivElement>(null!);
  const scroll = useScroll(textRef);

  return (
    <>
      <div id="canvas">
        <Canvas
          camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 2] }}
          gl={{
            outputColorSpace: THREE.LinearSRGBColorSpace,
            toneMapping: THREE.NoToneMapping,
          }}
          flat>
          <Background />
          <ambientLight color={0xffffff} intensity={0.25} />

          <Computer scroll={scroll} />
          <Cap scroll={scroll} />
          <Plane scroll={scroll} />
          <Hammer scroll={scroll} />
          <Sign scroll={scroll} />

          <Stars />

        </Canvas>
      </div>
      <div id="text" ref={textRef}>

        <section>
          <div className="container">
            <div className="panel panel-text">
              <Card title="Pierre Quereuil" elements={[
                {
                  name: "Introduction",
                  content: "Hello everyone, welcome to my website! I'm Pierre, a software engineer with interests in Full Stack Development, Web, Mobile, AI/ML, Data Engineering, and many other things... My resume and links to other relevant platforms are above, but keep scrolling through for some more information on me."
                },
                {
                  name: "About Me",
                  content: "I'm French-American, raised in San Francisco and currently located in Durham, NC. Besides writing software, I'm a huge sports fan - PSG / France soccer, GSW / Duke basketball, and a massive movie nerd (check out my Letterboxd [here](https://letterboxd.com/pierrequereuil/)). I also love skiing, and you'll likely find me on the slopes near Lake Tahoe as much as possible."
                },
                {
                  name: "Website Details",
                  content: "This site stemmed out of my fiddling with Three JS (and is inspired by Fireship's video on the topic). It's written in React, Typescript, React Three Fiber, and hosted on Vercel - the full source code can be found on my Github, along with its 2D predecessor. Models are sourced from [poly.pizza](poly.pizza), and their individual attribution can be found in the info section at the top right. Keep scrolling for more!"
                },
              ]} />
            </div>
            <div className="panel panel-empty">
              <Info link="https://poly.pizza/m/doMMnviJrGi"/>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="panel panel-empty">
              <Info link="https://poly.pizza/m/4v0sRFH6PN9"/>
            </div>
            <div className="panel panel-text">
              <Card title="Education" elements={[
                { name: "Bachelor of Sciences, Computer Science @ Duke University", subtitle: "Durham, NC | September 2023 - May 2026", content: "Formerly class of '27, I completed a B.S. in Computer Science with a concentration in AI/ML and a minor in Statistical Science in 3 years. I held a GPA of 3.8 with a Dean's List Honors in Fall '24. \nRelevant courses: Design and Analysis of Algorithms, Elements of Machine Learning, Intro to Database Systems, Computer Architecture, Regression Theory Applications, Machine Learning & Data Mining. \nMy activities include being a Software Research Intern at Prof. Seaman's Lab (more on that next), a Fullstack Software Engineer at Duke Applied Machine Learning, an athlete at Duke Club Ski & Board, and a volunteer at Durham Robotics Mentorship." },
                { name: "Baccalauréat & U.S. High School Diploma @ LFSF", subtitle: "San Francisco, CA | September 2019 - May 2023", content: "Completed dual French/American curriculum at the Lycée Français de San Franciso. Received highest honors (félicitations du jury) at the French national exam." }
              ]} />
            </div>

          </div>
        </section>

        <section>
          <div className="container">
            <div className="panel panel-text">
              <Card title="Professional Experience" elements={[
                {
                  name: "UI / UX Software Development Intern @ Reliable Robotics",
                  subtitle: "Mountain View, CA | May - August 2026 | Upcoming!",
                  content: ""
                },
                {
                  name: "Research Software Engineering Intern @ Prof. Seaman Duke Lab",
                  subtitle: "Durham, NC | September 2025 - May 2026",
                  content: "Developed backend systems for the Insight Engine 2.0 project, including database pipelines in Go and a tree rendering system in Unreal Engine C++. Designed robust AWS Lambda API endpoints for data exchange between backend and Unreal Frontend, and performed complexity analysis for performance improvements on dynamic tree generation.",
                },
                {
                  name: "Lead Software Development Intern @ AI Camp",
                  subtitle: "Remote (CA) | January 2022 - January 2024",
                  content: "Involved in various projects as the lead software developer: a suite of analytical tools to support a community of financial traders (including an AI-driven Slack client), an exploratory data analysis website for a social media creator client (combined 100,000 followers across platforms). Managed backend infrastructure, designed responsive UI/UX, implemented robust CI/CD pipelines, and led live demos with our clients."
                }
              ]} />
            </div>
            <div className="panel panel-empty">
              <Info link="https://poly.pizza/m/a3XrQkLNna9"/>
            </div>
          </div>
        </section>

        <section >
          <div className="container">
            <div className="panel panel-empty">
              <Info link="https://poly.pizza/m/66FnMJl5fs"/>
            </div>
            <div className="panel panel-text">
              <Card title="Project Highlights" elements={[
                { name: "Mini Neural Network", subtitle: "C, + a little standard lib (too scared to rewrite malloc)", content: "Machine learning library built from scratch in pure C.", link: "https://github.com/dubitable/MiniNN" },
                { name: "Flight Tracker", subtitle: "Remix Run, Amadeus / OpenSky API", content: "Live tracking and route info for flights (commercial/non-commercial).",  link: "https://github.com/dubitable/FlightTracker" },
                { name: "Stock Ticker Tracker", subtitle: "React, Typescript, Docker, PostgreSQL, Slack API", content: "Slack-integrated tool suite for stock trend analysis. Proprietary, no link :(" },
                { name: "Social Media Analytics", subtitle: "Next.js, Tensorflow, Vercel", content: "Sentiment analysis dashboard built for social media creator client.  Proprietary." }
              ]} />
            </div>
          </div>
        </section>

        <section >
          <div className="container">
            <div className="panel panel-text">
              <Card title="Quick Links" elements={[
                {name: "Links", content: "Thanks for looking through everything! This is a very condensed portrayal of myself, so check me out on [Github](https://github.com/dubitable), on [LinkedIn](https://www.linkedin.com/in/pierre-quereuil), or take a look at my [resume](https://docs.google.com/document/d/1thTzOxcV5SnmgqW7FAgDT1RiQYXXj_mMpNp-K4RIKvE/edit?usp=sharing)!. I don't generally use any other socials - any out there are probably severely outdated..."},
                {name: "Contact Info", content: "Feel free to reach out at pierrequereuil@gmail.com for any inquiries, or just to ask me how my day is going. Try not to sign me up for any newsletters though."},
                {name: "Not Gotten Enough of Me Yet?", content: "Unfortunately, that's where this website ends. Feel free to go back up to the top [here](/). Or head back in a few weeks and I might've added something cool in the meantime."}
              ]} />
            </div>
            <div className="panel panel-empty">
              <Info link="https://poly.pizza/m/ZaBVh3kaEy"/>
            </div>
          </div>

        </section>
      </div>
    </>

  )
}

export default App;