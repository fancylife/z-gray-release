class Account {
    constructor(data) {
        if (!data) {
            throw Error('miss account data')
        }
        this.data_ = data;
        this.enterpriseAccount_ = null;
        this.userId_ = null;
        this.extract();
    }
    compareAccounts(accountCompareRules) {
        // console.log('accountCompareRules');
        // console.log(accountCompareRules);
        for (let i = 0; i < accountCompareRules.length; i++) {
            let isEaAllow = false;
            let isUserAllow = false;
            let accountComparseRule = accountCompareRules[i];
            if (accountComparseRule) {
                // console.log(this.enterpriseAccount_)
                if (accountComparseRule.enterpriseAccountCompareRule.equals(this.enterpriseAccount_)) {
                    isEaAllow = true;
                    // console.log('ea  exist')
                } else {
                    // console.log('ea not exist')
                }
                let userCompareRules = [accountComparseRule.userCompareRule]
                for (let j = 0; j < userCompareRules.length; j++) {
                    let userCompareRule = userCompareRules[j];
                    if (userCompareRule.equals(this.userId_)) {
                        isUserAllow = true;
                        if (isEaAllow && isUserAllow) {
                            return true;
                        }
                    }
                }
            }

        }
        return false;
    }
    extract() {
        let list = this.data_.split('.');
        if (list.length < 3) {
            throw Error('invalid account data');
        }
        // console.log(list)
        this.enterpriseAccount_ = list[1];
        this.userId_ = list[2];
    }

}
export default Account;
