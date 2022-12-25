import Link from "next/link";
import React from "react";
import { Grid, ArrowUp, Plus, User, LogOut } from "react-feather";
import Footer from "./Footer";
import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="bg-third px-24 flex py-10 lg:px-9 3xl:px-[450px] gap-5 md:px-5">
        <aside className="w-[25%] md:hidden">
          <div className="bg-white rounded-lg px-7 py-10 flex flex-col h-full shadow-md lg:h-[450px]">
            <div className="flex-1 flex flex-col gap-10">
              <div className="flex gap-5">
                <Link href="/home">
                  <Grid />
                </Link>
                <Link href="/home">Dashboard</Link>
              </div>
              <div className="flex gap-5">
                <Link href="/home">
                  <ArrowUp />
                </Link>
                <Link href="/home">Transfer</Link>
              </div>
              <div className="flex gap-5">
                <Link href="/home">
                  <Plus />
                </Link>
                <Link href="/home">Top Up</Link>
              </div>
              <div className="flex gap-5">
                <Link href="/home">
                  <User />
                </Link>
                <Link href="/home">Profile</Link>
              </div>
            </div>
            <div>
              <div className="flex gap-5">
                <LogOut />
                <p>Logout</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Content */}
        {children}
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
