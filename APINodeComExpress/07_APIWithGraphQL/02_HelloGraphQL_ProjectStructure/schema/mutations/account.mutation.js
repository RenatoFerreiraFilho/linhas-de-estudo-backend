import { GraphQLBoolean, GraphQLInt } from "graphql";
import AccountResolver from "../resolvers/account.resolver.js";
import Account from "../types/Account.js"
import AccountInput from "../types/AccountInput.js"
const accountMutation = {
    createAccount:{
        type: Account, //o que iremos retornar
        args: {
            account: {
                name: "account",
                type: AccountInput
            }
        },
        resolve(_, args){
            return AccountResolver.createAccount(args.account)
        }
    },
    deleteAccount: {
        type: GraphQLBoolean,
        args: {
            id: {
                name: "id",
                type: GraphQLInt
            }
        },
        resolve(_, args){
            AccountResolver.deleteAccount(args.id)
        }
    },
    updateAccount: {
        type: Account,
        args: {
            account: {
                name: "account",
                type: AccountInput
            }
        },
        resolve(_, args){
            return AccountResolver.updateAccount(args.account)
        }

    }
}


export default accountMutation;