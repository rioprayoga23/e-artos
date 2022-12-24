import Head from "next/head";
import Link from "next/link";
import React, { Children } from "react";

const MainLayoutAuth = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="E-Artos digital payment" content="Make easy transfer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex 3xl:px-[450px]">
        <article className="flex w-[60%] lg:hidden">
          <div className="px-24  md:bg-primary md:via-transparent bg-gradient-to-r from-primary to-purple-500 text-white lg:px-9 lg:h-screen h-screen flex flex-col justify-center">
            <Link href="/">
              <h1 className="text-2xl font-semibold">E-Artos</h1>
            </Link>
            <div className="flex flex-col items-center">
              <div className="py-10">
                <img
                  src="img/phone-login.png"
                  alt=""
                  className="w-[330px] h-auto lg:w-[300px]"
                />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-semibold mb-7">
                  App that Covering Banking Needs.
                </h3>
                <p className="font-base leading-7 text-white/80">
                  FazzPay is an application that focussing in banking needs for
                  all users in the world. Always updated and always following
                  world trends. 5000+ users registered in FazzPay everyday with
                  worldwide users coverage.
                </p>
              </div>
            </div>
          </div>
        </article>
        {children}
      </main>
    </>
  );
};

export default MainLayoutAuth;
