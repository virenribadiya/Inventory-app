const makePasswordFieldForGoogleUser = () => {
    const lowercaseCharset = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseCharset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numericCharset = "0123456789";
    const specialCharset = "!@#$%^&*()-_+=";

    const charsets = [lowercaseCharset, uppercaseCharset, numericCharset, specialCharset];

    let password = "";

    // Ensure at least one character from each character set
    for (let charset of charsets) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    // Fill the remaining length with characters randomly selected from all charsets
    for (let i = password.length; i < 10; i++) {
        const randomCharsetIndex = Math.floor(Math.random() * charsets.length);
        const charset = charsets[randomCharsetIndex];
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    return password;
}



export { makePasswordFieldForGoogleUser };

