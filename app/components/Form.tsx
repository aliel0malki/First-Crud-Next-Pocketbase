"use client";
import { db } from "@/app/utils/db";
import { useState } from "react";

export default function Form() {
  const [dreamTitle, setDreamTitle] = useState("");
  const [dreamDes, setDreamDes] = useState("");
  // handle create data
  const handleCreateDream = () => {
    const data = {
      title: dreamTitle,
      description: dreamDes,
      closed: false,
      author: db?.authStore?.model?.username 
    };
    db.collection("dreams")
      .create(data)
      .then((res) =>
        console.log("####### dream created successfully #########")
      )
      .catch((e) => alert(e));
  };

  return (
    <div className="justify-center m-2 items-center">
      <div className="p-4 border-2 border-gray-600">
        <input
          onChange={(e) => setDreamTitle(e.target.value)}
          className="py-3 px-4 bg-white border-0 text-black"
          placeholder="Dream title?"
        />
        <input
          onChange={(e) => setDreamDes(e.target.value)}
          className="py-3 px-4 bg-white border-0 text-black"
          placeholder="Dream description?"
        />
        <button
          onClick={handleCreateDream}
          className="w-[95%] p-3 m-3 bg-gray-900 text-white"
        >
          Create
        </button>
      </div>
    </div>
  );
}
