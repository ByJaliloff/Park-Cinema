import { authInstance } from "../api/axiosInstance";

async function userSignUp ( users ) {
    try {
        const res = await authInstance.get(`/users?email=${users.email}`)
        if(res.length) {
            throw new Error("This email is already registered")
        }
            const newUser = await authInstance.post(`/users`, users)
            return newUser.data
        
    } catch (error) {
        throw new Error( err|| "Qeydiyyat zamanı xəta baş verdi");
    }
}
async function userLogin({ email, password }) {
  try {
    const res = await authInstance.get(`/users?email=${email}`);
    if (!res.data.length) {
      throw new Error("Belə bir istifadəçi mövcud deyil");
    }
    const user = res.data[0];

    if (user.password !== password) {
      throw new Error("Şifrə yanlışdır");
    }

    return user;

  } catch (err) {
    throw new Error(err.message || "Giriş zamanı xəta baş verdi");
  }
}

export {
    userSignUp, userLogin
}