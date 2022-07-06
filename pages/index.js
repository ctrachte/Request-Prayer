import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Auth from "../components/Auth";
import Account from "../components/Account";
import Image from "next/image";

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  return (
    <div className="relative h-full bg-black overflow-hidden">
      <div className="max-w-7xl h-full hover:max-h-screen mx-auto">
        <div className="relative h-full z-10 pb-8 bg-black sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-pink-600 transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <Popover>
            <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
              <nav
                className="relative flex items-center justify-between sm:h-10 lg:justify-start"
                aria-label="Global"
              >
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="flex items-center justify-between w-full md:w-auto">
                    <a href="/">
                      <span className="sr-only">Workflow</span>
                      <Image
                        src="/requestprayer-medium.png"
                        alt=""
                        layout="intrinsic"
                        width={48}
                        height={48}
                      />
                    </a>
                    <div className="-mr-2 flex items-center md:hidden">
                      <Popover.Button className="bg-black rounded-md p-2 inline-flex items-center justify-center text-white-400 hover:text-white-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Open main menu</span>
                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block md:ml-10 md:pr-4 md:space-x-8">
                  <a
                    href="/login"
                    className="font-medium text-white-600 hover:text-pink-600"
                  >
                    {session ? "Profile" : "Log in"}
                  </a>
                  {session ?<a
                    href="/Groups"
                    className="font-medium text-white-600 hover:text-pink-600"
                  >
                    My Groups
                  </a>
                   : ""}
                  {session ?<a
                    href="/Requests"
                    className="font-medium text-white-600 hover:text-pink-600"
                  >
                    My Requests
                  </a>
                   : ""}
                </div>
              </nav>
            </div>

            <Transition
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="rounded-lg shadow-md bg-black ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="px-5 pt-4 flex items-center justify-between">
                    <div>
                      <Image
                        src="/requestprayer-medium.png"
                        alt=""
                        layout="intrinsic"
                        width={48}
                        height={48}
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-black rounded-md p-2 inline-flex items-center justify-center text-white-400 hover:text-white-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close main menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="px-2 pt-2 pb-3 space-y-1">
                  </div>
                  <a
                    href="/login"
                    className="font-medium text-white-600 hover:text-pink-600"
                  >
                    {session ? "Profile" : "Log in"}
                  </a>
                  {session ?<a
                    href="/Groups"
                    className="font-medium text-white-600 hover:text-pink-600"
                  >
                    My Groups
                  </a>
                   : ""}
                  {session ?<a
                    href="/Requests"
                    className="font-medium text-white-600 hover:text-pink-600"
                  >
                    My Requests
                  </a>
                   : ""}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">
                  Easy and simple tracking of prayer requests!
                </span>{" "}
                <span className="block text-pink-600 xl:inline">
                  RequestPrayer
                </span>
              </h1>
              <p className="mt-3 text-base text-white-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Track the needs of your church, fellowship group, community
                group, Bible study, or even friends and family! Udate requests
                when they've been answered, and foster a sense of accountability
                and community. Join RequestPrayer today!
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="/login"
                    className="w-full bg-pink-600 flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white-600 hover:bg-pink-700 hover:text-white md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1457139621581-298d1801c832?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2003&q=80"
          alt="Prayer in a field"
        />
      </div>
    </div>
  );
}
