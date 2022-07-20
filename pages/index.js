import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Layout from "../components/Layout";

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
          <Layout/>
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
