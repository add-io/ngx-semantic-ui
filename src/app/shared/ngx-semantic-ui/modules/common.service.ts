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
}
