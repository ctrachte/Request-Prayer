import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

export default function Requests({ session, id}) {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [answeredOn, setAnsweredOn] = useState(null);

  useEffect(() => {
    getRequest(id);
  }, [session, id]);

  async function getRequest(id) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("requests")
        .select(`id, title, description, answer, answeredOn`)
        .eq("id", id)

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setId(data.id);
        setTitle(data.RequestTitle);
        setDescription(data.RequestDescription);
        setAnswer(data.Answer);
        setAnsweredOn(data.AnsweredOn);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateRequest({ id, title, description, answer, answeredOn }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();
      const updates = {
        id,
        title,
        description,
        answer,
        answeredOn,
        updated_at: new Date(),
        fk_ProfileID: user.id
      };

      let { error } = await supabase.from("requests").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (

    <div className="form-widget">
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title || ""}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="description">Request Description</label>
        <input
          id="description"
          type="text"
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="answeredOn">Request Answered On</label>
        <input
          id="answeredOn"
          type="date"
          value={answeredOn || ""}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="answer">Request Answer</label>
        <input
          id="answer"
          type="text"
          value={answer || ""}
          onChange={(e) => setAnsweredOn(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="id">Request ID</label>
        <input
          id="id"
          type="text"
          value={id}
          disabled={true}
        />
      </div>
      <div>
        <button
          className="button block primary"
          onClick={() => updateRequest({ id, title, description, answer, answeredOn })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>
    </div>
  );
}