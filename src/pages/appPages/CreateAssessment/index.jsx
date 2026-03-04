import { useState } from "react";
import { callSupabase } from "../../../helpers/supabaseWrapper";

export default function CreateAssessment() {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState(60);

  const create = async () => {
    const { error } =  await callSupabase((sb) => sb.from("assessments").insert({
      title,
      duration_minutes: duration,
    }));

    if (!error) alert("Created");
  };

  return (
    <div>
      <h2>Create Assessment</h2>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input
        type="number"
        onChange={e => setDuration(e.target.value)}
        defaultValue={60}
      />
      <button onClick={create}>Create</button>
    </div>
  );
}