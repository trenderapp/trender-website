export const space_regex = new RegExp(" ", "g");
export const email_regex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
export const specialchar_regex = new RegExp(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, "gi")
export const specialcharnickname_regex = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,.<>/?]+/, "gi")