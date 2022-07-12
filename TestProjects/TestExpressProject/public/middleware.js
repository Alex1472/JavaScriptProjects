const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.host}${req.originalUrl}`);
    next();
};

export default logger;
