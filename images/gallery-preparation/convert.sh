#!/bin/bash

# Ensure required tools are installed
command -v convert >/dev/null 2>&1 || { echo >&2 "imagemagick is required but not installed. Aborting."; exit 1; }
command -v sha256sum >/dev/null 2>&1 || { echo >&2 "sha256sum is required but not installed. Aborting."; exit 1; }

# Temporary working directory for converted images
tmp_dir=$(mktemp -d)

# Supported image extensions (case-sensitive)
extensions=("jpg" "jpeg" "JPG" "png" "heic" "HEIC")

# Find all matching images (case-sensitive)
files=()
for ext in "${extensions[@]}"; do
  while IFS= read -r -d $'\0' file; do
    files+=("$file")
  done < <(find . -maxdepth 1 -type f -name "*.${ext}" -print0)
done

# Exit if no files found
if [ ${#files[@]} -eq 0 ]; then
  echo "No matching image files found."
  exit 0
fi

# Convert all images to webp and remove original
converted_files=()
for f in "${files[@]}"; do
  # Get filename without extension
  base="${f%.*}"
  # Convert to WEBP in temp dir
  newfile="${tmp_dir}/$(basename "${base}").webp"
  convert "$f" "$newfile"
  if [ $? -eq 0 ]; then
    rm "$f"
    converted_files+=("$newfile")
  else
    echo "Failed to convert $f"
  fi
done

# Rename files based on content hash and build HTML output
output_file="generated_gallery_html.txt"
> "$output_file"

declare -A used_names

for img in "${converted_files[@]}"; do
  # Compute SHA-256 hash of image content and take first 10 characters
  hash=$(sha256sum "$img" | awk '{print $1}' | cut -c1-10)
  new_filename="${hash}.webp"

  # If hash already exists, skip (duplicate image)
  if [[ -e "./$new_filename" ]]; then
    echo "Duplicate image detected, skipping: $img"
    continue
  fi

  # Move/rename file to current directory
  mv "$img" "./$new_filename"

  # Output HTML line
  echo "<div class=\"gallery-container r2 c2\"><div class=\"gallery-item\"><div class=\"image\"><img src=\"../images/gallery/$new_filename\" alt=\"\"></div></div></div>" >> "$output_file"
done

# Cleanup temp directory
rm -r "$tmp_dir"

echo "Processing complete. HTML snippets saved in $output_file."

