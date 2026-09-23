export type CollegeOption = {
  name: string;
  group: "DU Colleges" | "Noida colleges" | "Greater Noida colleges";
  domain: string;
  logo?: string;
};

export const collegeOptions: CollegeOption[] = [
  // Delhi University Colleges
  { name: "University of Delhi", group: "DU Colleges", domain: "du.ac.in", logo: "🎓" },
  { name: "Hindu College", group: "DU Colleges", domain: "hinducollege.ac.in", logo: "🏛️" },
  { name: "Hansraj College", group: "DU Colleges", domain: "hansrajcollege.ac.in", logo: "📚" },
  { name: "Miranda House", group: "DU Colleges", domain: "mirandahouse.ac.in", logo: "👩‍🎓" },
  { name: "Sri Venkateswara College", group: "DU Colleges", domain: "svc.ac.in", logo: "🏫" },
  { name: "Shri Ram College of Commerce", group: "DU Colleges", domain: "srcc.edu", logo: "💼" },
  { name: "Lady Shri Ram College for Women", group: "DU Colleges", domain: "lsr.edu.in", logo: "👩‍🏫" },
  { name: "Ramjas College", group: "DU Colleges", domain: "ramjas.du.ac.in", logo: "🎓" },
  { name: "St. Stephen's College", group: "DU Colleges", domain: "ststephens.edu", logo: "✝️" },
  { name: "Kirori Mal College", group: "DU Colleges", domain: "kmc.du.ac.in", logo: "📖" },
  { name: "Gargi College", group: "DU Colleges", domain: "gargicollege.in", logo: "🌸" },
  { name: "Daulat Ram College", group: "DU Colleges", domain: "dr.du.ac.in", logo: "🏢" },
  { name: "Hindustan College", group: "DU Colleges", domain: "hindustancollege.du.ac.in", logo: "🇮🇳" },
  { name: "Desbandhu College", group: "DU Colleges", domain: "desbandhucollege.du.ac.in", logo: "🚩" },
  { name: "Zakir Husain Delhi College", group: "DU Colleges", domain: "zakirhusaindelhicollege.ac.in", logo: "🕌" },
  { name: "Acharya Narendra Dev College", group: "DU Colleges", domain: "andcollege.du.ac.in", logo: "🧠" },
  { name: "Atma Ram Sanatan Dharma College", group: "DU Colleges", domain: "arsdcollege.ac.in", logo: "🙏" },
  { name: "Bhaskaracharya College of Applied Sciences", group: "DU Colleges", domain: "bcas.du.ac.in", logo: "🔬" },
  { name: "College of Vocational Studies", group: "DU Colleges", domain: "cvs.du.ac.in", logo: "🛠️" },
  { name: "Deen Dayal Upadhyaya College", group: "DU Colleges", domain: "dduc.du.ac.in", logo: "🏭" },
  
  // Noida Colleges
  { name: "Amity University Noida", group: "Noida colleges", domain: "amity.edu", logo: "🎓" },
  { name: "Jaypee Institute of Information Technology", group: "Noida colleges", domain: "jiit.ac.in", logo: "💻" },
  { name: "Noida International University", group: "Noida colleges", domain: "niu.edu.in", logo: "🌍" },
  { name: "Bennett University", group: "Noida colleges", domain: "bennett.edu.in", logo: "📰" },
  { name: "Shiv Nadar University Delhi NCR", group: "Noida colleges", domain: "snu.edu.in", logo: "💡" },
  { name: "Asian Academy of Film and Television", group: "Noida colleges", domain: "aaft.com", logo: "🎬" },
  { name: "IMS Noida", group: "Noida colleges", domain: "imsnoida.com", logo: "🏢" },
  { name: "IIMT College of Engineering", group: "Noida colleges", domain: "iimtindia.net", logo: "⚙️" },
  { name: "JSS Academy of Technical Education", group: "Noida colleges", domain: "jssaten.ac.in", logo: "🔧" },
  { name: "Maratha Mandal Engineering College", group: "Noida colleges", domain: "mmcoep.org", logo: "🏗️" },
  { name: "Amity School of Engineering", group: "Noida colleges", domain: "amity.edu", logo: "🔨" },
  { name: "Galgotias Business School", group: "Noida colleges", domain: "gbs.ac.in", logo: "📊" },
  { name: "Noida University", group: "Noida colleges", domain: "noida.edu.in", logo: "🎯" },
  { name: "Priyadarshini College of Engineering", group: "Noida colleges", domain: "pce.ac.in", logo: "⭐" },
  { name: "ABES Engineering College", group: "Noida colleges", domain: "abes.ac.in", logo: "🔌" },
  { name: "Rukmini Devi Institute of Advanced Studies", group: "Noida colleges", domain: "rdias.ac.in", logo: "👩‍🎓" },
  
  // Greater Noida Colleges
  { name: "Sharda University", group: "Greater Noida colleges", domain: "sharda.ac.in", logo: "🏫" },
  { name: "Galgotias University", group: "Greater Noida colleges", domain: "galgotiasuniversity.edu.in", logo: "🌟" },
  { name: "Gautam Buddha University", group: "Greater Noida colleges", domain: "gbu.ac.in", logo: "🧘" },
  { name: "Galgotias College of Engineering and Technology", group: "Greater Noida colleges", domain: "gcet.edu.in", logo: "🔧" },
  { name: "IIMT University", group: "Greater Noida colleges", domain: "iimtindia.net", logo: "🎓" },
  { name: "Noida Institute of Engineering and Technology", group: "Greater Noida colleges", domain: "niet.co.in", logo: "⚡" },
  { name: "GL Bajaj Institute of Technology", group: "Greater Noida colleges", domain: "glbajaj.org", logo: "💡" },
  { name: "Amity School of Architecture", group: "Greater Noida colleges", domain: "amity.edu", logo: "🏛️" },
  { name: "Maharaja Agrasen Institute of Technology", group: "Greater Noida colleges", domain: "maeit.ac.in", logo: "👑" },
  { name: "GNIOT Group of Institutions", group: "Greater Noida colleges", domain: "gniot.edu.in", logo: "📱" },
  { name: "Greater Noida Institute of Technology", group: "Greater Noida colleges", domain: "gniot.ac.in", logo: "🎯" },
  { name: "Accurate Institute of Management", group: "Greater Noida colleges", domain: "accurate.in", logo: "📈" },
  { name: "Dronacharya College of Engineering", group: "Greater Noida colleges", domain: "dce.ac.in", logo: "🏹" },
  { name: "IEC College of Engineering", group: "Greater Noida colleges", domain: "iec.edu.in", logo: "💻" },
  { name: "JSSATE Noida", group: "Greater Noida colleges", domain: "jssaten.ac.in", logo: "🔨" }
];

export const localityOptions = ["South Delhi", "North Delhi", "Centre Delhi", "Noida", "Greater Noida", "East Delhi", "West Delhi", "Dwarka", "Connaught Place"];
export const categoryOptions = ["Assignments", "Presentations", "Teaching", "Others", "Research", "Projects", "Lab Work", "Thesis"];
