export const updateTimestamp = function (next) {
    if (this.isModified()) {
        this.updatedAt = Date.now();
    }
    next();
};