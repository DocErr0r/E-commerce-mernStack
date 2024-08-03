const setCookies = (res, token) => {
    // set token in cookie
    res.cookie("authToken", token,
        { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 60 * 60 * 1000 }
    )
    // .setHeader('Authorization', `Bearer ${token}`)
}

export default setCookies;