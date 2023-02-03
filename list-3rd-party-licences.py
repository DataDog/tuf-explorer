from collections import namedtuple
import os
import json
import logging

PREFERED_LICENCES = ['Apache-2.0', 'BSD-3-Clause', 'MIT', 'ISC']
OTHER_LICENCES = [
    'EPL-1.0',
    'GPL-2.0', 'GPL-2.0+', 'GPL-3.0',
    'LGPL-2.1', 'LGPL-2.1+', 'LGPL-3.0',
    'MPL-2.0',
]

Entry = namedtuple('Entry', ['Component', 'Origin', 'License', 'Copyright'])

def get_copyright(package: str) -> str:
    dir = os.path.join('node_modules', package)

    tried = list()
    for filename in os.listdir(dir):
        if filename.lower().startswith('license'):
            tried.append(filename)

            with open(os.path.join(dir, filename)) as f:
                for line in f:
                    if line.lower().startswith('copyright'):
                        return line.strip()
    else:
        logging.warning(f'package {package}: could not find a copyright notice in any of {tried}')
        return ''


def process_package(package: str):
    dir = os.path.join('node_modules', package)

    with open(os.path.join(dir, 'package.json')) as f:
        data = json.load(f)

    license = data['license']

    if license not in PREFERED_LICENCES:
        if license in OTHER_LICENCES:
            logging.info(f'package {package}: non-prefered license "{license}"')

        else:
            logging.warning(f'package {package}: unknown license "{license}"')

    copyright = get_copyright(package)

    return Entry(package, 'NPM', license, copyright)

entries = list[Entry]()

for package in os.listdir('node_modules'):
    if package in {'.package-lock.json', '.bin'}:
        continue

    if package.startswith('@'):
        namespace = package
        for package in os.listdir(f'node_modules/{namespace}'):
            try:
                entries.append(process_package(f'{namespace}/{package}'))
            except Exception as err:
                logging.error(f'package {namespace}/{package}: {repr(err)}')
    else:
        try:
            entries.append(process_package(package))
        except Exception as err:
            logging.error(f'package {package}: {repr(err)}')

print(','.join(Entry._fields))
for entry in entries:
    print(','.join(entry))
