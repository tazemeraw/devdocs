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

/* eslint-disable-next-line import/no-extraneous-dependencies */
const visit = require('unist-util-visit');

// Track these link types.
const trackerIssueTypes = [
    'MDL-', // Moodle project.
    'MDLQA-', // QA Testing.
    'MDLSITE-', // Community sites.
    'MDLUX-', // UX issues for the Moodle project.
    'MOBILE-', // Mobile issues.
    'MUA-', // Moodle Users Association.
    'UX-', // UX issues.
];

/**
 * Get the AST for a link pointing to the Moodle Tracker for the specified issue number.
 *
 * @param {String} issueNumber
 * @returns {Tree}
 */
const getLinkFromIssueNumber = (issueNumber) => ({
    type: 'link',
    url: `https://tracker.moodle.org/browse/${issueNumber}`,
    children: [{
        type: 'text',
        value: issueNumber,
    }],
});

/**
 * Update a text representation of a tracker issue into a link to that issue.
 *
 * @param {Tree} node
 * @param {Number} index
 * @param {Tree} parent
 */
const updateTextLink = (node, index, parent) => {
    const { value } = node;

    if (parent.type === 'link') {
        // This is already a link. Don't turn it into a link again.
        return;
    }

    if (!trackerIssueTypes.some((issueType) => value.indexOf(issueType) !== -1)) {
        // None of the issue types are present in this line.
        // Exit early.
        return;
    }

    // The regular expression should be:
    // (?<issueNumber>                     )          - Named capture
    //                (?:${issueTypes})               - The issue types to capture ORd - MDL-|UX-|MDLSITE-|FOO-
    //                                 \\d+           - Followed by one or more digits
    const issueTypes = trackerIssueTypes.join('|');
    const expression = new RegExp(`(?<issueNumber>(?:${issueTypes})\\d+)`);

    const matches = expression.exec(value);

    if (!matches) {
        // No matches.
        // Seems weird, but if there's an instruction like
        //   "For example MDL-XXXXX"
        // Then this will match the indexOf but not the regex.
        return;
    }

    const { issueNumber } = matches.groups;
    const link = getLinkFromIssueNumber(issueNumber);
    const tokenEnd = issueNumber.length;

    parent.children.splice(index, 1, {
        type: 'text',
        value: value.substring(0, matches.index),
    }, link, {
        type: 'text',
        value: value.substring(matches.index + tokenEnd),
    });
};

const plugin = () => {
    const transformer = async (ast) => {
        // We are only looking for _text_.
        visit(ast, 'text', (node, index, parent) => {
            updateTextLink(node, index, parent);
        });
    };
    return transformer;
};

module.exports = plugin;
