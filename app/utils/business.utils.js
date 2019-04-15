/**
 * 
 * Business logic required the 
 * for the application
 * 
 * 
 */


import { GetData, PostData } from './http.utils';


/**
 * Get the ledger of the month
 */
export async function GetLedger({ month }) {
    return GetData({ url: 'ledgers/' + month.format('YYYY-MM') });
}

/**
 * Get the ledger of the month
 */
export async function GetExpense({ month }) {
    return GetData({ url: 'expenses' });
}

/**
 * 
 * Get the Transaction history of the month
 * 
 * @param {*} param0 
 */
export async function GetTransactions({ month }) {
    return GetData({ url: 'ledger_transactions' });
}

export async function GetSupport({ month }) {
    return GetData({ url: 'maintenance_tickets/my' })
}

export async function GetNotice({ month }) {
    return GetData({ url: 'notices' })
}
export async function GetRentals({ month }) {
    return GetData({ url: 'rent_transactions' })
}

/**
 * Get the ledger of the month
 */
export async function CreateExpense({ formBody }) {
    return PostData({ url: 'expenses', formBody });
}

export async function AddNotice({ formBody }) {
    return PostData({ url: 'notices', formBody });
}
export async function CreateRentals({ formBody }) {
    return PostData({ url: 'rent_transactions', formBody });
}
