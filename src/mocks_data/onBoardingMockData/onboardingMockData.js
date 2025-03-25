// Import all component views
import Reguitment from "../../Components/OnBoarding/OnBoardingView/Reguitment";
import BA from "../../Components/OnBoarding/OnBoardingView/BA";
import KlArchitech from "../../Components/OnBoarding/OnBoardingView/KlArchitech";
import New from "../../Components/OnBoarding/OnBoardingView/New";
import Demo from "../../Components/OnBoarding/OnBoardingView/Demo";
import Probal from "../../Components/OnBoarding/OnBoardingView/Probal";
import Pzda from "../../Components/OnBoarding/OnBoardingView/Pzda";
import Manager from "../../Components/OnBoarding/OnBoardingView/Manager";
import AiDeveloper from "../../Components/OnBoarding/OnBoardingView/AiDeveloper";
import HiringNewDataAnalysts from "../../Components/OnBoarding/OnBoardingView/HiringNewDataAnalysts";
import WebDeveloper from "../../Components/OnBoarding/OnBoardingView/WebDeveloper";
import SoftwareEngineer from "../../Components/OnBoarding/OnBoardingView/SoftwareDeveloper";
import HRManager from "../../Components/OnBoarding/OnBoardingView/HRManager";
import SalesManager from "../../Components/OnBoarding/OnBoardingView/SalesManager";

/* 
    Array of accordion items with their corresponding components.
    Each item has:
    - `id`: Unique identifier
    - `title`: Display name of the accordion
    - `category`: Used for filtering (Recruitment, Developer, Manager)
    - `component`: Corresponding React component for each section
  */

export const onBoardingAccordionList = [
  {
    id: "panel1",
    title: "Recruitment",
    category: "Recruitment",
    component: <Reguitment />,
  },
  { id: "panel2", title: "BA", category: "Developer", component: <BA /> },
  {
    id: "panel3",
    title: "Kl Architech",
    category: "Manager",
    component: <KlArchitech />,
  },
  { id: "panel4", title: "New", category: "Developer", component: <New /> },
  { id: "panel5", title: "Demo", category: "Recruitment", component: <Demo /> },
  { id: "panel6", title: "Prob", category: "Manager", component: <Probal /> },
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
    title: "Hiring Ne    w Data Analysts",
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
    title: "HR Manager",
    category: "Manager",
    component: <HRManager />,
  },
  {
    id: "panel14",
    title: "Sales Manager",
    category: "Manager",
    component: <SalesManager />,
  },
];
