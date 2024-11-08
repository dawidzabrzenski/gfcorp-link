import supabase from "./supabase";

export async function getTicket(id) {
  let { data: ticket, error } = await supabase
    .from("tickets")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Ticket could not be loaded");
  }

  return ticket;
}

export async function getTickets() {
  const { data, error } = await supabase.from("tickets").select("*");

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
