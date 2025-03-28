// Import all component views
import Offboarding from "../../Components/Offboarding/ExitProcess/Offboarding";
import Releive from "../../Components/Offboarding/ExitProcess/Releive";
import Title from "../../Components/Offboarding/ExitProcess/Title";
import Daassadbkcba from "../../Components/Offboarding/ExitProcess/Daassadbkcba";
import Zxasd from "../../Components/Offboarding/ExitProcess/Zxasd";
import Owasa from "../../Components/Offboarding/ExitProcess/Owasa";

/* 
    Array of accordion items with their corresponding components.
    Each item has:
    - `id`: Unique identifier
    - `title`: Display name of the accordion
    - `category`: Used for filtering (Recruitment, Developer, Manager)
    - `component`: Corresponding React component for each section
  */

export const ExitProcess = [
  {
    id: "panel1",
    title: "Offboarding",
    category: "Developer",
    Component: Offboarding,
    subAccordionList: [
      { id: "panel1", title: "notice Period" },
      { id: "panel2", title: "Exit interview" },
      { id: "panel3", title: "Work Handover" },
      { id: "panel4", title: "FNF" },
      { id: "panel5", title: "Farewell" },
      { id: "panel6", title: "qweqwe" },
      { id: "panel7", title: "Trial" },
    ],
  },
  {
    id: "panel2",
    title: "Releive",
    category: "Releive",
    Component: Releive,
    subAccordionList: [
      { id: "panel1", title: "notice Period" },
      { id: "panel2", title: "Exit interview" },
      { id: "panel3", title: "Work Handover" },
      { id: "panel4", title: "FNF" },
      { id: "panel5", title: "Farewell" },
      { id: "panel6", title: "Archived" },
    ],
  },
  {
    id: "panel3",
    title: "Title 001",
    category: "Title",
    Component: Title,
    subAccordionList: [
      { id: "panel1", title: "notice Period" },
      { id: "panel2", title: "Exit interview" },
      { id: "panel3", title: "Work Handover" },
      { id: "panel4", title: "FNF" },
      { id: "panel5", title: "Farewell" },
      { id: "panel6", title: "Archived" },
    ],
  },
  {
    id: "panel4",
    title: "Daassadbkcba",
    category: "Daassadbkcba",
    Component: Daassadbkcba,
    subAccordionList: [
      { id: "panel1", title: "notice Period" },
      { id: "panel2", title: "Exit interview" },
      { id: "panel3", title: "Work Handover" },
      { id: "panel4", title: "FNF" },
      { id: "panel5", title: "Farewell" },
      { id: "panel6", title: "Archived" },
    ],
  },
  {
    id: "panel5",
    title: "Zxasd",
    category: "Zxasd",
    Component: Zxasd,
    subAccordionList: [
      { id: "panel1", title: "notice Period" },
      { id: "panel2", title: "Exit interview" },
      { id: "panel3", title: "Work Handover" },
      { id: "panel4", title: "FNF" },
      { id: "panel5", title: "Farewell" },
      { id: "panel6", title: "Archived" },
    ],
  },
  {
    id: "panel6",
    title: "Owasa",
    category: "'Owasa",
    Component: Owasa,
    subAccordionList: [
      { id: "panel1", title: "notice Period" },
      { id: "panel2", title: "Exit interview" },
      { id: "panel3", title: "Work Handover" },
      { id: "panel4", title: "FNF" },
      { id: "panel5", title: "Farewell" },
      { id: "panel6", title: "Archived" },
    ],
  },
];
