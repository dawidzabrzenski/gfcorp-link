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

export async function createTicket(newTicket) {
  const { data, error } = await supabase
    .from("tickets")
    .insert([{ ...newTicket }]);

  if (error) {
    console.error(error);
    throw new Error("Ticket could not be created");
  }

  return data;
}
