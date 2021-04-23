let db;
const request = indexedDB.open('budget') // << Check back on this

request.onupgradeneeded = function (e) {
    db = e.target.result;
    db.createObjectStore('new_transaction');
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

function saveRecord() {
    console.log('Record saved!');
};

function uploadTransaction() {
    console.log('Transaction(s) uploaded!');
};

// =========== CALLBACKS END ==============================================

window.addEventListener('online', uploadTransaction);
