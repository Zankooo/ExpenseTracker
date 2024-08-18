import { ExpenseService } from "./services/expense.service.js";
import { GroupService } from "./services/group.service.js";

//const vrednost = await GroupService.getTotalByMember('66bd2175c051f65967ed26c5');
const neki = await ExpenseService.simplifyDebt('66bd2175c051f65967ed26c5');
console.log(neki);


