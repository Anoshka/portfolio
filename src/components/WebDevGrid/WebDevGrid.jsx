import React from "react";
import "./WebDevGrid.scss";
import img1 from "../../assets/images/placeholder_01.png";
import img from "../../assets/images/placeholder.png";

// Project data (update with actual images & links)
const projects = [
  {
    title: "WrigglyBun",
    software: "React | MySQL | Node.JS",
    image: img1,
    link: "#",
    description: `
      A powerful automation tool designed to streamline the character rigging process. 
      This tool significantly reduces the manual effort required, providing a fast, 
      efficient, and consistent rigging workflow.
      
      - Fully automated joint placement and skinning process  
      - Supports both biped and quadruped characters  
      - Intuitive UI for custom adjustments and fine-tuning  
      - Reduces rigging time by up to 70%  
    `,
  },
  {
    title: "Pawdl",
    software: "React | MySQL | Node.JS",
    image: img,
    link: "#",
    description: `
      A collection of custom scripts and tools that enhance the rigging process 
      for animators and technical artists. 

      - Automated weight painting for optimized deformations  
      - Smart joint mirroring and renaming features  
      - Integration with industry-standard tools like Autodesk Maya  
      - Python-based scripting for easy customization  
    `,
  },
  {
    title: "Bell Media Innovation Station",
    software: "React | MySQL | Node.JS",
    image: img,
    link: "#",
    description: `
      Worked on the technical rigging and pipeline automation for the Fireman Sam 
      animated series. Ensured high-quality character movement and compatibility across 
      multiple software platforms.

      - Developed modular rigs for multiple character types  
      - Enhanced facial rigging for expressive animations  
      - Optimized rigs for real-time performance in Unreal Engine  
    `,
  },
  {
    title: "InStock",
    software: "React | MySQL | Node.JS",
    image: img,
    link: "#",
    description: `
      A specialized rigging and animation project for the Lego and Friends franchise. 
      Developed modular rigs that improved the animation pipeline and streamlined character 
      interactions.

      - Implemented Lego-style snapping and articulation for seamless movement  
      - Created reusable animation presets for faster production  
      - Integrated with Unreal Engine for real-time previews  
    `,
  },
  {
    title: "Job Tracker",
    software: "React | MySQL | Node.JS",
    image: img,
    link: "#",
    description: `
      Developed a robust asset management system that integrates seamlessly with 
      existing production pipelines.

      - Supports version control for multiple assets  
      - Automated metadata tagging for easy organization  
      - Cross-platform compatibility with major 3D software  
    `,
  },
  {
    title: "Trivia",
    software: "React | MySQL | Node.JS",
    image: img,
    link: "#",
    description: `
      Technical direction and tool development for the simulation and rigging of 
      a complex train crash sequence.

      - Physics-based rigging system for realistic destruction  
      - Custom animation constraints for smooth motion control  
      - Optimized for high-fidelity rendering in Unreal Engine  
    `,
  },
  {
    title: "Brainflix",
    software: "React | MySQL | Node.JS",
    image: img,
    link: "#",
    description: `
      An automation system that generates procedural crown designs and animations 
      based on user-defined parameters.

      - Generates high-quality, stylized crown models in seconds  
      - Customizable design parameters for unique variations  
      - Seamlessly integrates with existing production workflows  
    `,
  },
  {
    title: "Bandsite",
    software: "React | MySQL | Node.JS",
    image: img,
    link: "#",
    description: `
      An automation system that generates procedural crown designs and animations 
      based on user-defined parameters.

      - Generates high-quality, stylized crown models in seconds  
      - Customizable design parameters for unique variations  
      - Seamlessly integrates with existing production workflows  
    `,
  },
  {
    title: "Coffee Shop",
    software: "React | MySQL | Node.JS",
    image: img,
    link: "#",
    description: `
      An automation system that generates procedural crown designs and animations 
      based on user-defined parameters.

      - Generates high-quality, stylized crown models in seconds  
      - Customizable design parameters for unique variations  
      - Seamlessly integrates with existing production workflows  
    `,
  },
];

const WebDevGrid = () => {
  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <a key={index} href={project.link} className="project-list__item">
          <img
            src={project.image}
            alt={project.title}
            className="project-list__image"
          />
          <div className="project-list__content">
            <h3 className="project-list__title">{project.title}</h3>
            <p className="project-list__software">{project.software}</p>
            <p className="project-list__description">{project.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default WebDevGrid;
