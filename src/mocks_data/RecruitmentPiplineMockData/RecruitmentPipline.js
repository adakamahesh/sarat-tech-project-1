// Import all component views
import BA from "../../Components/Recruitment/RecruitmentPipeline/BA";
import KlArchitech from "../../Components/Recruitment/RecruitmentPipeline/KlArchitech";
import New from "../../Components/Recruitment/RecruitmentPipeline/New";
import Demo from "../../Components/Recruitment/RecruitmentPipeline/Demo";
import Probal from "../../Components/Recruitment/RecruitmentPipeline/Probal";
import Pzda from "../../Components/Recruitment/RecruitmentPipeline/Pzda";
import Manager from "../../Components/Recruitment//RecruitmentPipeline/Manager";
import AiDeveloper from "../../Components/Recruitment/RecruitmentPipeline/AiDeveloper";
import HiringNewDataAnalysts from "../../Components/Recruitment/RecruitmentPipeline/HiringNewDataAnalysts";
import WebDeveloper from "../../Components/Recruitment/RecruitmentPipeline/WebDeveloper";
import SoftwareEngineer from "../../Components/Recruitment/RecruitmentPipeline/SoftwareEngineer";
import OdooDeveloper from "../../Components/Recruitment/RecruitmentPipeline/OdooDeveloper";
import SocialMediaCoordi from "../../Components/Recruitment/RecruitmentPipeline/SocialMediaCoordi";
import HRManager from "../../Components/Recruitment/RecruitmentPipeline/HRManager";
import SalesManager from "../../Components/Recruitment/RecruitmentPipeline/SalesManager";
import SoftwareDeveloper from "../../Components/Recruitment/RecruitmentPipeline/SoftwareDeveloper";
import MachineLearningEngineer from "../../Components/Recruitment/RecruitmentPipeline/MachineLearningEnginner";
import Spring25 from "../../Components/Recruitment/RecruitmentPipeline/Spring25";
import DataAnalyst from "../../Components/Recruitment/RecruitmentPipeline/DataAnalyst";

/* 
    Array of accordion items with their corresponding components.
    Each item has:
    - `id`: Unique identifier
    - `title`: Display name of the accordion
    - `category`: Used for filtering (Recruitment, Developer, Manager)
    - `component`: Corresponding React component for each section
  */

export const RecruitmentPipeline = [
  { id: "panel1", title: "BA", category: "Developer", component: <BA /> },
  {
    id: "panel2",
    title: "Kl Architech",
    category: "Manager",
    component: <KlArchitech />,
  },
  { id: "panel4", title: "New", category: "Developer", component: <New /> },
  { id: "panel5", title: "Demo", category: "Recruitment", component: <Demo /> },
  { id: "panel6", title: "Probal", category: "Manager", component: <Probal /> },
  { id: "panel7", title: "Pzda", category: "Recruitment", component: <Pzda /> },
  {
    id: "panel8",
    title: "Manager",
    category: "Manager",
    component: <Manager />,
  },
  {
    id: "panel9",
    title: "AI Developer",
    category: "Developer",
    component: <AiDeveloper />,
  },
  {
    id: "panel10",
    title: "Hiring New Data Analysts",
    category: "Recruitment",
    component: <HiringNewDataAnalysts />,
  },
  {
    id: "panel11",
    title: "Web Developer",
    category: "Developer",
    component: <WebDeveloper />,
  },
  {
    id: "panel12",
    title: "Software Engineer",
    category: "Developer",
    component: <SoftwareEngineer />,
  },
  {
    id: "panel13",
    title: "Odoo Developer",
    category: "OdooDeveloper",
    component: <OdooDeveloper />,
  },
  {
    id: "panel14",
    title: "Social Media Coordi",
    category: "SocialMediaCoordi",
    component: <SocialMediaCoordi />,
  },
  {
    id: "panel15",
    title: "HR Manager",
    category: "Manager",
    component: <HRManager />,
  },
  {
    id: "panel16",
    title: "Sales Manager",
    category: "Manager",
    component: <SalesManager />,
  },
  {
    id: "panel17",
    title: "Software Developer",
    category: "SoftwareDeveloper",
    component: <SoftwareDeveloper />,
  },
  {
    id: "panel18",
    title: "Machine Learning Engineer",
    category: "MachineLearningEngineer",
    component: <MachineLearningEngineer />,
  },
  {
    id: "panel19",
    title: "Spring-25",
    category: "Spring25",
    component: <Spring25 />,
  },
  {
    id: "panel20",
    title: "Data Analyst",
    category: "DataAnalyst",
    component: <DataAnalyst />,
  },
];
