// Import all component views
import BA from "../../Components/Recruitment/RecruitmentPipeline/BA";
import KlArchitech from "../../Components/Recruitment/RecruitmentPipeline/KlArchitech";
import New from "../../Components/Recruitment/RecruitmentPipeline/New";
import Demo from "../../Components/Recruitment/RecruitmentPipeline/Demo";
import Probal from "../../Components/Recruitment/RecruitmentPipeline/Probal";
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
  {
    id: "panel1",
    title: "BA",
    category: "Developer",
    Component: BA,
    subAccordionList: [
      { id: "panel1", title: "Applied" },
      { id: "panel2", title: "Initial" },
      { id: "panel3", title: "Interview" },
      { id: "panel4", title: "Online Meeting" },
      { id: "panel5", title: "Stage 1" },
    ],
  },
  {
    id: "panel2",
    title: "Kl Architech",
    category: "Manager",
    Component: KlArchitech,
    subAccordionList: [
      { id: "panel1", title: "Applied" },
      { id: "panel2", title: "sda" },
      { id: "panel3", title: "Initial" },
    ],
  },
  {
    id: "panel3",
    title: "New",
    category: "Developer",
    Component: New,
    subAccordionList: [
      { id: "panel1", title: "Applied" },
      { id: "panel2", title: "sda" },
      { id: "panel3", title: "Initial" },
    ],
  },
  {
    id: "panel4",
    title: "Demo",
    category: "Recruitment",
    Component: Demo,
    subAccordionList: [
      { id: "panel1", title: "Applied" },
      { id: "panel2", title: "Initial" },
    ],
  },
  {
    id: "panel5",
    title: "Probal",
    category: "Manager",
    Component: Probal,
    subAccordionList: [
      { id: "panel1", title: "Applied" },
      { id: "panel2", title: "Initial" },
    ],
  },
  {
    id: "panel6",
    title: "Manager",
    category: "Manager",
    Component: Manager,
    subAccordionList: [
      { id: "panel1", title: "Applied" },
      { id: "panel2", title: "Initial" },
    ],
  },
  {
    id: "panel7",
    title: "AI Developer",
    category: "Developer",
    Component: AiDeveloper,
    subAccordionList: [
      { id: "panel1", title: "Applied" },
      { id: "panel2", title: "Initial" },
    ],
  },
  {
    id: "panel8",
    title: "Hiring New Data Analysts",
    category: "Recruitment",
    Component: HiringNewDataAnalysts,
    subAccordionList: [
      { id: "panel1", title: "Applied" },
      { id: "panel2", title: "Initial" },
    ],
  },
  {
    id: "panel9",
    title: "Web Developer",
    category: "Developer",
    Component: WebDeveloper,
    subAccordionList: [
      { id: "panel1", title: "Applied" },
      { id: "panel2", title: "Initial" },
    ],
  },
  {
    id: "panel10",
    title: "Software Engineer",
    category: "Developer",
    Component: SoftwareEngineer,
    subAccordionList: [
      { id: "panel1", title: "Applied" },
      { id: "panel2", title: "Initial" },
    ],
  },
  {
    id: "panel11",
    title: "Odoo Developer",
    category: "OdooDeveloper",
    Component: OdooDeveloper,
    subAccordionList: [
      { id: "panel1", title: "Applied" },
      { id: "panel2", title: "Initial" },
    ],
  },
  {
    id: "panel12",
    title: "Social Media Coordi",
    category: "SocialMediaCoordi",
    Component: SocialMediaCoordi,
    subAccordionList: [
      { id: "panel1", title: "Applied" },
      { id: "panel2", title: "Initial" },
    ],
  },
  {
    id: "panel13",
    title: "HR Manager",
    category: "Manager",
    Component: HRManager,
    subAccordionList: [
      { id: "panel1", title: "Applied" },
      { id: "panel2", title: "Initial" },
    ],
  },
  {
    id: "panel14",
    title: "Sales Manager",
    category: "Manager",
    Component: SalesManager,
    subAccordionList: [
      { id: "panel1", title: "Applied" },
      { id: "panel2", title: "Initial" },
    ],
  },
  {
    id: "panel15",
    title: "Software Developer",
    category: "SoftwareDeveloper",
    Component: SoftwareDeveloper,
    subAccordionList: [
      { id: "panel1", title: "Applied" },
      { id: "panel2", title: "Initial" },
    ],
  },
  {
    id: "panel16",
    title: "Machine Learning Engineer",
    category: "MachineLearningEngineer",
    Component: MachineLearningEngineer,
    subAccordionList: [
      { id: "panel1", title: "Applied" },
      { id: "panel2", title: "Initial" },
      { id: "panel3", title: "Interview" },
      { id: "panel4", title: "SkillTest" },
      { id: "panel5", title: "Onboarding" },
    ],
  },
  {
    id: "panel17",
    title: "Spring-25",
    category: "Spring25",
    Component: Spring25,
    subAccordionList: [
      { id: "panel1", title: "Applied" },
      { id: "panel2", title: "Initial" },
    ],
  },
  {
    id: "panel18",
    title: "Data Analyst",
    category: "DataAnalyst",
    Component: DataAnalyst,
    subAccordionList: [
      { id: "panel1", title: "Applied" },
      { id: "panel2", title: "Initial" },
    ],
  },
];