Testing
=======

This is a small guide that explains how to test the JavaScript client locally.


localhost
---------

#. Run ``npm run dev`` in the terminal.
#. Open http://localhost:8000/
#. There shouldn't be any error in the console,
   notifications, ad should be place correctly, flyout floating a the bottom right
   and search modal should work properly.

.. note::

   This test is *very basic* and it's only useful for a quick check.
   Testing on Read the Docs is the recommended way, but it requires more work to set up.


Read the Docs
-------------

#. Run development server, ``npm run dev``.
#. Spin up Docker by running ``inv docker.up``.
#. Optional. Define ``USE_PROMOS=True`` if you wan to test EthicalAds addon.
#. Edit ``common/dockerfiles/force-readthedocs-addons.js`` to point to the development server:

   .. code-block:: diff


      diff --git a/dockerfiles/force-readthedocs-addons.js b/dockerfiles/force-readthedocs-addons.js
      index 82a44c4..2b0d46d 100644
      --- a/dockerfiles/force-readthedocs-addons.js
      +++ b/dockerfiles/force-readthedocs-addons.js
      @@ -15,7 +15,7 @@

      // add "readthedocs-addons.js" inside the "<head>"
      const addonsJs =
      -  '<script async type="text/javascript" src="/_/static/javascript/readthedocs-addons.js"></script>';
      +  '<script async type="text/javascript" src="http://localhost:8000/readthedocs-addons.js"></script>';

      // selectors we want to remove
      // https://developers.cloudflare.com/workers/runtime-apis/html-rewriter/#selectors
#. Open any built documentation you already have in your local development instance.

.. tip::

   It's recommended to have ``test-builds`` project imported in your local instance with some of the versions already built.
   After that, you can go to the `home page </>`_ and click any of the links from the examples.
