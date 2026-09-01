Saturday 12:17 AM
Pasted markdown(20260828-184737).md
File
this is frontend for now
now lets create a propmt for antigravity , this is the current one 
this is the current one , give me the prompt now, in md file

these are the changes 

um ig it just changes the place after simulating congestion rn 
Today 4:46 PM
in farmers view on mobile i dont see a way to navigate like we have on pc , we can only click on track live queue ig ?
also currently admin and opoerator pages feels one scroll which is a lil longer process ig 
also my frined said create difff files for mobile and desktop
after seeing my ui which he aslo called bad btw so what must he mean ?

now with the mandi tab ,  this is obv too um conjusted for a farmer 
um should i now not recieve a option to pull and merge stuff
Pasted markdown(20260901-141726).md
File
Pasted markdown(20260901-142039).md
File
Pasted markdown(20260901-142419).md
File
Pasted markdown(20260901-142653).md
File
here is the md file of the audit report pls read this

Yep. Put it at the root of your project, alongside package.json.

thirytwo/
├── src/
├── public/
├── package.json
├── vite.config.js
├── README.md
└── KISANSETU_UI_RULES.md   ← PUT IT HERE

You can create it directly in Antigravity/VS Code: right-click the thirytwo root folder → New File → KISANSETU_UI_RULES.md, then paste this:

# KisanSetu UI Rules
## Design Constitution

This document defines the core UI/UX principles for KisanSetu.

It is a reference document for all future frontend work.

Before making UI changes, read and follow these rules.

The goal is NOT to make KisanSetu look impressive.

The goal is to make KisanSetu feel like a real, trustworthy, easy-to-use service designed around the actual people and workflows it serves.

---

# 1. CORE PRINCIPLE

KisanSetu should feel like a practical service, not an AI-generated SaaS dashboard.

The interface should communicate:

> "I immediately understand what I need to do."

rather than:

> "There is a lot of information available to me."

Clarity comes before visual complexity.

---

# 2. DIFFERENT ROLES MUST FEEL DIFFERENT

KisanSetu has three major roles.

They have different jobs and therefore should NOT have identical UI philosophies.

## Farmer

Primary question:

> "Ab mujhe kya karna hai?"

The Farmer interface should be:

- simple
- visual
- calm
- action-oriented
- mobile-first
- easy to understand
- low in technical terminology
- suitable for users with limited digital literacy

The farmer should not need to understand how the system works internally.

---

## Operator

Primary question:

> "Ab kis farmer par action lena hai?"

The Operator interface should prioritize:

- speed
- queue visibility
- operational status
- clear actions
- quick scanning
- minimal unnecessary interaction

Higher information density is acceptable here because the operator is working with the system professionally.

---

## Admin

Primary question:

> "System mein kya ho raha hai?"

The Admin interface can appropriately use:

- metrics
- charts
- tables
- centre performance
- procurement statistics
- payment/DBT monitoring
- system-level information

A dashboard-like appearance is acceptable when it serves a genuine administrative purpose.

---

# 3. FARMER-FIRST DESIGN

The Farmer interface is the highest-priority UX.

A farmer opening the application should understand the current situation quickly.

The Home screen should answer:

1. What is happening?
2. What is my token?
3. When is my turn?
4. What do I need to do now?
5. Where do I need to go?

Avoid forcing the farmer to explore the application to discover these answers.

---

# 4. ONE PRIMARY ACTION

Every important Farmer screen should have one obvious primary action.

Example:

> Track My Turn

Other actions should be secondary.

Avoid presenting multiple buttons with similar importance.

Do not have:

- Track My Turn
- Track Live Queue
- View Queue
- Check My Position

when all of them essentially perform the same task.

One clear action is better.

---

# 5. DO NOT REPEAT INFORMATION

Information should have one strong, logical home.

For example, if the farmer already sees:

> Token: SNP-014  
> 3 farmers ahead  
> About 24 minutes

do not immediately repeat the same information in separate:

- Active Token card
- Queue Position card
- metric card
- status widget

Repetition increases visual clutter and makes the application feel artificially assembled.

---

