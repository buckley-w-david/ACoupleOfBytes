script="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
package="${script}/../.."
abs_package=`readlink -f $package`

_OLD_PYTHONPATH="$PYTHONPATH"
export _OLD_PYTHONPATH="$_OLD_PYTHONPATH"

PYTHONPATH="$abs_package"
export PYTHONPATH="$PYTHONPATH"