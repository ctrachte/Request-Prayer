import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";

export default function Requests({ session, id }) {
  const [loading, setLoading] = useState(true);
  const [RequestTitle, setRequestTitle] = useState(null);
  const [RequestDescription, setRequestDescription] = useState(null);
  const [Answer, setAnswer] = useState(null);
  const [AnsweredOn, setAnsweredOn] = useState(null);
  const [fk_GroupID, setfk_GroupID] = useState(null);
  const [ReqID, setReqId] = useState(null);
  const router = useRouter();
  const { keyword } = router.query;
  const queryKey = 'keyword';
  const queryValue = parseInt(router.query[queryKey] || router.asPath.match(new RegExp(`[&?]${queryKey}=(.*)(&|$)`)));

  useEffect(() => {
    setLoading(false);
    getRequest(parseInt(queryValue));
  }, [session, id]);

  async function getRequest(requestID) {
    try {
      setLoading(true);
      setReqId(requestID);
      const user = supabase.auth.user();
      if (requestID) {
        let { data, error, status } = await supabase
          .from("requests")
          .select(
            `id, RequestTitle, RequestDescription, Answer, AnsweredOn, fk_GroupID`
          )
          .eq("id", requestID);

        if (error && status !== 406) {
          throw error;
        }
        console.log(data, requestID);
        if (data) {
          data = data[0];
          setReqId(requestID);
          setRequestTitle(data.RequestTitle);
          setRequestDescription(data.RequestDescription);
          setAnswer(data.Answer);
          setAnsweredOn(data.AnsweredOn);
          setfk_GroupID(data.fk_GroupID);
        }
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function UpdateRequest({
    ReqID,
    RequestTitle,
    RequestDescription,
    Answer
  }) {
    try {
      setLoading(true);
      
      console.table({ id: ReqID, RequestTitle: RequestTitle, RequestDescription: RequestDescription, Answer: Answer })
      const user = supabase.auth.user();
      const { data, error } = await supabase
      .from('requests')
      .update({ RequestTitle: RequestTitle, RequestDescription: RequestDescription, Answer: Answer  })
      .match({id: ReqID})

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
      router.push("/Requests");
    }
  }

  return (
    <div className="form-widget items-center m-6 lg:w-1/2 md:w-1/2">
      <h2>Update Prayer Request</h2>
      <div>
        <label htmlFor="RequestTitle">Title</label>
        <input
          id="RequestTitle"
          type="text"
          required
          value={RequestTitle || ""}
          onChange={(e) => setRequestTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="RequestDescription">Request Description</label>
        <input
          id="RequestDescription"
          type="text"
          required
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
        <label htmlFor="fk_GroupID">Group ID</label>
        <input
          id="fk_GroupID"
          type="text"
          value={fk_GroupID || ""}
          onChange={(e) => setfk_GroupID(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="id">Request ID</label>
        <input id="id" type="number" value={ReqID || ""} disabled={true} />
      </div>
      <div>
        <button
          className="m-2 bg-pink-600 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-small rounded-md text-white hover:bg-pink-700 hover:text-white md:py-2 md:text-lg md:px-5"
          onClick={() =>
            UpdateRequest({
              ReqID,
              RequestTitle,
              RequestDescription,
              Answer,
            })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update Prayer Request"}
        </button>
      </div>
    </div>
  );
}
