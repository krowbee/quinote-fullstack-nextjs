import { serverFetchToApi } from "@/lib/api/http-server";

export async function getInitialNotes() {
  const res = await serverFetchToApi("/api/notes");
  const json = await res.json();
  return json.notes;
}
