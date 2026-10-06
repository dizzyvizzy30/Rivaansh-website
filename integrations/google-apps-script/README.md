# Appointment form to Google Sheets

This integration adds verified Netlify form submissions to the first tab of the appointment spreadsheet.

## Google setup

1. Open the appointment spreadsheet.
2. Select **Extensions > Apps Script**.
3. Replace the editor contents with `appointment-sheet.gs` from this folder.
4. Open **Project Settings > Script Properties**.
5. Add a property named `NETLIFY_WEBHOOK_TOKEN` with a long random value. Keep this value private.
6. Select **Deploy > New deployment > Web app**.
7. Set **Execute as** to **Me**.
8. Set access to **Anyone** so Netlify can call the endpoint. The private token still protects writes.
9. Authorize the script and copy the deployment URL ending in `/exec`.

Keep the spreadsheet sharing setting restricted to the centre staff who manage appointments.

## Netlify setup

1. Open the Rivaansh Netlify project and go to **Forms**.
2. Enable form detection, then deploy the site.
3. Confirm that `appointment-request` appears under active forms.
4. Go to **Forms > Submission notifications > Add notification**.
5. Add an **Outgoing webhook** for the `appointment-request` form.
6. Use this URL, replacing both placeholders with the real values:

   `GOOGLE_APPS_SCRIPT_EXEC_URL?token=NETLIFY_WEBHOOK_TOKEN`

7. Add a separate email notification for `appointment@rivaanshent.com`.
8. Submit one test appointment from the live website and confirm that it appears in Netlify, the Google Sheet, and the forwarded email inbox.

The website form deliberately avoids file uploads. Do not make the spreadsheet public because it contains patient contact information.
