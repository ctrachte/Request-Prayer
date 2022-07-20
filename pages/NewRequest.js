import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function Requests({ session, id }) {
  const [loading, setLoading] = useState(true);
  const [RequestTitle, setRequestTitle] = useState(null);
  const [RequestDescription, setRequestDescription] = useState(null);
  const [Answer, setAnswer] = useState(null);
  const [AnsweredOn, setAnsweredOn] = useState(null);
  const [fk_GroupID, setfk_GroupID] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, [session, id]);

  async function getRequest(id) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("requests")
        .select(
          `id, RequestTitle, RequestDescription, Answer, AnsweredOn, fk_GroupID`
        )
        .eq("id", id);

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

  async function createRequest({
    RequestTitle,
    RequestDescription,
    Answer,
    AnsweredOn,
    fk_GroupID,
  }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const NewRequest = {
        RequestTitle,
        RequestDescription,
        Answer,
        AnsweredOn,
        fk_ProfileID: user.id,
        fk_GroupID: fk_GroupID || null,
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
      router.push("/Requests");
    }
  }

  return (
    <div>
      <Layout />
      <div className="form-widget m-6 col-6">
        <h1>Submit a New Prayer Request</h1>
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
        <div>
          <button
            className="m-2 bg-pink-600 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-small rounded-md text-white hover:bg-pink-700 hover:text-white md:py-2 md:text-lg md:px-5"
            onClick={() =>
              createRequest({
                id,
                RequestTitle,
                RequestDescription,
                Answer,
                AnsweredOn,
              })
            }
            disabled={loading}
          >
            {loading ? "Loading ..." : "Create Prayer Request"}
          </button>
        </div>
      </div>
    </div>
  );
}
