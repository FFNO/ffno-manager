import { useLoaderData } from "@tanstack/react-router";
import React from "react";

export const MePage = () => {
  const data = useLoaderData({ from: "/members/me" });

  return <div>{JSON.stringify(data)}</div>;
};
