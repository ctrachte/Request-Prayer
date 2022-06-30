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

      let { data, error, status } = await supabase.from("requests").select("*").eq("fk_ProfileID", user.id);
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
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }
  function setTableData() {
    return requests.map((req, index) => {
      const { id, created_at, fk_ProfileID, RequestTitle, RequestDescription, AnsweredOn, Answer, fk_GroupID } = req; //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{created_at}</td>
          <td>{fk_ProfileID}</td>
          <td>{RequestTitle}</td>
          <td>{RequestDescription}</td>
          <td>{Answer}</td>
          <td><input type='date' onChange={(e)=> {console.log(e.target.value)}} value={AnsweredOn}/></td>
          <td>{fk_GroupID ? fk_GroupID : "none"}</td>
        </tr>
      );
    });
  }

  return (
    <div>
      <table id="requests">
        <tbody>
          <tr> {requests.length ? setTableHeader() : ""}</tr>
          {requests.length ? setTableData() : ""}
        </tbody>
      </table>
    </div>
  );
}
