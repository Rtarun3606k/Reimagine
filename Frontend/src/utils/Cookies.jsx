import Cookies from "js-cookie";

export const store_access_token = (access_token) => {
  Cookies.set("access_token", access_token, {
    expires: 1,
    secure: true,
    sameSite: "strict",
  });
  // window.location.reload();
};

export const delete_access_token = () => {
  Cookies.remove("access_token");
  console.log("deleting access token");
  // window.location.reload();
};

export const get_access_token = () => {
  const access_token = Cookies.get("access_token");
  console.log(access_token);
  return access_token || false;
};

export const edit_access_token = (new_access_token) => {
  Cookies.set("access_token", new_access_token, {
    expires: 1,
    secure: true,
    sameSite: "strict",
  });
};
