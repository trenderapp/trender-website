export const apibaseurl = process.env.NEXT_PUBLIC_BASE_API_URL;
export const cdnbaseurl = process.env.NEXT_PUBLIC_CDN_URL;
export const websocketurl = process.env.NEXT_PUBLIC_WEBSOCKET_URL;
export const websiteurl = process.env.NEXT_PUBLIC_WEBSITE_URL;
export const captchasiteKey = process.env.NEXT_PUBLIC_CAPTCHA_KEY;
export const posturl = `${websiteurl}/trends`;

export const userPath = (user_id, name, type = "avatars") => {
    if(name === "base_1.png" || name === "base_2.png") return `${cdnbaseurl}/${type}/${name}`;
    return `${cdnbaseurl}/${type}/${user_id}/${name}`;
}