import { createContext, useState } from "react";
import http from "../lib/http";

const LinkContext = createContext();

export function LinkProvider({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [links, setLinks] = useState([]);
  
  async function fetchLinks() {
    try {
      const res = await http("/api/links/user/" + user.id);
      if (!res.success) {
        throw new Error(res.message);
      }
      setLinks(res.results);
    } catch (err) {
      return err
    }
  }
  async function createLink(data) {
    data = { ...data, user_id: user.id }
    try {
      const res = await http("/api/links", JSON.stringify(data), { method: "POST" });
      if (!res.success) {
        throw new Error(res.message);
      }
      fetchLinks();
    } catch (err) {
      return err
    }
  }      
  async function deleteLink(id) {
    try {
      const res = await http("/api/links/" + id, null, { method: "DELETE" });
      if (!res.success) {
        throw new Error(res.message);
      }
      fetchLinks();
    } catch (err) {
      return err
    }
  } 
  return (
    <LinkContext.Provider value={{ links, fetchLinks , createLink, deleteLink }}>
      {children}
    </LinkContext.Provider>
  );
}

export default LinkContext;