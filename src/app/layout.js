import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "../components/Sidebar";
import News from "../components/News";
import { SessionWrapper } from "../components/SessionWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "X Clone",
  description: "A clone of X website built with Next.js and Tailwind CSS",
};

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="flex justify-between max-w-6xl mx-auto py-6">
            <div className="hidden sm:inline border-r h-screen">
              <Sidebar />
            </div>
            <div>{children}</div>
            <div className="lg:flex-col p-3 h-screen border-l hidden lg:flex w-[24rem] gap-4">
              <div className="sticky top-0 bg-white ">
                <input
                  type="text"
                  placeholder="Search news..."
                  className="bg-gray-100 rounded-3xl w-full px-4 py-2 border border-gray-300"
                />
              </div>
              <News />
            </div>
          </div>
        </body>
      </html>
    </SessionWrapper>
  );
}
