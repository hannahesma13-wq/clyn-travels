/**
 * CLYN Travels inquiry receiver.
 * 1. Create a Google Sheet and copy its spreadsheet ID from the URL.
 * 2. In Extensions > Apps Script, paste this file and set SPREADSHEET_ID below.
 * 3. Deploy > New deployment > Web app; Execute as: Me; access: Anyone.
 * 4. Copy the Web app URL into VITE_GOOGLE_SCRIPT_URL in your React project.
 *
 * Before public launch, review access settings and add your privacy notice.
 */
const SPREADSHEET_ID = 'PASTE_GOOGLE_SHEET_ID_HERE';
const SHEET_NAME = 'Booking inquiries';

function doPost(e) {
  try {
    if (!e || !e.parameter) throw new Error('No form fields received');
    if (SPREADSHEET_ID === 'PASTE_GOOGLE_SHEET_ID_HERE') {
      throw new Error('Set SPREADSHEET_ID in Code.gs first');
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
      let sheet = spreadsheet.getSheetByName(SHEET_NAME);
      if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME);

      const headers = [
        'Received at', 'Full name', 'Email', 'Phone', 'Country of residence',
        'Tour package', 'Preferred start date', 'Preferred end date',
        'Adults', 'Children', 'Special requests', 'Source'
      ];
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(headers);
        sheet.setFrozenRows(1);
      }

      // Prefix text-like values with an apostrophe to reduce spreadsheet formula injection risk.
      const safe = value => {
        const text = String(value || '').trim().slice(0, 5000);
        return /^[=+\-@]/.test(text) ? "'" + text : text;
      };
      const p = e.parameter;
      sheet.appendRow([
        new Date(), safe(p.fullName), safe(p.email), safe(p.phone), safe(p.residence),
        safe(p.tour), safe(p.startDate), safe(p.endDate), safe(p.adults),
        safe(p.children), safe(p.requests), safe(p.source)
      ]);
      return ContentService.createTextOutput(JSON.stringify({ ok: true }))
        .setMimeType(ContentService.MimeType.JSON);
    } finally {
      lock.releaseLock();
    }
  } catch (err) {
    console.error(err);
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('CLYN Travels inquiry endpoint is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}
