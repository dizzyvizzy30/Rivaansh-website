#!/bin/sh

set -eu

if ! command -v pandoc >/dev/null 2>&1; then
  echo "pandoc is required to generate the owner files."
  exit 1
fi

project_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$project_root"

make_text() {
  pandoc "docs/owner-content-source/$1" -t plain -o "owner-content/$2"
}

make_page() {
  page="$1"
  make_text "$page/README.md" "$page/README.txt"
  pandoc "docs/owner-content-source/$page/text.md" -o "owner-content/$page/EDIT-IN-GOOGLE-DRIVE.docx"
}

make_photo_note() {
  page="$1"
  slot="$2"
  make_text "$page/photos/$slot/what-to-shoot.md" "$page/photos/$slot/PHOTO-INSTRUCTIONS.txt"
}

make_text "00-START-HERE.md" "00-START-HERE.txt"
make_text "README.md" "README.txt"
make_text "RETURN-CHECKLIST.md" "RETURN-CHECKLIST.txt"

make_page "00-shared-site-details"
make_page "01-home"
make_page "02-treatments"
make_page "03-doctor-and-centre"
make_page "04-visit-us"
make_page "05-before-and-after-surgery"
make_page "06-health-tips"
make_page "07-book-appointment"

make_photo_note "02-treatments" "endoscope-unit"
make_photo_note "02-treatments" "hearing-test-room"
make_photo_note "03-doctor-and-centre" "consultation-room-ent-unit"
make_photo_note "03-doctor-and-centre" "doctor-portrait"
make_photo_note "03-doctor-and-centre" "operating-microscope"
make_photo_note "03-doctor-and-centre" "operation-theatre"
make_photo_note "03-doctor-and-centre" "reception-waiting-area"
make_photo_note "03-doctor-and-centre" "sterilisation-area"
make_photo_note "04-visit-us" "building-street-view"
make_photo_note "04-visit-us" "clinic-door-4th-floor"
make_photo_note "04-visit-us" "entrance-lift-lobby"

echo "Owner Google Drive files generated."
