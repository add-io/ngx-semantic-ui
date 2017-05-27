export class CommonService {
    /**
     * Helper method to convert the string|number to a bollean.
     *
     * @param boolType The boolean type we need to process.
     */
    public static checkBooleanType(boolType: boolean|string|number) {
        return boolType === "true"
            || boolType === true
            || boolType === "1"
            || boolType === 1;
    }

    /**
     * Method is meant to clamp a number in a range of numbers.
     *
     * @param item The number in which we want to clamp.
     * @param min The minimum value the number can be.
     * @param max The maximum value the number can be.
     */
    public static clamp(item: number, min: number, max: number) {
        if (item < min) return min;
        if (item > max) return max;
        return item;
    }
}
