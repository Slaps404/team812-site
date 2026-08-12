# Photo index, Team 812

## Folders

| Folder | What it holds | Use |
|---|---|---|
| `original/` | Untouched HEIC from the phone. 5712x4284, ~3.4 MB each. Keep forever. | Archive only. Never publish. HEIC does not work on the web. |
| `web/` | First JPEG pass. EXIF orientation still a flag, not baked. | Intermediate. Ignore. |
| `final/` | Rotation baked in. EXIF stripped, so **no GPS data**. Progressive JPEG, quality 86, 2000 px long edge. | These go on the site. |

EXIF was stripped on purpose. Phone photos carry GPS coordinates. These are photos of
minors at a school, so location data must not go on a public page.

## Files

Source event: 2026 season, game **REBUILT**. Photos taken at a championship pit.
Confirm the exact event name before you publish captions.

| File | Shape | What it shows | Grade | Best use |
|---|---|---|---|---|
| `2026-states-IMG_1045.jpg` | 2000x1500 landscape | Wide pit shot. Six students and two mentors around the robot. "Midnight Mechanics" and a **leidos** decal both readable on the robot. | **Best in set** | Homepage hero. It shows team, robot, and a sponsor logo in one frame. |
| `2026-states-IMG_1033.jpg` | 1500x2000 portrait | Students and a mentor working on the robot in the pit. Robot bumper reads "TEAM 812" and "812". A Qualcomm decal is visible. | Strong | Robots page. Proof of engineering work. |
| `2026-states-IMG_1026.jpg` | 1500x2000 portrait | Close pit work. Mentor and two students on the robot. Shooter wheels and belt drive visible. A sponsor sheet on the table lists Qualcomm, Nordson, leidos, Cluely. | Strong | Robots page, or the "what your money builds" block. |
| `2026-states-IMG_0935.jpg` | 1500x2000 portrait | Twelve team members lined up at The Preuss School UC San Diego entrance sign. | Strong | Team page. Carries the school identity directly. |
| `2026-states-IMG_1011.jpg` | 2000x1500 landscape | Twelve team members in a hotel lobby. Team shirts clearly visible. | Good | Team page secondary. Not a hero. |
| `2026-states-IMG_1051.jpg` | 1500x2000 portrait | Two students seated in the pit. One wears an "812 REBUILT / TECHNICIAN" button. | Good | Team page. Reads human and unposed. |

## The gap

No match or field action photos. No clean photo of the robot on its own.

For a sponsor-first site, the missing shot that matters most is **the robot alone, well lit,
against a plain background.** That single photo would serve the Robots page, the press kit,
and any sponsor deck. It costs one person twenty minutes in the shop.

Second missing shot: a student teaching a child, for when outreach comes back.

## Facts confirmed from the photos

- Sponsors are **Qualcomm, Nordson, Leidos, and Cluely.** Cluely appears on the team's own
  printed sponsor sheet, so it is confirmed.
- Qualcomm and Leidos decals are **already on the robot.** So the "logo on the robot" benefit
  is real and already practised. It is not a promise you have to invent.
- The robot carries a "The Preuss School UC San Diego / TRITONS" placard.
- Season is 2026, game REBUILT.

## Naming rule for new photos

`YYYY-event-shortdescription.jpg`, lower case, hyphens only.
Example: `2026-states-robot-front.jpg`.

Do not commit `original/` to a git repository. Camera files are large, and git keeps every
version of a binary forever.
