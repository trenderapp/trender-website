export const space_regex = new RegExp(' ', 'g');
export const email_regex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
export const specialchar_regex = new RegExp(/[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/, 'gi');
export const specialcharnickname_regex = new RegExp(/[!#$%^&*()+\-=\[\]{};':"\\|,.<>/?]+/, 'gi');
export const specialcharfile_regex = new RegExp(/[!@#$%^&*()+\=\[\]{};':"\\|,<>\/?]+/, 'gi');
export const url_regex = new RegExp(/(https?:\/\/[^\s]+)/, "gm")

export const image_url_regex = new RegExp(/(https?:\/\/[^\s]+(.jpg|.png|.jpeg|.webp|.gif))/, "gm")
export const video_url_regex = new RegExp(/(https?:\/\/[^\s]+(.mp4|.mov|.webm))/, "gm")
export const audio_url_regex = new RegExp(/(https?:\/\/[^\s]+(.mp3|.wav))/, "gm")

export const mentions_regex = new RegExp(/<@[0-9]{1,30}>/, "g")
export const hashtags_regex = new RegExp(/#(.*)/, "g")