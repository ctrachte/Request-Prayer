import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Requests() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setSession(supabase.auth.session());
    getRequests();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  async function getRequests() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("requests")
        .select("*")
        .eq("fk_ProfileID", user.id);
      console.log(user);
      if (error && status !== 406) {
        throw error;
      }

      console.log(data);
      setRequests(data);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  function setTableHeader() {
    let header = Object.keys(requests[0]);
    return header.map((key, index) => {
      return (
        <th scope="col" key={index}>
          {key.toUpperCase()}
        </th>
      );
    });
  }
  function setTableData() {
    return requests.map((req, index) => {
      const {
        id,
        created_at,
        fk_ProfileID,
        RequestTitle,
        RequestDescription,
        AnsweredOn,
        Answer,
        fk_GroupID,
      } = req; //destructuring
      return (
        <div
          key={id}
          className="border-solid py-3 rounded-lg bg-black border-2 border-pink-600 max-w-sm m-4 overflow-hidden shadow-lg inline-block"
        >
          <div className="px-6 py-4">
            <div className="text-sm mb-2 text-indigo-200">
              On{" "}
              {new Date(created_at).toLocaleDateString("en-us", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
            <div className="text-xl text-white mb-2">
              <p className="text-white mb-2">{RequestTitle}</p>
            </div>
            <p className="text-white mb-2">{RequestDescription}</p>
            {AnsweredOn ? (
              <p className="text-sm text-indigo-200 inline-block">
                Answer on{" "}
                {new Date(AnsweredOn).toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}{" "}
                :{Answer ? " {Answer} " : ""}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="bg-pink-600 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
              <Link
                href={{ pathname: "/UpdateRequest", query: { keyword: id } }}
              >
                Update Request
              </Link>
            </span>
          </div>
        </div>
      );
    });
  }
  return (
    <div className="block">
      <div id="new-request-button" className="m-4 w-1/3	items-center">
        <button
          className="mx-4 bg-pink-600 items-center border border-transparent text-base font-small rounded-md text-white hover:bg-pink-700 hover:text-white md:py-2 md:text-lg md:px-5"
          onClick={() => router.push("/NewRequest")}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Add Request + " }
        </button>{" "}
      </div>
      <div id="requests" className="m-4 items-center">
        {requests.length ? setTableData() : ""}
      </div>
    </div>
  );
}
