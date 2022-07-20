import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Layout() {
    const [session, setSession] = useState(null);

    useEffect(() => {
      setSession(supabase.auth.session());
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    }, []);
  return (
    <div>
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
              {session ? (
                <a
                  href="/Groups"
                  className="font-medium text-white-600 hover:text-pink-600"
                >
                  My Groups
                </a>
              ) : (
                ""
              )}
              {session ? (
                <a
                  href="/Requests"
                  className="font-medium text-white-600 hover:text-pink-600"
                >
                  My Requests
                </a>
              ) : (
                ""
              )}
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
              <div className="px-2 pt-2 pb-3 space-y-1"></div>
              <a
                href="/login"
                className="font-medium text-white-600 hover:text-pink-600"
              >
                {session ? "Profile" : "Log in"}
              </a>
              {session ? (
                <a
                  href="/Groups"
                  className="font-medium text-white-600 hover:text-pink-600"
                >
                  My Groups
                </a>
              ) : (
                ""
              )}
              {session ? (
                <a
                  href="/Requests"
                  className="font-medium text-white-600 hover:text-pink-600"
                >
                  My Requests
                </a>
              ) : (
                ""
              )}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
}
