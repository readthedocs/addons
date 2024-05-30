🦸 Read the Docs Addons
=======================

JavaScript client injected into documentation pages served at Read the Docs.
This client allows projects to quickly integrate with all the nice features that Read the Docs offers.


Examples
--------

We maintain a list of examples to check our JavaScript client is working correctly:

.. raw:: html

   <div id="local-slider">
   <label class="switch">
     <input type="checkbox">
     <span class="slider round"></span>
   </label>
   <span><small>Make links to point to development instance</small></span>
   </div>

   <script type="text/javascript">
     const checkbox = document.querySelector("#local-slider input");
     checkbox.checked = false;

     checkbox.addEventListener("change", function (event) {
       for (const link of document.querySelectorAll("a")) {
         if (event.currentTarget.checked) {
           if (link.href.startsWith("https://test-builds.readthedocs.io/")) {
             link.href = link.href.replace("https://test-builds.readthedocs.io/", "http://test-builds.devthedocs.org/");
           }
         }
         else {
           if (link.href.startsWith("http://test-builds.devthedocs.org/")) {
             link.href = link.href.replace("http://test-builds.devthedocs.org/", "https://test-builds.readthedocs.io/");
           }
         }
       }
     });
   </script>

* `Antora <https://test-builds.readthedocs.io/en/antora/>`_
* `Asciidoctor <https://test-builds.readthedocs.io/en/asciidoctor/>`_
* `D2L-Book <https://test-builds.readthedocs.io/en/d2lbook/>`_
* `Docsify <https://test-builds.readthedocs.io/en/docsify/>`_
* `Docusaurus <https://test-builds.readthedocs.io/en/docusaurus/>`_
* `Jekyll <https://test-builds.readthedocs.io/en/jekyll/>`_
* `Jupyter Book <https://test-builds.readthedocs.io/en/jupyter-book/>`_
* `MkDocs <https://test-builds.readthedocs.io/en/mkdocs/>`_
* `MkDocs (Material theme) <https://test-builds.readthedocs.io/en/mkdocs-material/>`_
* `MkDocs (Terminal theme) <https://test-builds.readthedocs.io/en/mkdocs-material/>`_
* `Pelican <https://test-builds.readthedocs.io/en/pelican/>`_
* `Sphinx (Alabaster theme) <https://test-builds.readthedocs.io/en/latest/>`_
* `Sphinx (Awesome theme) <https://test-builds.readthedocs.io/en/sphinx-awesome/>`_
* `Sphinx (Furo theme) <https://test-builds.readthedocs.io/en/furo/>`_
* `Sphinx (Read the Docs theme) <https://test-builds.readthedocs.io/en/latest/>`_
* `Sphinx (Typlog theme) <https://test-builds.readthedocs.io/en/typlog-theme/>`_


Contents
--------

.. toctree::

   releasing
   testing

.. raw:: html

    <style>
    /* The switch - the box around the slider */
    /* https://www.w3schools.com/howto/howto_css_switch.asp */
    .switch {
      position: relative;
      display: inline-block;
      width: 30px;
      height: 17px;
    }

    /* Hide default HTML checkbox */
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    /* The slider */
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #ccc;
      -webkit-transition: .4s;
      transition: .4s;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 13px;
      width: 13px;
      left: 2px;
      bottom: 2px;
      background-color: white;
      -webkit-transition: .4s;
      transition: .4s;
    }

    input:checked + .slider {
      background-color: #2196F3;
    }

    input:focus + .slider {
      box-shadow: 0 0 1px #2196F3;
    }

    input:checked + .slider:before {
      -webkit-transform: translateX(13px);
      -ms-transform: translateX(13px);
      transform: translateX(13px);
    }

    /* Rounded sliders */
    .slider.round {
      border-radius: 17px;
    }

    .slider.round:before {
      border-radius: 50%;
    }
    </style>
