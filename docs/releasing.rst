Releasing
=========


This is the release process for the Read the Docs Addons client.

#. Update the ``CHANGELOG.rst`` manually with the changes included in this release
#. Install dependencies and build the bundled files:

   .. code-block:: bash

      npm ci
      npm run build

#. Add all the file changes to the Git index.

   .. code-block:: bash

      git add CHANGELOG.rst dist/

#. Install ``bumpver``.

   .. code-block:: bash

      pip install bumpver==2023.1126

#. Update the version in all files. We follow `semantic versioning <https://semver.org/>`_.

   .. code-block:: bash

      bumpver update --allow-dirty --patch  # use --minor if it introduces new features

#. Deploy (if needed) the new files using Read the Docs's ``deploy-addons.sh`` script.
