export const REGEX = {
  phone: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  websiteURL:
    /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/,
};
