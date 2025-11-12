import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="page-container">
      <Sidebar />
      <div style={{ width: "100%" }}>
        <Topbar />
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
