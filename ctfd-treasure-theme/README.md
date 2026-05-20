# Treasure Map Theme

A custom CTFd theme with a pirate treasure-map concept for **Treasure Hunt**.
This theme turns the CTFd experience into an interactive pirate arena: challenges become islands, categories become routes, and solved challenges become claimed treasures.

> Built for CTFd and inspired by the structure of community CTFd themes such as `ctfd-neon-theme`.

## Compatibility

- Target platform: CTFd 3.8.5
- Compatibility status: Built and packaged for CTFd 3.8.5
- Theme version: v1
- Author: Amablex

## Features

- Pirate Treasure Map landing page
- Google Maps-style challenge board
- Draggable map mode with ON/OFF toggle
- Challenge pins grouped by category routes
- Interactive clue modal
- Copy/Open buttons for challenge connection URLs
- Correct/wrong flag feedback animation
- Custom login and register pages
- Custom crews/users page
- Custom scoreboard / captain ledger
- Custom profile dashboard
- Custom settings page
- Admin and Settings navigation visible only for admin accounts
- Footer: `Copyright © Amablex 2026`

## Folder Structure

```text
ctfd-treasure-theme/
├── README.md
├── LICENSE
├── theme.json
├── static/
│   ├── css/
│   │   └── treasure.css
│   ├── img/
│   │   └── favicon.ico
│   └── js/
│       ├── challenge-map-v10.js
│       ├── challenge-map-v11.js
│       └── treasure.js
└── templates/
    ├── base.html
    ├── challenges.html
    ├── index.html
    ├── login.html
    ├── register.html
    ├── notifications.html
    ├── scoreboard.html
    ├── settings.html
    ├── users/
    │   ├── private.html
    │   ├── public.html
    │   └── users.html
    └── components/
        └── navbar.html
```

## Installation

### 1. Copy the theme into CTFd

If you use a standard CTFd Docker setup:

```bash
unzip ctfd-treasure-theme.zip
cp -r ctfd-treasure-theme ./CTFd/themes/
docker compose restart
```

If your CTFd path is different, copy the folder into:

```text
CTFd/CTFd/themes/
```

### 2. Enable the theme

Open the CTFd admin panel:

```text
Admin Panel -> Config -> Theme
```

Select:

```text
CTFd Treasure Map
```

Then save and hard refresh the browser:

```text
CTRL + F5
```

## Usage Notes

### Challenge Map

The Treasure Map page reads challenges from the CTFd API:

```text
/api/v1/challenges
```

If challenges do not appear on the map, check these items:

1. The challenge is visible, not hidden.
2. The event is already open for users.
3. The logged-in user can access the challenge.
4. The endpoint `/api/v1/challenges` returns challenge data.
5. Browser cache has been cleared with `CTRL + F5`.

### Connection Field

For challenge connection URLs, the clue modal supports:

- Copy connection text
- Open URL in a new tab
- Clickable connection link if the value is a valid URL

### Crews Search

The crews/users search page supports default reset behavior. If the search box is empty, it returns users to the default listing instead of showing a browser validation warning.

## Customization

Main files to edit:

```text
templates/base.html
templates/components/navbar.html
templates/index.html
templates/challenges.html
templates/users/private.html
templates/users/public.html
templates/users/users.html
templates/settings.html
static/css/treasure.css
static/js/treasure.js
```

Theme metadata is stored in:

```text
theme.json
```

Example:

```json
{
  "name": "Harbas Treasure Map ",
  "author": "Amablex",
  "description": "Pirate Google Maps-style CTFd theme with polished captain dashboard and treasure map challenge board.",
  "version": "1.0.0"
}
```

## Troubleshooting

### Theme does not appear in CTFd

Check that the folder exists inside the CTFd themes directory:

```bash
docker compose exec ctfd ls -lah /opt/CTFd/CTFd/themes
```

### Page still shows old layout

Clear the browser cache:

```text
CTRL + F5
```

Also check whether an old `index` page from Admin Panel -> Pages is overriding the theme homepage.

### Static files do not load

Open this URL in the browser and check whether it returns CSS:

```text
https://your-domain/themes/ctfd-treasure-theme/static/css/treasure.css
```

If it returns 404, the theme folder is not copied into the correct CTFd themes path.

## Credits

- CTFd
- chainflag/ctfd-neon-theme as structural reference
- Amablex for the Harbas Treasure Map concept and customization

## License

This project is licensed under the GNU General Public License v2.0.
See the `LICENSE` file for details.

## Copyright

Copyright © Amablex 2026
