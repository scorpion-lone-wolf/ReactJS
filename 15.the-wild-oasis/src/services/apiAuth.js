import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  // 1. Update password or fullName
  let updateData = {};
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;
  // 2. upload the avatar image
  const fileName = `avatar-${data.user.id}-${crypto.randomUUID()}`;

  const { error: storageError } = supabase.storage.from("avatars").upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);

  // 3. Update the avatar in user
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);
  return updatedUser;
}
