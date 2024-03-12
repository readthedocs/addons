CHANGELOG
=========

.. The text for the changelog is manually generated for now.

Version v0.11.0
---------------

:date: Mar 12, 2024

* Hide flyout when triggering the search modal from the flyout input
* Close the search modal when clicking on a result
* Allow users to define a custom ``rootSelector`` for docdiff
* Initial implementation for recent searches when opening the search modal
* Update all ``npm`` dependencies with with ``ncu -u``

Version v0.10.0
---------------

:date: Mar 5, 2024

* Flyout links keeps the page when switching versions/languages
* Update all ``npm`` dependencies with with ``ncu -u``

Version v0.9.7
--------------

:date: Feb 22, 2024

* Fix the flyout ``code-branch`` icon position
* Update all ``npm`` dependencies with with ``ncu -u``

Version v0.9.6
--------------

:date: Feb 20, 2024

* Replace the ``v:`` in the flyout for a ``code-branch`` icon
* Don't loose page position when closing notifications

Version v0.9.5
--------------

:date: Jan 31, 2024

* Improve search modal UI design
* Surround with ``<strong>`` the selected language in the flyout
* Skip pageviews analytics on external versions
* Update all ``npm`` dependencies with with ``ncu -u``

Version v0.9.4
--------------

:date: Jan 17, 2024

* Log debug data about validation when running the client in production
* Allow projects with ``multiple_versions_without_translations`` to show the flyout

Version v0.9.3
--------------

:date: Jan 15, 2024

* Security fix, more information in `GHSA-9v45-336h-5xw5 <https://github.com/readthedocs/addons/security/advisories/GHSA-9v45-336h-5xw5>`__.
* Update all ``npm`` dependencies with with ``ncu -u``

Version v0.9.2
--------------

:date: December 19, 2023

* Don't show search input on flyout when search is disabled
* Update all ``npm`` dependencies with with ``ncu -u``

Version v0.9.1
--------------

:date: November 30, 2023

* Fix issue with ``IS_TESTING`` variable that made the production javascript to
  hit ``localhost:`` for the JSON response instead of production API.

Version v0.9.0
--------------

:date: November 28, 2023

* Customize flyout font size via CSS variables
* NPM packages updated to their latest versions
* Use JSON schema to validate data from the API
* Increase test suite for all the addons.
  Test running inside the browser, checks for HTML and DOM changes,
  mocked requests and more!
* Read ``version_schema`` field instead ``single_version`` from addons API response.

Version v0.8.0
--------------

:date: November 7, 2023

* Make flyout header sticky when there are many versions
* NodeJS packages updated

Version v0.7.2
--------------

:date: October 31, 2023

* Show notification only if ``stable`` version is available (bugfix in logic)
* Typos on notification
* NodeJS packages updated

Version v0.7.1
--------------

:date: October 25, 2023

* Show non-stable notification only if ``stable`` is enabled
* Fix issue shown on JS console for global Read the Docs analytics
* Handle ``/`` keyboard shortcut properly when inside on an input

Version v0.7.0
--------------

:date: October 24, 2023

* Use ``objectPath`` on DocDiff addon to protect ourselves on ``isEnabled``
* Grab ``project-slug=`` and ``version-slug=`` from ``meta`` HTML tags and send them to the API.
* Update all the NPM package dependencies

Version v0.6.0
--------------

:date: September 26, 2023

* Update ``pre-commit`` configuration
* Update all the NPM package dependencies
* Don't show "Versions" section in flyout if the project is single version
* Make notification style better on mobile
* Don't show notification on single version projects
* Don't show version name on closed flyout when project is single version
* Use ``bumpver`` to update version on ``src/utils.js``
* Move HTTP header on requests to API endpoint to GET attribute
* Switch to ``web-test-runner`` to run tests

Version v0.5.0
--------------

:date: September 17, 2023

* Add support for scrolling vertically the flyout when there are too many versions
* Collapse flyout when clicking outside of it
* Change warning notification logic to show a notification on ``latest`` and non-``stable`` versions


Version v0.4.0
--------------

:date: September 12, 2023

* Trigger search addon from flyout input
* Focus search input in the modal immediately after showing it
* New addons: hotkeys
* Migrate search hotkeys to be managed by the new hotkeys addon.

Version v0.3.0
--------------

:date: September 6, 2023

This is the initial published version.
Users can access to the addon features by using Read the Docs' config key ``build.commands``.
See https://docs.readthedocs.io/en/latest/build-customization.html
