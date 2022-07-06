import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Requests({ session, id}) {
  const [loading, setLoading] = useState(true);
  const [RequestTitle, setRequestTitle] = useState(null);
  const [RequestDescription, setRequestDescription] = useState(null);
  const [Answer, setAnswer] = useState(null);
  const [AnsweredOn, setAnsweredOn] = useState(null);
  const [fk_GroupID, setfk_GroupID] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, [session, id]);

  async function getRequest(id) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("requests")
        .select(`id, RequestTitle, RequestDescription, Answer, AnsweredOn, fk_GroupID`)
        .eq("id", id)

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setId(data.id);
        setRequestTitle(data.RequestTitle);
        setRequestDescription(data.RequestRequestDescription);
        setAnswer(data.Answer);
        setAnsweredOn(data.AnsweredOn);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function createRequest({ RequestTitle, RequestDescription, Answer, AnsweredOn, fk_GroupID }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const NewRequest = {
        RequestTitle,
        RequestDescription,
        Answer,
        AnsweredOn,
        fk_ProfileID: user.id,
        fk_GroupID: fk_GroupID || null
      };

      let { error } = await supabase.from("requests").insert(NewRequest, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
      alert("New Prayer Request Submitted!")
    }
  }

  return (

    <div className="form-widget">
      <div>
        <label htmlFor="RequestTitle">RequestTitle</label>
        <input
          id="RequestTitle"
          type="text"
          value={RequestTitle || ""}
          onChange={(e) => setRequestTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="RequestDescription">Request RequestDescription</label>
        <input
          id="RequestDescription"
          type="text"
          value={RequestDescription || ""}
          onChange={(e) => setRequestDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="AnsweredOn">Request Answered On</label>
        <input
          id="AnsweredOn"
          type="date"
          value={AnsweredOn || ""}
          onChange={(e) => setAnsweredOn(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="Answer">Request Answer</label>
        <input
          id="Answer"
          type="text"
          value={Answer || ""}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>
      {/* <div>
        <label htmlFor="id">Request ID</label>
        <input
          id="id"
          type="text"
          value={id}
          disabled={true}
        />
      </div> */}
      <div>
        <button
          className="button block primary"
          onClick={() => createRequest({ id, RequestTitle, RequestDescription, Answer, AnsweredOn })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Create Prayer Request"}
        </button>
      </div>
    </div>
  );
}