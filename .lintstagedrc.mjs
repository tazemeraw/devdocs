/**
 * Copyright (c) Moodle Pty Ltd.
 *
 * Moodle is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Moodle is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Moodle.  If not, see <http://www.gnu.org/licenses/>.
 */

export default {
  "*.css": ["stylelint --allow-empty-input --fix"],
  "*.{js,jsx,ts,tsx,mjs}": ["eslint --fix"],
  "*.md": [
    "markdownlint-cli2-fix",
    "cspell --no-must-find-files --no-progress"
  ],
  "src/**/*.{js,jsx,ts,tsx,mjs}": [
    "cspell --no-must-find-files --no-progress"
  ],
  "data/projects.json": () => (
    'yarn ajv --spec=draft2019 validate -s static/schema/projects.json -d data/projects.json'
  )
}
