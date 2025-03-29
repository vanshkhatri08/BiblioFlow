export const sendToken = (user, statusCode, message, res) =>{
    const token = user.generateToken();
    res 
    .status(statusCode) 
    .cookie("token", sendToken,{
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    });JSON({
        succes: true,
        user, 
        message,
        token,
    });
};