# 6. CARDS MUST HAVE A PURPOSE

Cards are NOT forbidden.

Cards should be used when they represent a meaningful concept, object or task.

Good examples:

- Digital Mandi Pass
- Current Booking
- Congestion Warning
- Important Action

Avoid creating a separate card for every individual number.

Bad pattern:

```text
┌ Token ┐
┌ Farmers Ahead ┐
┌ Wait Time ┐
┌ Capacity ┐
┌ Slot ┐
┌ Location ┐

Prefer grouping related information naturally.

7. AVOID CARD-IN-CARD DESIGN

Avoid excessive nesting such as:

Card
 └── Card
      └── Card
           └── Card

This is one of the visual patterns that can make the interface feel AI-generated.

Use:

whitespace
hierarchy
typography
subtle dividers
grouping

instead of borders around everything.

8. AVOID GENERIC AI-DASHBOARD PATTERNS

Do not automatically use:

repeated metric-card grids
excessive rounded rectangles
excessive pills
excessive badges
excessive shadows
excessive borders
decorative telemetry
unnecessary status ribbons
generic SaaS dashboard layouts
large collections of identical cards

Do not add a component merely because it makes the interface look "more designed."

Every visual element should have a reason.

9. USE ALL-CAPS SPARINGLY

Avoid unnecessary ALL-CAPS labels such as:

ACTIVE TOKEN

QUEUE POSITION

NORMAL LOAD

SYSTEM OVERSIGHT

Sentence case should generally be preferred.

Use capitalization when it improves hierarchy or readability, not to make the interface look technical.

10. TYPOGRAPHY

Typography should feel natural and readable.

Do not use monospace fonts for normal user-facing information simply because the value is a number.

Monospace may be appropriate for:

technical IDs
token identifiers
code-like values

But normal information such as:

About 24 minutes

3 farmers ahead

85% capacity

should generally use normal readable typography.

11. VISUAL HIERARCHY

Not everything should look equally important.

A Farmer screen should clearly establish:

Primary

What the farmer needs to know/do NOW.

Secondary

Information needed to complete the task.

Tertiary

Additional details that can be discovered when needed.

If every section has:

a large heading
a border
a badge
an icon
a button

then nothing feels important anymore.

12. VISUAL GUIDANCE FOR FARMERS

Where appropriate, use recognizable visual symbols and custom SVG icons to support understanding.

Examples:

Location → location icon
Token → ticket/pass icon
Waiting → clock icon
Weighing → weighing-scale icon
Payment → money/payment icon
Completed → check icon

Icons should communicate meaning.

Do NOT use icons simply as decoration.

Do NOT turn the interface into an emoji collection.

13. LANGUAGE & DIGITAL LITERACY

KisanSetu should support:

English
हिंदी

The Farmer interface should eventually support audio guidance as well.

However, simply translating complicated English UI into Hindi is NOT enough.

The underlying interaction itself should be simple.

Prefer:

आपकी बारी आने वाली है

over technical wording.

Prefer:

रास्ता देखें

over complicated navigation terminology.

Language should feel natural and understandable.

14. MOBILE-FIRST FARMER EXPERIENCE

The Farmer experience is primarily designed for mobile.

Target screens include approximately:

375px
390px
412px

Do NOT simply shrink the desktop layout.

Mobile layouts should be intentionally designed for small screens.

Prioritize:

readable text
large touch targets
thumb-friendly actions
short content blocks
clear hierarchy
minimal scrolling
minimal typing
no horizontal overflow
15. MOBILE NAVIGATION

The Farmer mobile navigation should remain simple and thumb-accessible.

Preferred structure:

Home
Mandi
Token
Payment

Use:

clear icons
short labels
obvious active state
sufficiently large touch targets

Do not add unnecessary navigation layers.

16. PROGRESSIVE DISCLOSURE

Do not expose every piece of information at once.

Show the most important information first.

Example:

Your turn is coming

SNP-014

3 farmers ahead
About 24 minutes

[ Track My Turn ]

Then provide additional information such as:

mandi
slot
directions
next steps

when relevant.

The farmer should not need to process the entire application at once.

17. REAL-WORLD WORKFLOW SHOULD DRIVE THE UI

The visual structure should reflect the real KisanSetu workflow:

Farmer
   ↓
Choose Mandi
   ↓
Book Slot
   ↓
Receive Token
   ↓
Reach Mandi
   ↓
Gate Check-in
   ↓
Wait for Turn
   ↓
Crop Inspection
   ↓
Weighment
   ↓
Procurement
   ↓
Payment / DBT

The interface should help the user understand this journey naturally.

Do not expose internal system complexity unless the user actually needs it.

18. DYNAMIC REROUTING

The distinction between:

bookedCentre
recommendedCentre

must remain clear.

A recommendation must NEVER visually appear as though the farmer has already changed their booking.

Example:

Your current booking: Sonipat

separate from:

Recommended: Panipat

Switching should require explicit farmer action.

The system should never silently change a farmer's booking.

19. TRUST & GOVERNMENT-SERVICE FEEL

KisanSetu should feel:

trustworthy
practical
calm
transparent
dependable
grounded in agriculture

It should NOT feel like:

a crypto dashboard
a developer dashboard
a generic startup SaaS template
an AI-generated landing page

Visual polish is good.

Artificial complexity is not.

20. COLOR

The overall visual direction should remain grounded in agriculture.

Preferred direction:

deep agricultural green
restrained wheat/golden accent
warm off-white / ivory background

Colors should establish hierarchy rather than decorate every component.

Do not introduce many unrelated accent colors.

21. SPACING

Whitespace should be used intentionally.

Do not:

cram information together
create huge empty gaps without purpose
give every component identical spacing regardless of importance

Spacing should communicate relationships between pieces of information.

22. REALISTIC OVER DECORATIVE

KisanSetu should prioritize realism over visual novelty.

Ask:

"Would this make sense if this were actually being used at a mandi?"

before adding a UI element.

A Digital Mandi Pass makes sense.

A decorative analytics widget on a Farmer Home screen may not.

23. DO NOT OPTIMIZE FOR "WOW"

The goal is not:

"This looks cool."

The goal is:

"This is extremely easy to use."

Especially for the Farmer role.

A simple interface that users immediately understand is better than an impressive interface that requires explanation.

24. PRESERVE FUNCTIONALITY

UI redesigns must preserve existing functionality unless a task explicitly requests a functional change.

Do not casually modify:

DemoContext state
queue algorithms
slot booking
token logic
procurement workflow
payment workflow
dynamic rerouting
Google Maps navigation
role switching

UI simplification should simplify PRESENTATION, not break BUSINESS LOGIC.

25. BEFORE MAKING UI CHANGES

Before implementing a redesign:

Inspect the existing component.
Understand what information and functionality it currently provides.
Identify duplicated information.
Identify the primary user task.
Decide what should be:
kept
combined
moved
simplified
removed from immediate view
Then implement the visual change.

Do not redesign blindly.

26. EVERY SCREEN SHOULD PASS THIS TEST

Before considering a screen finished, ask:

Clarity

Can the user understand what this screen is for immediately?

Action

Is the next action obvious?

Repetition

Is any important information unnecessarily repeated?

Density

Is there more information than the user needs right now?

Hierarchy

Can the user tell what is most important?

Authenticity

Does this feel like KisanSetu or like a generic AI-generated template?

Mobile

Does it work comfortably on a real phone?

Accessibility

Could someone with limited digital literacy understand the basic task?

FINAL DESIGN PHILOSOPHY

KisanSetu should not try to look like the most sophisticated dashboard.

It should try to be the easiest agricultural service to understand.

The guiding principle is:

Less dashboard. More guidance.

And for the Farmer experience:

Don't make the farmer understand the system. Make the system understand the farmer.


### Where exactly?

At the **root of `thirytwo`**, not inside `src`.

Then your structure becomes:

```text
C:\HTML\thirytwo\
│
├── src\
├── public\
├── package.json
├── vite.config.js
├── README.md
└── KISANSETU_UI_RULES.md

