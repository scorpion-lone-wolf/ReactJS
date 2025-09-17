import supabase from "./supabase";

export async function createCabin(newCabin) {
  try {
    const isImageUpdated = typeof newCabin?.image !== "string";
    let imagePublicUrl = "";
    if (isImageUpdated) {
      imagePublicUrl = await uploadImageToSupabase(newCabin.image);
    } else {
      imagePublicUrl = newCabin?.image;
    }
    // insert cabin record
    const { data, error: cabinError } = await supabase
      .from("cabins")
      .insert([{ ...newCabin, image: imagePublicUrl }])
      .select();
    if (cabinError) throw new Error(cabinError.message);
    return data[0];
  } catch (err) {
    console.error("Error creating cabin:", err.message);
    throw err;
  }
}

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error("Cabin error :", error);
    throw new Error("Cabin could not be loaded");
  }
  return data;
}

export async function updateCabin(updateCabin, id) {
  // verify if image is updated or not
  const isImageUpdated = typeof updateCabin?.image !== "string";
  let imagePublicUrl = "";
  if (isImageUpdated) {
    imagePublicUrl = await uploadImageToSupabase(updateCabin.image);
  } else {
    imagePublicUrl = updateCabin?.image;
  }
  // update the cabin
  const { data, error: cabinError } = await supabase
    .from("cabins")
    .update([{ ...updateCabin, image: imagePublicUrl }])
    .eq("id", id)
    .select();
  if (cabinError) throw new Error(cabinError.message);
  return data[0];
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id).select();
  if (error) {
    console.error("Cabin error :", error);
    throw new Error("Cabin could not be deleted");
  }
  return data[0];
}
// =========================================
// ============ common function ============
// =========================================
async function uploadImageToSupabase(image) {
  // unique filename
  const imageName = `${crypto.randomUUID()}-${image.name}`.replaceAll("/", "");
  // upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, image);

  if (storageError) throw new Error(storageError.message);

  // Get public url
  const {
    data: { publicUrl },
  } = supabase.storage.from("cabin-images").getPublicUrl(imageName);

  return publicUrl;
}
