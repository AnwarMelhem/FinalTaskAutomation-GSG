export default class GenericHelper {
    static genericRandomNumber(maxNumber = 10000) {
        return Math.round(maxNumber * (Math.random()))
    }
}