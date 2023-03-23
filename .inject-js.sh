sed -i -e 's|</head>|<script src="readthedocs-client.js"></script></head>|g' $READTHEDOCS_OUTPUT/html/pelican/index.html
sed -i -e 's|</head>|<script src="readthedocs-client.js"></script></head>|g' $READTHEDOCS_OUTPUT/html/sphinx/index.html
