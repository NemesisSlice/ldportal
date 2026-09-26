LDPlayer Access Portal
=======================

What this is
-------------
A simple two-page website:
  1. A login page (index.html)
  2. A dashboard (dashboard.html) that shows friends how to install
     Moonlight and connect to your Sunshine host, once they are logged in.

Login is checked by a small serverless function so passwords are not
sitting in plain text inside the website's own code.

How to host it for free (Vercel)
----------------------------------
1. Create a free account at vercel.com.
2. Create a new GitHub repository and upload this whole folder to it
   (index.html, dashboard.html, style.css, app.js, dashboard.js, and the
   api folder with login.js and host-info.js inside it).
3. In Vercel, choose "New Project" and import that GitHub repository.
   Vercel will detect the /api folder automatically and turn each file
   inside it into a working serverless endpoint - no extra setup needed.
4. Before your first deploy, open the project's Settings, then
   Environment Variables, and add:
     PORTAL_USERS   -> a JSON list of who is allowed to log in, for example:
                        {"greg":"mypassword","alex":"friendpassword"}
     PORTAL_SECRET  -> any random long string of your choosing
     HOST_ADDRESS   -> your host computer's address that Moonlight should
                        connect to (see note below on finding this)
5. Click Deploy. Vercel gives you a free web address ending in
   .vercel.app that you can share with friends.

Finding your HOST_ADDRESS
---------------------------
This is the address Moonlight needs to reach your computer over the
internet. Options, easiest first:
  - Use a free dynamic DNS service (like DuckDNS or No-IP) pointed at
    your home internet connection, then use that name, e.g.
    mygamehost.duckdns.org
  - Or use your router's port forwarding settings plus your public IP
    address (search "what is my IP" while on the host computer), though
    this can change over time unless your internet plan gives you a
    fixed IP.

Security notes
----------------
- Only add people you trust to PORTAL_USERS, since anyone who logs in
  will see how to reach your gaming PC.
- This portal only shows connection info. The actual video/control
  stream still goes through Sunshine and Moonlight directly, this
  website does not touch that traffic at all.
- Consider changing PORTAL_SECRET and passwords occasionally.
