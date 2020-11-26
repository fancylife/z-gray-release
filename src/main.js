import GrayRule from './GrayRule';
import Account from './Account';


export default {
	isGray(grayRuleData, accountData){
		let grayRule = new GrayRule(grayRuleData);
		let account = new Account(accountData);
		
		return grayRule.include(account);
	}
}