import jwt from "jsonwebtoken";

// "Bearer <token>"

export const authMiddleWare = async (request, response, next) => {

    if (request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {
        try {
            // tako pridobimo token, da odrezemo besedo Bearer
            let token = request.headers.authorization.split(" ")[1];
            //dekodiramo token da dobimo id plus se neki je
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            request.user = decoded.id;
            next();

        } catch(error) {
            console.log(err);
            response.status(401);
            response.json({
                message: "Not authorized"
            });
        }
    }

    else {
        response.status(401);
        response.json({
            message: "Not authorized"
        });
    }
}