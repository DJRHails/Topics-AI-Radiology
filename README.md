website

Topics website for Imperial 1st Year

* Free software: BSD license

Requirements
------------

* Django 1.10+
* Python 2.7
* Django CMS 3.4+

Installation
----------------------------

#. Clone the git repository.
#. Create a production.py file in Topics-AI-Radiology/website/website/settings by copying what's in the example_production.py
    * Fill database details in the file you just created
    * Add the site admins in the ADMINS variable
    * Add server host in ALLOWED_HOSTS

#. Install all third party packages by running::

    $ pip install -r requirements/development.txt

#. Apply migrations::

    $ python manage.py migrate

Running Locally
----------------------------
