import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Phone, Lock, Download, Menu } from "react-feather";

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome | E-Artos </title>
        <meta name="E-Artos digital payment" content="Make easy transfer" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="tripleXl:px-[450px]">
        <div className="flex py-6 bg-primary px-24 items-center md:px-9 lg:px-9">
          <Link href="/" className="flex-1 text-2xl text-white font-semibold">
            E-Artos
          </Link>
          <div className="flex gap-5 md:hidden">
            <Link
              href="/"
              className="w-24 py-1 btn btn-primary text-white text-center font-semibold"
            >
              Login
            </Link>
            <Link
              href="/"
              className="w-24 py-1 btn bg-white hover:bg-white text-primary text-center font-semibold"
            >
              Sign Up
            </Link>
          </div>
          <div className="md:block xxl:hidden">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                className="btn bg-white hover:bg-slate-200 px-3"
              >
                <Menu style={{ color: "#2D1B69" }} />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 mt-1 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/">Login</Link>
                </li>
                <li>
                  <Link href="/">Sign Up</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex px-24 md:bg-primary md:via-transparent bg-gradient-to-r from-primary via-purple-500 items-center md:px-9 md:flex-col md:py-10 md:grid-cols-1 lg:items-end lg:px-9 lg:grid lg:grid-cols-2">
          <div className="text-white flex-1 lg:mb-10">
            <h1 className="text-6xl font-semibold md:text-4xl lg:text-4xl">
              Awesome App
              <span className="block mt-5 md:mt-0">For Saving Time.</span>
            </h1>
            <p className="text-lg mt-10">
              We bring you a mobile app for banking problems that
              <span className="block">oftenly wasting much of your times.</span>
            </p>
            <div className="btn bg-white hover:bg-white text-primary mt-10 font-semibold">
              Try It Free
            </div>
          </div>
          <div className="md:hidden">
            <img src="img/phone-hero.png" alt="" className="w-[480px]" />
          </div>
        </div>
        <div className="px-24 flex justify-between bg-third py-16 md:px-9 md:grid md:grid-cols-2 md:py-10 lg:place-items-center lg:px-9">
          <div>
            <img src="img/logo-microsoft.png" alt="" />
          </div>
          <div>
            <img src="img/logo-dropbox.png" alt="" />
          </div>
          <div>
            <img src="img/logo-hnm.png" alt="" />
          </div>
          <div>
            <img src="img/logo-airbnb.png" alt="" />
          </div>
          <div>
            <img src="img/logo-cannon.png" alt="" />
          </div>
          <div>
            <img src="img/logo-dell.png" alt="" />
          </div>
        </div>
        <div className="bg-white">
          <div className="px-24 text-center py-28 md:px-9 md:py-16 lg:px-9">
            <h1 className="text-5xl font-bold md:text-4xl">
              <span className="text-primary">About</span> the Application.
            </h1>
            <p className="text-xl mt-5">
              We have some great features from the application and it’s totally
              free
              <span className="block mt-3 md:mt-0">
                to use by all users around the world.
              </span>
            </p>

            <div className="flex justify-between mt-20 text-center md:flex-col md:gap-5 lg:gap-5 xl:gap-5">
              <div className="flex flex-col items-center card w-[370px] bg-base-100 shadow-xl px-5 py-5 gap-5 md:w-full">
                <div className="bg-secondary p-3 rounded-full w-fit text-center">
                  <Phone style={{ color: "#2D1B69" }} />
                </div>
                <h3 className="text-lg font-bold">24/7 Support</h3>
                <p className="font-medium text-slate-600">
                  We have 24/7 contact support so you can contact us whenever
                  you want and we will respond it.
                </p>
              </div>

              <div className="flex flex-col items-center card w-[370px] bg-base-100 shadow-xl px-5 py-5 gap-5 md:w-full">
                <div className="bg-secondary p-3 rounded-full w-fit text-center">
                  <Lock style={{ color: "#2D1B69" }} />
                </div>
                <h3 className="text-lg font-bold">Data Privacy</h3>
                <p className="font-medium text-slate-600">
                  We make sure your data is safe in our database and we will
                  encrypt any data you submitted to us.
                </p>
              </div>

              <div className="flex flex-col items-center card w-[370px] bg-base-100 shadow-xl px-5 py-5 gap-5 md:w-full">
                <div className="bg-secondary p-3 rounded-full w-fit text-center">
                  <Download style={{ color: "#2D1B69" }} />
                </div>
                <h3 className="text-lg font-bold">Easy Download</h3>
                <p className="font-medium text-slate-600">
                  Zwallet is 100% totally free to use it’s now available on
                  Google Play Store and App Store.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-24 bg-third grid grid-cols-2 items-center md:px-9 md:py-20 lg:grid-cols-1 lg:px-9 lg:py-20 xl:px-10">
          <div className="lg:hidden">
            <img src="img/phone-main.png" alt="" className="h-[900px]" />
          </div>

          <div className="flex flex-col gap-5">
            <h1 className="text-6xl font-semibold mb-12 md:text-4xl md:text-center md:mb-10">
              All The <span className="text-primary">Great</span> E-Artos
              Features.
            </h1>
            <div className="text-lg">
              <div className="p-5 bg-white shadow-xl rounded-xl">
                <div className="flex gap-5 font-semibold">
                  <p className="text-primary">1.</p>
                  <p>Small Fee</p>
                </div>
                <div>
                  <p>
                    We only charge 5% of every success transaction done in
                    FazzPay app.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-lg">
              <div className="p-5 bg-white shadow-xl rounded-xl">
                <div className="flex gap-5 font-semibold">
                  <p className="text-primary">2.</p>
                  <p>Data Secured</p>
                </div>
                <div>
                  <p>
                    All your data is secured properly in our system and it’s
                    encrypted.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-lg">
              <div className="p-5 bg-white shadow-xl rounded-xl">
                <div className="flex gap-5 font-semibold">
                  <p className="text-primary">3.</p>
                  <p>User Friendly</p>
                </div>
                <div>
                  <p>
                    FazzPay come up with modern and sleek design and not
                    complicated.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" px-24 text-center py-24 md:px-9 md:py-20 lg:px-9">
          <h1 className="text-5xl font-bold mb-5 md:text-4xl">
            What Users are
            <span className="text-primary font-bold"> Saying.</span>
          </h1>
          <p className="text-lg font-semibold">
            We have some great features from the application and it’s totally
            free{" "}
            <span className="block">to use by all users around the world.</span>
          </p>
          <div className="flex justify-between mt-20 text-center md:flex-col lg:gap-5 xl:gap-5">
            <div className="flex flex-col items-center card w-[370px] bg-base-100 shadow-xl px-5 py-5 gap-5 md:w-full">
              <div>
                <img src="img/profile1.png" alt="" />
              </div>
              <h3 className="text-lg font-bold">Sherina Chaw</h3>
              <p className="font-medium text-slate-600">
                “I use this app since 2 years ago and this is the best app that
                I’ve ever use in my entire life”
              </p>
            </div>

            <div className="flex flex-col items-center card w-[370px] bg-base-100 shadow-xl px-5 py-5 gap-5 md:w-full">
              <div>
                <img src="img/profile2.png" alt="" />
              </div>
              <h3 className="text-lg font-bold">Jessica Mera</h3>
              <p className="font-medium text-slate-600">
                “I use Zwallet to manage all financial needs. It’s super easy to
                use and it’s 100% free app”
              </p>
            </div>

            <div className="flex flex-col items-center card w-[370px] bg-base-100 shadow-xl px-5 py-5 gap-5 md:w-full">
              <div>
                <img src="img/profile3.png" alt="" />
              </div>
              <h3 className="text-lg font-bold">Robert Chandler</h3>
              <p className="font-medium text-slate-600">
                “Since I’m using this app, I’m not going to move to another
                similar app. Thank you Zwallet!”
              </p>
            </div>
          </div>
        </div>

        <footer className="bg-primary px-24 py-20 lg:px-9">
          <Link href="/" className="text-white text-3xl">
            E-Artos
          </Link>
          <div className="w-60 text-white mt-10">
            <p>
              Simplify financial needs and saving much time in banking needs
              with one single app.
            </p>
          </div>
          <div className="border-0 border-b mt-10"></div>
          <div className="flex mt-7 md:flex-col">
            <div className="flex-1 text-white">
              <p>2022 E-Artos. All right reserved.</p>
            </div>
            <div className="flex gap-6 text-white md:flex-col md:gap-0 md:mt-7">
              <p>+62 857-9534-4094</p>
              <Link href="/">contact@eartos.com</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
