const SPREADSHEET_ID = '1zEsz_DvRINBnW7UQJqTqGghiSEI8raK2f2cNZmON6jQ';
const SHEET_GID = 0;

const HEADERS = [
  'Received at',
  'Patient name',
  'Mobile number',
  'Email',
  'Appointment for',
  'Preferred date',
  'Preferred time',
  'How did you hear about us?',
  'Who referred you?',
  'Short note',
  'Confirmation understood',
  'Netlify submission ID',
];

function doPost(e) {
  try {
    verifyWebhookToken_(e);

    const requestBody = JSON.parse(e.postData && e.postData.contents ? e.postData.contents : '{}');
    const submission = requestBody.payload || requestBody;
    const data = submission.data || requestBody.data || {};
    const submissionId = String(submission.id || requestBody.id || '');

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheets().find((item) => item.getSheetId() === SHEET_GID);
    if (!sheet) throw new Error('Could not find the appointment sheet tab.');

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    try {
      ensureHeaders_(sheet);

      if (submissionId && hasSubmission_(sheet, submissionId)) {
        return jsonResponse_({ ok: true, duplicate: true });
      }

      const receivedAt = submission.created_at || requestBody.created_at || new Date().toISOString();
      sheet.appendRow([
        new Date(receivedAt),
        safeCell_(data.name),
        safeCell_(data.phone),
        safeCell_(data.email),
        safeCell_(data['appointment-for']),
        safeCell_(data['preferred-date']),
        safeCell_(data['preferred-time']),
        safeCell_(data['how-did-you-hear']),
        safeCell_(data['referred-by']),
        safeCell_(data.note),
        safeCell_(data['confirmation-understood']),
        safeCell_(submissionId),
      ]);
    } finally {
      lock.releaseLock();
    }

    return jsonResponse_({ ok: true });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function verifyWebhookToken_(e) {
  const expectedToken = PropertiesService.getScriptProperties().getProperty('NETLIFY_WEBHOOK_TOKEN');
  const receivedToken = e && e.parameter ? String(e.parameter.token || '') : '';
  if (!expectedToken || receivedToken !== expectedToken) {
    throw new Error('Unauthorized webhook request.');
  }
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
}

function hasSubmission_(sheet, submissionId) {
  if (sheet.getLastRow() < 2) return false;
  const idColumn = HEADERS.indexOf('Netlify submission ID') + 1;
  return Boolean(
    sheet
      .getRange(2, idColumn, sheet.getLastRow() - 1, 1)
      .createTextFinder(submissionId)
      .matchEntireCell(true)
      .findNext(),
  );
}

function safeCell_(value) {
  const text = value === undefined || value === null ? '' : String(value).trim();
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function jsonResponse_(body) {
  return ContentService
    .createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