After you've created it, don't ask Antigravity to implement anything yet. First tell it to read the file and confirm it understands the rules. Then we'll use these rules to redesign the Farmer screens one-by-one.

dude u hve not given everything in md file

You're right 😭. I gave you a shortened version, not the full audit translated into a proper design-rules document.

If you mean "I want the complete .md with everything important from the audit, not a condensed summary", then yes—we should make a much more comprehensive file, including:

all the identified AI-generated patterns
repetition problems
Farmer UX problems
Operator UX problems
Admin UX problems
mobile findings
accessibility/language issues
typography
spacing
cards/borders/shadows
navigation
information hierarchy
what to preserve
what NOT to change
redesign principles
role-specific design rules
acceptance checklist
implementation constraints
the reasoning behind each rule

I don't want to accidentally omit sections from the audit again. I'll use the actual uploaded audit as the source and produce the complete KISANSETU_UI_RULES.md, preserving its findings rather than compressing them.

ok go ahead

Done. This time it's the full .md document, not the shortened version.

Download KISANSETU_UI_RULES.md

Put it here

Inside your project root folder:

C:\HTML\thirytwo\
│
├── src\
├── public\
├── package.json
├── vite.config.js
├── README.md
└── KISANSETU_UI_RULES.md   ← here

Not inside src.

