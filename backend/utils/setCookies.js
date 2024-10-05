const setCookies = (res, token) => {
    // set token in cookie
    res.cookie("authToken", token,
        { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', maxAge: 60 * 60 * 1000 }
    )
    // .setHeader('Authorization', `Bearer ${token}`)
}

export default setCookies;