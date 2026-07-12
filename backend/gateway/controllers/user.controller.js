export const getCurrentUser = async(req,res) => {
    try {

        // we have already got user data through ptotect middleware

        return res.status(200).json(req.user);
    } catch (error) {
        return res.status(500).json({
            message: "error while getting current user"
        })
    }
}