Then Antigravity can read it as a project-level reference.

For future UI prompts, we can simply say:

"Read and follow KISANSETU_UI_RULES.md before making any UI changes."

One important thing: this file is a design constitution, not an implementation prompt. It tells Antigravity how KisanSetu should be designed. Your individual prompts will still tell it which screen to change and what functionality to implement. 

KISANSETU_UI_RULES.md
Document

KISANSETU_UI_RULES.md
KisanSetu UI Rules
Complete UI/UX Design Constitution

Purpose: This document converts the findings of the KisanSetu UI audit into a persistent set of design rules for future frontend work.

Primary goal: KisanSetu should feel like a real, trustworthy, practical service designed around farmers, mandi operators, and administrators — not like a generic AI-generated SaaS dashboard.

1. Core Problem Identified by the Audit

The current interface has what the audit describes as "SaaS Dashboard Syndrome."

Repeated use of metric-card grids, rounded cards, nested cards, ALL-CAPS labels, status pills/badges, monospace numbers, large header banners, repeated metrics, and dense dashboard layouts makes the application feel predictable, generic, and AI-generated.

These patterns are not individually bad. The problem is their repeated use without enough connection to the real KisanSetu workflow.

The solution is not to remove every card or make the UI plain.

The solution is to create a design language driven by the actual workflow and by each user's needs.

2. Core Design Philosophy

Less dashboard. More guidance.

Priorities:

Clarity > decoration

Task completion > information density

Real-world workflow > generic dashboard patterns

Human understanding > technical completeness

For the Farmer:

Don't make the farmer understand the system. Make the system understand the farmer.

3. Different Roles, Different UI Philosophies
Farmer

Primary question:

"Ab mujhe kya karna hai?"

The interface should be:

simple
visual
calm
task-focused
mobile-first
low in technical terminology
easy to scan
suitable for limited digital literacy

The Farmer should not need to understand telemetry, scoring algorithms, queue architecture, or system internals.

Operator

Primary question:

"Ab kis farmer par action lena hai?"

Prioritize:

speed
queue visibility
clear status
quick scanning
operational actions
minimal unnecessary interaction

Higher information density is acceptable for a trained Operator.

Admin

Primary question:

"System mein kya ho raha hai?"

The Admin can appropriately use:

metrics
charts
tables
centre performance
procurement statistics
payment/DBT monitoring
system-level information

A dashboard-style interface is acceptable for Admin when it serves a real administrative purpose.

4. Farmer Experience: Action First

The Farmer Home should answer immediately:

What is happening?
What is my token?
When is my turn?
What do I need to do now?
Where do I need to go?

Preferred flow:

Farmer opens app
        ↓
Sees current situation
        ↓
Understands next action
        ↓
Taps one obvious action
        ↓
Gets guided through the workflow

Avoid making the Farmer interpret a dashboard before discovering their next step.

