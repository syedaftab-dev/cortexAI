import redis from "../shared/redis/redis.js"
const protect = async (req,res,next) => {

    try {
        // get session for session id to fecth data from rdis
        const sessionId = req.cookies.session; // session -- name of cookies we gave while login
        // check if user is loginned
        if(!sessionId){
            return res.status(400).json({
                message: "Unauthorized - No session cookie found."
            })
        }

        // get redis data
        const session = await redis.get(`session-${sessionId}`)
        // if not found that means session expires login again
        if(!session){
            return res.status(400).json({
                message: "session expired"
            })
        }

        // we have req--object, this object can later be accessed by our auth controller so we make a variable inside it

        // session found
        req.user = JSON.parse(session)
        
        next() // after verfication redirect user to the next controller


    } catch (error) {
        return res.status(400).json({
            message: "error while verifying session"
        })
    }

}

export default protect