let db;
const request = indexedDB.open('budget_tracker', 1);

request.onupgradeneeded = function (e) {
    const db = e.target.result;
    db.createObjectStore('new_transaction', { autoIncrement: true });
};

request.onsuccess = function (e) {
    db = e.target.result;
    if (navigator.onLine) {
        console.log('Navigator online');
        uploadTransaction();
    }
};

request.onerror = function (e) {
    console.log(e.target.errorCode);
};

// =========== CALLBACKS START ============================================

function saveRecord(record) {
    const transaction = db.transaction(['new_transaction'], 'readwrite');
    const budgetObjectStore = transaction.objectStore('new_transaction');
    budgetObjectStore.add(record);
};

function uploadTransaction() {
    console.log('Transaction(s) uploaded!');
};

// =========== CALLBACKS END ==============================================

window.addEventListener('online', uploadTransaction);