5. One Primary Action

Important Farmer screens should have one obvious primary action.

Example:

Track My Turn

Avoid multiple equivalent actions such as:

Track My Turn
Track Live Queue
View Queue
Check My Position

If they perform essentially the same task, combine them.

6. Avoid Information Repetition

Do not repeatedly show the same token, queue position, wait time, active-token information, or action across multiple nearby cards.

For example, if the Farmer already sees:

Your turn is coming

SNP-014

3 farmers ahead
About 24 minutes

[ Track My Turn ]

do not immediately repeat it as separate Active Token and Queue Position cards.

Every important piece of information should have one strong, logical home.

7. Cards Must Have a Purpose

Cards are NOT forbidden.

Use a card when it represents a meaningful object, task, or state.

Good examples:

Digital Mandi Pass
Current Booking
Congestion Warning
Important Action
Meaningful Recommendation

Avoid a separate card for every number.

Bad:

Token card
Farmers Ahead card
Wait Time card
Capacity card
Slot card
Location card

Prefer grouping related information naturally.

8. Avoid Card-Inside-Card Nesting

Avoid:

Card
 └── Card
      └── Card
           └── Card

Use:

whitespace
typography
grouping
subtle dividers

instead of borders around every piece of information.

9. Avoid Generic AI Dashboard Patterns

Do not automatically introduce:

repeated metric-card grids
4/5-column grids where unnecessary
excessive rounded rectangles
excessive pills
excessive badges
excessive shadows
excessive borders
decorative telemetry
unnecessary status ribbons
generic SaaS layouts
repeated identical cards
dashboard elements that do not serve the user

AI UI generators frequently default to these patterns. KisanSetu should not.

10. ALL-CAPS Labels

Avoid unnecessary labels such as:

ACTIVE TOKEN
QUEUE POSITION
NORMAL LOAD
HIGH CONGESTION
SYSTEM OVERSIGHT

Prefer sentence case for normal user-facing labels.

Capitalization should improve readability, not make the interface appear technical.

11. Typography

Do not use monospace for ordinary Farmer-facing information simply because it contains numbers.

Monospace can be appropriate for:

technical identifiers
token IDs when useful
code-like values
operational data where it improves scanning

Normal information such as:

About 24 minutes

3 farmers ahead

85% capacity

should generally use natural readable typography.

12. Header Banners

Avoid large heavy header banners on every screen simply to frame the layout.

Repeated large dark-green rounded banners can make all roles feel like the same generated dashboard.

Headers should be proportional to their purpose and should not compete with the user's current task.

13. Visual Hierarchy

Every screen should have:

Primary

What the user needs to know or do NOW.

Secondary

Information needed to complete the task.

Tertiary

Additional information that can be discovered when needed.

If every section has a large heading, border, icon, badge and button, nothing feels important.

14. Progressive Disclosure

Do not expose every piece of information simultaneously.

Example:

Your turn is coming

SNP-014

3 farmers ahead
About 24 minutes

[ Track My Turn ]

Additional information such as mandi, slot, directions, and detailed workflow can appear after the immediate situation is understood.

This is especially important on mobile.

15. Visual Guidance for Farmers

Use recognizable visual cues where they genuinely improve comprehension.

Examples:

Location → location icon
Token/pass → ticket/pass icon
Waiting → clock icon
Weighing → weighing-scale icon
Payment → payment icon
Completed → check icon

Custom SVG icons are encouraged when they create a consistent visual language.

However:

Do not add icons just to decorate the interface.

Do not turn the Farmer UI into an emoji collection.

16. Language and Digital Literacy

KisanSetu should support:

English
हिंदी

The Farmer experience should also be compatible with audio guidance.

However, translation alone is not enough. A complicated English workflow should not simply become a complicated Hindi workflow.

Prefer short, familiar, action-oriented language.

Examples:

आपकी बारी आने वाली है

रास्ता देखें

The layout must accommodate longer Hindi text without breaking.

17. Mobile-First Farmer Design

Design deliberately for:

375px
390px
412px

Do NOT simply shrink the desktop layout.

Prioritize:

