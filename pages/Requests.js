import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import Link from "next/link";

export default function Requests() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState(true);

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
        <th
          scope="col"
          key={index}
        >{key.toUpperCase()}</th>
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
        <tr className="border-b" key={id}>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium bh-black text-white bg-pink-600">
            <Link href={{ pathname: "/UpdateRequest", query: { keyword: id } }}>
                Update Request
            </Link>
          </td>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium bh-black text-white bg-pink-600">
            {id}
          </td>
          <td className="text-sm text-white bg-pink-600 font-light px-6 py-4 whitespace-nowrap">
            {created_at}
          </td>
          <td className="text-sm text-white bg-pink-600 font-light px-6 py-4 whitespace-nowrap">
            {fk_ProfileID}
          </td>
          <td className="text-sm text-white bg-pink-600 font-light px-6 py-4 whitespace-nowrap">
            {RequestTitle}
          </td>
          <td className="text-sm text-white bg-pink-600 font-light px-6 py-4 whitespace-nowrap">
            {RequestDescription}
          </td>
          <td className="text-sm text-white bg-pink-600 font-light px-6 py-4 whitespace-nowrap">
            <input
              type="date"
              onChange={(e) => {
                console.log(e.target.value);
              }}
              value={AnsweredOn}
            />
          </td>
          <td className="text-sm text-white bg-pink-600 font-light px-6 py-4 whitespace-nowrap">
            {Answer}
          </td>
          <td className="text-sm text-white bg-pink-600 font-light px-6 py-4 whitespace-nowrap">
            {fk_GroupID ? fk_GroupID : "none"}
          </td>
        </tr>
      );
    });
  }
  return (
    <div>
      <div id="requests" className="m-4 border flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-auto">
              <table className="min-w-full">
                <thead className="">
                  <tr className="border-b">
                    <th></th>{requests.length ? setTableHeader() : ""}</tr>
                </thead>
                <tbody>{requests.length ? setTableData() : ""}</tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
