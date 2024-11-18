import supabase from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateUserRecovery({ email, password }) {
  const { data, error } = await supabase.auth.updateUser({
    email,
    password,
  });
}

// export async function getCurrentUser() {
//   const { data: session } = await supabase.auth.getSession();
//   if (!session.session) return null;

//   const { data, error } = await supabase.auth.getUser();

//   if (error) throw new Error(error.message);

//   return data?.user;
// }

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  const { data: userDetail, error: errorDetail } = await supabase
    .from("users")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (errorDetail) throw new Error(errorDetail.message);

  const userWithDetails = {
    ...data.user,
    ...userDetail,
  };

  return userWithDetails;
}

// export async function getUserDetail() {
//   const { data: user, errorUser } = await supabase.auth.getUser();

//   if (errorUser) throw new Error(errorUser.message);

//   const { data: userDetail, errorDetail } = await supabase
//     .from("users")
//     .select("*")
//     .eq("id", user.user.id)
//     .single();

//   if (errorDetail) throw new Error(errorDetail.message);

//   return userDetail;
// }

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function signup({ name, surname, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        surname,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  const { dataUsers, errorUsers } = await supabase
    .from("users")
    .insert([{ id: data.user.id, name, surname, user_role: "user" }]);

  if (errorUsers) throw new Error(errorUsers.message);

  return data;
}

export async function recover({ email }) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) throw new Error(error.message);

  return data;
}
