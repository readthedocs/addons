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

      bumpver update --allow-dirty --minor # use --patch if it only introduces bug fixes

#. Deploy (if needed) the new files using Read the Docs's `deploy-addons.sh <https://github.com/readthedocs/readthedocs-ops/blob/main/deploy/deploy-addons.sh>`_ script.

   .. note::

      It requires defining AWS environment variables (``AWS_ACCESS_KEY_ID``, ``AWS_SECRET_ACCESS_KEY``) and
      also a Cloudflare token (``CLOUDFLARE_API_TOKEN``).
      You can get that token here: https://dash.cloudflare.com/profile/api-tokens.

#. Update development repositories to use the just released version.

   #. Update the version at ``NGINX_ADDONS_GITHUB_TAG``:
      `dockerfiles/docker-compose.yml <https://github.com/readthedocs/common/blob/bd497c8a5b383e2059de2655b0b8527c76695dd8/dockerfiles/docker-compose.yml#L29>`_.
   #. Update ``common/`` submodule on community and commercial pointing to updated version of it.
