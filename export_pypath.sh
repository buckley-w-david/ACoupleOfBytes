script="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
package="${script}/../.."
abs_package=`readlink -f $package`
export _OLD_PYTHONPATH=$PYTHONPATH
PYTHONPATH="$abs_package"
export PYTHONPATH