import supabase from "./supabase";

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error("Cabin error :", error);
    throw new Error("Cabin could not be loaded");
  }
  return data;
}
