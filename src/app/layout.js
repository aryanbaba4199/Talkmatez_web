import { Inter } from "next/font/google";
import "./globals.css";
import ButtonAppBar from "@/Component/NavBar/NavMenu";
import { AppProvider } from "@/Component/Helpers/AppContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Talkmatez",
  description: "Prepare for Communication Skill",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AppProvider>
        <div className="fixed top-0 w-full z-[3000]">
        <ButtonAppBar/>
        </div>
        <div className="mt-16">
        {children}
        </div>
        </AppProvider>
        </body>
        
    </html>
  );
}
