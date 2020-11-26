const WHITE_PREFIX = 'white:';
const BLACK_PREFIX = 'black:';
import UserCompareRule from './UserCompareRule';
import EnterpriseAccountCompareRule from './EnterpriseAccountCompareRule'
class GrayRule {
    constructor(data) {
        if (!data) {
            throw Error('miss grayRule data')
        }
        this.data_ = data.replace(/\s/g, '');
        this.isAllow_ = false;
        this.isAllowAll_ = false;
        this.isDenyAll_ = false;
        this.allowAccounts_ = [];
        this.denyAccounts_ = [];
        this.extract();
    }
    extract() {
        let includesStr = this.data_.includes.bind(this.data_);
        if (includesStr('allow')) { //放全量
            this.isAllowAll_ = true;
        } else if (includesStr('deny')) { //关闭灰度
            this.isDenyAll_ = true;
        } else if (includesStr('black:')) {
            let data = this.data_.replace(BLACK_PREFIX);
            this.denyAccounts_ = this.parseAcccounts(data)
        } else if (includesStr('white:')) { // 开放白名单
            this.isAllow_ = true;
            // console.log('开放白名单 white')
            let data = this.data_.replace(WHITE_PREFIX, '');
            this.allowAccounts_ = this.parseAcccounts(data)
        } else {
            let data = this.data_.replace(WHITE_PREFIX, '');
            // console.log('开放白名单 default')
            // console.log(data)
            this.allowAccounts_ = this.parseAcccounts(data)
        }
    }
    parseEnterpriseAccountCompareRule(eaStr) {
        return new EnterpriseAccountCompareRule({
            key: eaStr,
            equals: function(enterpriseAccount){
                // console.log('equals')
                // console.log(eaStr)
                return eaStr == enterpriseAccount;
            }
        });
    }
    paserUserCompareRule(userIdsStr) {
        if (userIdsStr === '*'|| !userIdsStr || userIdsStr.length === 0) {
            return new UserCompareRule({
                key: '*',
                equals: function () {
                    return true;
                }
            })
        }
        if (/((.)\,)+/.test(userIdsStr)) {
            return new UserCompareRule({
                key: userIdsStr,
                equals: function (userId) {
                    // console.log(userIdsStr);
                    // console.log(userId)
                    // console.log(userIdsStr.includes(userId))
                    return userIdsStr.includes(userId);
                }
            })
        }
        if (/^(\d+)-(\d+)$/.test(userIdsStr)) {
            let range = userIdsStr.split('-');
            return new UserCompareRule({
                key: userIdsStr,
                equals: function (userId) {
                    return Number(userId) <= Number(range[1]) && Number(userId) >= Number(range[0]);
                }
            })
        }
        return null;
    }
    parseAcccounts(dataStr) {
        if (/((.)\|)+/.test(dataStr)) { // 分别 aa|bb|dd
            return dataStr.split('|').map(key => {
                return this.parseAcccount(key);
            })
        }
        return [this.parseAcccount(dataStr)];
    }
    parseAcccount(accountStr) {
        let userIdRgex = /(.+)\./;
        let item = {}
        if (userIdRgex.test(accountStr)) {
            let eaStr = userIdRgex.exec(accountStr)[1];
            item.enterpriseAccountCompareRule = this.parseEnterpriseAccountCompareRule(eaStr);
            item.userCompareRule = this.paserUserCompareRule(accountStr.substr(eaStr.length + 1));

        } else {
            item.enterpriseAccountCompareRule = this.parseEnterpriseAccountCompareRule(accountStr);
            item.userCompareRule = this.paserUserCompareRule('*')
        }

        return item;
    }
    include(account) {
        if (this.isDenyAll_) {
            return false;
        }
        if (this.isAllowAll_) {
            return true;
        }
        if (this.isAllow_ && this.allowAccounts_ && this.allowAccounts_.length) {
            return account.compareAccounts(this.allowAccounts_);
        }

    }
}
export default GrayRule;
