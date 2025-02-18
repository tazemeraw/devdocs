const copyright = `
Copyright © ${new Date().getFullYear()} Moodle Pty Ltd. Built with Docusaurus.`;

module.exports = {
    style: 'dark',
    links: [
        {
            title: 'Docs',
            items: [
                {
                    label: 'User docs',
                    href: 'https://docs.moodle.org/',
                },
                {
                    label: 'Legacy docs',
                    href: 'https://docs.moodle.org/dev/',
                },
            ],
        },
        {
            title: 'Community',
            items: [
                {
                    label: 'General Developer Forum',
                    href: 'https://moodle.org/mod/forum/view.php?id=55',
                },
                {
                    label: 'Twitter',
                    href: 'https://twitter.com/moodle',
                },
            ],
        },
        {
            title: 'More',
            items: [
                {
                    label: 'GitHub',
                    href: 'https://github.com/moodlehq',
                },
            ],
        },
    ],
    copyright,
};
