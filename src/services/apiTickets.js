import supabase from "./supabase";

export async function getTickets() {
  const { data, error } = await supabase.from("tickets").select("*");

  console.log(data);

  if (error) {
    console.error(error);
    throw new Error("Tickets could not be loaded");
  }

  return data;
}
