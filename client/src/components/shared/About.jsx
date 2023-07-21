import React from "react";
import Stack from "react-bootstrap/Stack";
import NavBar from "../shared/Nav";
import Footer from "../shared/Footer";
import "../../sass/app.scss";
import DeleteButton from "./DeleteButton"

const About = () => {
    
    return (
    <div className="Profile">
      <NavBar></NavBar>
      <div className="profiletext">
      <Stack gap={3}>
      <div className="fieldname">Name: <span className="userinfo">{profile._doc.name}</span></div>
      <div className="fieldname">Email: <span className="userinfo">{profile._doc.email}</span></div>
      <div className="blank"></div>
      </Stack>
      </div>
      <DeleteButton></DeleteButton>
      <Footer></Footer>
    </div>
  );
};

export default About;