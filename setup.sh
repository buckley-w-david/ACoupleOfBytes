#!/bin/bash
virtualenv -p python3 venv
cat export_pypath.sh >> venv/bin/activate
sed --in-place '/unset -f pydoc >\/dev\/null 2>&1/{s/.*/&\n    if ! [ -z "${_OLD_PYTHONPATH+_}" ] ; then\n        PYTHONPATH="$_OLD_PYTHONPATH"\n        export PYTHONPATH\n        unset _OLD_PYTHONPATH\n    fi\n/;:a;n;ba}' venv/bin/activate
source venv/bin/activate
pip install -r requirements.txt