readable text
large touch targets
thumb-friendly actions
short content blocks
clear hierarchy
minimal unnecessary scrolling
minimal typing
no horizontal overflow
18. Mobile Navigation

The Farmer mobile navigation pattern should remain simple:

Home
Mandi
Token
Payment

Use:

clear icons
short labels
obvious active state
sufficiently large touch targets

Do not add competing navigation systems.

19. Real-World Workflow Drives the UI

The UI should reflect:

Farmer
   ↓
Choose Mandi
   ↓
Book Slot
   ↓
Receive Token
   ↓
Reach Mandi
   ↓
Gate Check-in
   ↓
Wait for Turn
   ↓
Crop Inspection
   ↓
Weighment
   ↓
Procurement
   ↓
Payment / DBT

Do not expose internal system complexity unless the user needs it.

20. Dynamic Rerouting

Keep these concepts strictly separate:

bookedCentre
recommendedCentre

A recommendation must never visually appear as an already-changed booking.

Example:

Your current booking: Sonipat

separately:

Recommended: Panipat

The system must never silently change a Farmer's booking.

Changing the booking requires explicit user action.

21. Farmer Mandi Experience

The Mandi section should not become a dense directory of technical centre information.

The Farmer primarily needs:

where the centre is
whether it is a good option
whether they are booked there
current situation
how to get there
whether an alternative is recommended

Detailed operational telemetry should be secondary.

22. Digital Mandi Pass

A Digital Mandi Pass is a meaningful real-world object and is therefore an appropriate use of a strong card/ticket visual.

It may contain:

Farmer name
Token
Mandi
Slot
Queue status
Farmers ahead
Estimated wait
Directions
Queue tracking

Do not unnecessarily repeat all of these details elsewhere.

The pass should feel like a digital equivalent of a real-world pass/ticket.

23. Operator Interface

The Operator is a trained operational user.

The interface can be denser than the Farmer experience.

Prioritize:

live queue
token
farmer details
crop and target quantity
slot time
station/counter
queue status
operational actions

Useful actions include:

Gate Check-In
Call to Counter
Log Quality / Weighment
Complete Procurement

The interface should minimize unnecessary navigation.

24. Admin Interface

Admin can legitimately contain:

system metrics
centre load
procurement performance
DBT/payment information
trends
tables
charts
operational summaries

Even Admin should avoid decorative metrics that communicate no useful information.

25. Role Separation

Shared:

KisanSetu brand
core colors
typography foundation
icon language
accessibility principles

Different:

information density
navigation
actions
hierarchy
terminology
interaction patterns

Conceptually:

                 KISANSETU
                     │
        ┌────────────┼────────────┐
        ↓            ↓            ↓
     FARMER       OPERATOR       ADMIN
        │            │            │
     Guidance     Operations    Analytics
26. Trust and Government-Service Feel

KisanSetu should feel:

trustworthy
practical
calm
transparent
dependable
grounded in agriculture

It should NOT feel like:

a crypto dashboard
a developer dashboard
a generic startup SaaS template
an AI-generated landing page
a futuristic analytics product

Visual polish is good. Artificial complexity is not.

27. Color Direction

Preferred direction:

deep agricultural green
restrained wheat/golden accent
warm off-white / ivory background

Color should establish hierarchy.

Do not use many unrelated accent colors merely to make the interface look richer.

Status colors are appropriate when status communication genuinely requires them.

28. Spacing

Whitespace should be intentional.

Avoid:

cramming information
huge empty areas without purpose
identical spacing regardless of importance

Spacing should communicate relationships.

Related information should feel grouped.

Unrelated information should feel separated.

29. Realistic Over Decorative

Before adding an element, ask:

"Would this make sense if this were actually being used at a mandi?"

A Digital Mandi Pass makes sense.

A decorative analytics widget on a Farmer Home screen may not.

A queue status makes sense.

A decorative badge with no functional meaning does not.

30. Optimize for Understanding, Not "WOW"

The goal is not:

"This looks cool."

The goal is:

"This is extremely easy to use."

Especially for the Farmer.

