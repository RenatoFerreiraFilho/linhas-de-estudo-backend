import { GraphQLInt, GraphQLList } from "graphql";
import Account from "../types/Account.js"
import AccountResolver from "../resolvers/account.resolver.js";

const accountQueries = {
    getAccounts: {
        type: new GraphQLList(Account),
        resolve: () => AccountResolver.getAccounts()
    },
    getAccount: {
        type: Account,
        args: {
            id: {
                name: "id",
                type: GraphQLInt
            }
        },
        resolve: (_, args) => AccountResolver.getAccount(args.id)//o (_,args) serve para ignorar o primeiro termo necessário para rodar a função
    }
};

export default accountQueries;