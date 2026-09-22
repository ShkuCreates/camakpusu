export type CollegeOption = {
  name: string;
  group: "DU Colleges" | "Noida colleges" | "Greater Noida colleges";
  domain: string;
};

export const collegeOptions: CollegeOption[] = [
  { name: "University of Delhi", group: "DU Colleges", domain: "du.ac.in" },
  { name: "Hindu College", group: "DU Colleges", domain: "hinducollege.ac.in" },
  { name: "Hansraj College", group: "DU Colleges", domain: "hansrajcollege.ac.in" },
  { name: "Miranda House", group: "DU Colleges", domain: "mirandahouse.ac.in" },
  { name: "Sri Venkateswara College", group: "DU Colleges", domain: "svc.ac.in" },
  { name: "Shri Ram College of Commerce", group: "DU Colleges", domain: "srcc.edu" },
  { name: "Lady Shri Ram College for Women", group: "DU Colleges", domain: "lsr.edu.in" },
  { name: "Ramjas College", group: "DU Colleges", domain: "ramjas.du.ac.in" },
  { name: "St. Stephen's College", group: "DU Colleges", domain: "ststephens.edu" },
  { name: "Kirori Mal College", group: "DU Colleges", domain: "kmc.du.ac.in" },
  { name: "Gargi College", group: "DU Colleges", domain: "gargicollege.in" },
  { name: "Daulat Ram College", group: "DU Colleges", domain: "dr.du.ac.in" },
  { name: "Amity University Noida", group: "Noida colleges", domain: "amity.edu" },
  { name: "Jaypee Institute of Information Technology", group: "Noida colleges", domain: "jiit.ac.in" },
  { name: "Noida International University", group: "Noida colleges", domain: "niu.edu.in" },
  { name: "Bennett University", group: "Noida colleges", domain: "bennett.edu.in" },
  { name: "Shiv Nadar University Delhi NCR", group: "Noida colleges", domain: "snu.edu.in" },
  { name: "Asian Academy of Film and Television", group: "Noida colleges", domain: "aaft.com" },
  { name: "Sharda University", group: "Greater Noida colleges", domain: "sharda.ac.in" },
  { name: "Galgotias University", group: "Greater Noida colleges", domain: "galgotiasuniversity.edu.in" },
  { name: "Gautam Buddha University", group: "Greater Noida colleges", domain: "gbu.ac.in" },
  { name: "Galgotias College of Engineering and Technology", group: "Greater Noida colleges", domain: "gcet.edu.in" },
  { name: "IIMT University", group: "Greater Noida colleges", domain: "iimtindia.net" },
  { name: "Noida Institute of Engineering and Technology", group: "Greater Noida colleges", domain: "niet.co.in" },
];

export const localityOptions = ["South Delhi", "North Delhi", "Centre Delhi", "Noida", "Greater Noida"];
export const categoryOptions = ["Assignments", "Presentations", "Teaching", "Others"];
