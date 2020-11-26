class EnterpriseAccountCompareRule {
    constructor({key, equals}){
        this.key_  = key;
        this.equals_ = equals;
    }
    equals(val){
        return this.equals_(val);
    }
}

export default EnterpriseAccountCompareRule;