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

#. Spin up Docker by running ``inv docker.up``.
#. Optional. Define ``USE_PROMOS=True`` if you wan to test EthicalAds addon.
#. Open any built documentation you already have in your local development instance.
#. Edit any file from addons to see the changes immediately.

.. tip::

   It's recommended to have ``test-builds`` project imported in your local instance with some of the versions already built.
   After that, you can go to the `home page </>`_ and click any of the links from the examples.
