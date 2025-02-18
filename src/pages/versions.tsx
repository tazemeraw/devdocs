/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Translate from '@docusaurus/Translate';
import {
  useVersions,
  useLatestVersion,
} from '@docusaurus/plugin-content-docs/client';

import VersionsArchived from '@site/versionsArchived.json';

const VersionsArchivedList = Object.entries(VersionsArchived);

function DocumentationLabel() {
  return (
    <Translate id="versionsPage.versionEntry.link">Documentation</Translate>
  );
}

function ReleaseNotesLabel() {
  return (
    <Translate id="versionsPage.versionEntry.releaseNotes">
      Release Notes
    </Translate>
  );
}

export default function Version(): JSX.Element {
  const {
    siteConfig: {organizationName, projectName},
  } = useDocusaurusContext();
  const versions = useVersions();
  const latestVersion = useLatestVersion();
  const currentVersion = versions.find(
    (version) => version.name === 'current',
  )!;
  const stableVersions = versions.filter(
    version => version.name !== 'current',
  );
  const repoUrl = `https://github.com/${organizationName}/${projectName}`;

  return (
    <Layout
      title="Versions"
      description="Moodle Developer documentation versions page listing all developer documentation">
      <main className="container margin-vert--lg">
        <Heading as="h1">
          <Translate id="versionsPage.title">
            Moodle documentation versions
          </Translate>
        </Heading>

        {latestVersion && (
          <div className="margin-bottom--lg">
            <Heading as="h3" id="next">
              <Translate id="versionsPage.current.title">
                The next version of Moodle (master)
              </Translate>
            </Heading>
            <p>
              <Translate id="versionsPage.current.description">
                Here you can find the documentation for current released
                versions.
              </Translate>
            </p>
            <table>
              <tbody>
                <tr>
                  <th>{latestVersion.label}</th>
                  <td>
                    <Link to={latestVersion.path}>
                      <DocumentationLabel />
                    </Link>
                  </td>
                  <td>
                    <Link to={latestVersion.path + "/release-notes"}>
                      <ReleaseNotesLabel />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="margin-bottom--lg">
          <Heading as="h3" id="next">
            <Translate id="versionsPage.current.title">
              Currently supported versions of Moodle (Stable)
            </Translate>
          </Heading>
          <p>
            <Translate id="versionsPage.current.description">
              Here you can find the documentation for current released
              versions.
            </Translate>
          </p>
          <table>
            <tbody>
              {stableVersions.map((version) => (
                <tr>
                  <th>{version.label}</th>
                  <td>
                    <Link to={version.path}>
                      <DocumentationLabel />
                    </Link>
                  </td>
                  <td>
                    <Link to={version.path + "/release-notes"}>
                      <ReleaseNotesLabel />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {currentVersion !== latestVersion && (
          <div className="margin-bottom--lg">
            <Heading as="h3" id="latest">
              <Translate id="versionsPage.next.title">
                Next version (Unreleased)
              </Translate>
            </Heading>
            <p>
              <Translate id="versionsPage.next.description">
                Here you can find the documentation for work-in-process
                unreleased version.
              </Translate>
            </p>
            <table>
              <tbody>
                <tr>
                  <th>{currentVersion.label}</th>
                  <td>
                    <Link to={currentVersion.path}>
                      <DocumentationLabel />
                    </Link>
                  </td>
                  <td>
                    <Link to={currentVersion.path + "/release-notes"}>
                      <ReleaseNotesLabel />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {(VersionsArchivedList.length > 0) && (
          <div className="margin-bottom--lg">
            <Heading as="h3" id="archive">
              <Translate id="versionsPage.archived.title">
                Past versions (Not maintained anymore)
              </Translate>
            </Heading>
            <p>
              <Translate id="versionsPage.archived.description">
                Here you can find documentation for previous versions of
                Docusaurus.
              </Translate>
            </p>
            <table>
              <tbody>
                {VersionsArchivedList.map(([versionName, versionUrl]) => (
                  <tr key={versionName}>
                    <th>{versionName}</th>
                    <td>
                      <Link to={versionUrl}>
                        <DocumentationLabel />
                      </Link>
                    </td>
                    <td>
                      <Link href={`${repoUrl}/releases-notes`}>
                        <ReleaseNotesLabel />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="margin-bottom--lg">
          <h3 id="legacy">Legacy Moodle Developer documentation</h3>
          <p>
            You can find the <Link href="https://docs.moodle.org/dev/">
              Legacy Moodle Developer documentation
            </Link> which is no longer maintained. Relevant documentation will be migrated to this site instead.
          </p>
        </div>
      </main>
    </Layout>
  );
}