A simple interface that users understand immediately is better than an impressive interface that requires explanation.

31. Do Not Treat "Modern" as a Requirement

Do not blindly add modern UI patterns because they are popular.

Avoid unnecessary:

glassmorphism
gradients
decorative blobs
animation
oversized hero sections
trendy dashboard patterns
visual effects without functional purpose

KisanSetu should look appropriate for its users and environment.

32. Preserve Functionality

UI redesigns must preserve existing functionality unless a task explicitly requests a functional change.

Do not casually modify:

DemoContext state
queue algorithms
slot booking
token logic
procurement workflow
payment workflow
dynamic rerouting
Google Maps navigation
role switching
demo controls

UI simplification means simplifying the presentation, not breaking the business logic.

33. Existing Good Patterns Worth Preserving

The audit does not imply that everything is bad.

Keep useful patterns such as:

clear role separation
meaningful Digital Mandi Pass representation
clear operational queue actions
live queue functionality
dynamic rerouting
explicit booking-switch control
mobile bottom navigation
clear status communication where status genuinely matters
agricultural color direction

The goal is refinement, not destruction.

34. What NOT To Do During Future Redesigns

Do not ask an AI coding agent to:

"Make the entire app modern."

Do not solve every problem by:

adding another card
adding another badge
adding another CTA
adding more colors
adding animation
adding decorative components

Do not redesign all three roles simultaneously unless specifically required.

Do not change business logic during a visual redesign.

35. Required Process Before UI Changes

Before implementing a UI change:

Inspect the existing component and purpose.
Identify the user task.
Separate information into essential, useful, unnecessary.
Find repetition.
Decide hierarchy: primary, secondary, tertiary.
Reuse existing components where appropriate.
Implement only after the above decisions.
36. Screen-Level Acceptance Test

Every screen should pass:

Clarity

Can the user understand what the screen is for immediately?

Action

Is the next action obvious?

Repetition

Is important information unnecessarily repeated?

Density

Is there more information than the user needs right now?

Hierarchy

Can the user immediately tell what matters most?

Authenticity

Does it feel like KisanSetu or a generic AI-generated template?

Mobile

Does it work comfortably on a real phone?

Accessibility

Could someone with limited digital literacy understand the basic task?

Real-world relevance

Would the screen make sense during actual use at a mandi?

37. Farmer Home Acceptance Test

A Farmer opening Home should quickly understand:

What is my token?

Example: SNP-014

When is my turn?

Example: 3 farmers ahead / About 24 minutes

What do I do now?

Example: Track My Turn

Where do I need to go?

Example: Sonipat Main Procurement Centre

What happens next?

A simple visual workflow should explain it.

The Farmer should not need to understand queue algorithms, recommendation scoring, centre telemetry, internal procurement architecture, or administrative terminology.

38. Mobile Acceptance Test

At 375px, 390px and 412px:

no horizontal scrolling
no clipped content
no tiny unreadable labels
no competing primary buttons
no excessive repeated cards
no unnecessary long header
bottom navigation remains usable
primary action is easy to reach
Hindi text does not break the layout
content does not feel overwhelming
39. AI-Generated Appearance Checklist

Before accepting a redesign, inspect whether it introduced:

generic metric grids
identical cards everywhere
excessive rounded corners
card-inside-card nesting
excessive pills
excessive badges
ALL-CAPS labels
monospace numbers everywhere
large decorative banners
repeated information
multiple identical CTAs
unnecessary iconography
decorative data visualizations
generic SaaS styling

If several appear without a strong product reason, reconsider the design.

40. The 10-Second Test

Ask:

If a hackathon judge sees this interface for 10 seconds, what will they think?

We do NOT want:

"This looks like an AI-generated dashboard."

We want something closer to:

"This looks like a practical system designed specifically for farmers and mandi operations."

41. Final Product Philosophy

KisanSetu should not try to be the most sophisticated-looking dashboard.

It should try to be the easiest agricultural service to understand.

The final experience should communicate:

Simple enough for the farmer.

Fast enough for the operator.

Informative enough for the administrator.

And above everything:

Less dashboard. More guidance.