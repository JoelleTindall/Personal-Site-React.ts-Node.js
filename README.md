WIP - Lots to do here -

A simple personal website for myself.

docker-compose build --up to run


todo:
- make an actual readme
- form validation
- test thouroughly on mobile screens (should be responsive already, though)
- allow blocks of content to be added on client side while logged in as admin ('Other stuff' page)
- same with css changes
- pretty up the admin side (namely the nav buttons)

----------------------------------------
Known issues to fix...

    - mobile view is off (at least on an iphone 13 mini)
        - notably..  click states, and dropdown/hamburger menu
    - contact form button can be spammed while sending email.
    - project upload form should just display an alert on successful submission and clear fields instead of hiding the form

-------------------------------------------

changes (as of) 6/18:

    - added nginx
    - added docker-compose and associated files
    - admin page (/admin) can be logged into with 'user' and 'password' 
    - admin can - upload/change resume file - upload/change/remove projects 
    - no client side account creation for 'security' (but maybe I'll add at some point)


changes 6/5:

    -added login page
    -authentication required to access 'uploads' page
    -projects can be uploaded via 'uploads' page and are displayed dynamically from the db

changes 6/1:

    -added image uploading (unfinished, but uploads project info and picture to db)
