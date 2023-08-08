"use client";
import Dream from "@/app/components/Dream";
import { db } from "@/app/utils/db";
import { useState } from "react";
import Link from "next/link";

export default function DreamList() {
  const [data, setData] = useState([]);
  db.collection("dreams")
    .getFullList({
      sort: "-created",
    })
    .then((res) => {
      console.log(res);
      setData(res);
    })
    .catch((e) => console.log(e));
  return (
    <div className="justify-center m-2 items-center">
      <Link href="/register" className="text-center font-bold">
        me username = {db?.authStore?.model?.username}
      </Link>
      {db.authStore.model.username && (
        <button className="text-center block font-bold">[ Logout ] </button>
      )}
      <h1 className="text-center text-2xl font-bold">LIST OF DREAMS</h1>
      <div className="p-4 justify-between flex flex-wrap border-2 border-gray-600">
        {data.map((doc) => (
          <Dream data={doc} />
        ))}
      </div>
    </div>
  );
}
