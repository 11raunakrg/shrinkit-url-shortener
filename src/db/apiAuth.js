import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();

  if (!session.session) {
    return null;
  }
  if (error) throw new Error(error.message);

  return session.session.data;
}

export async function signUp({ name, email, password, profilePicture }) {
  const filename = `dp-${name.split(" ").join("-")}-${Math.floor(
    Math.random() * 10
  )}`;
  const { error: storageError } = await supabase.storage
    .from("profile_pic")
    .upload(filename, profilePicture);

  if (storageError) throw new Error(storageError);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic: `${supabaseUrl}//storage/v1/object/public/profile_pic/${filename}`,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}
