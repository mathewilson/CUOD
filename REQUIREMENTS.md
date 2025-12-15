# Requirements

## As a USER

1. As a user I want a menu of available subjects so that I can quickly jump to the relevant part of the page.
    - Implemented a sidebar menu with the available subjects. The page will jump to the relevant card when clicked.

2. As a user I want to see the minimal amount of detail needed so that I'm not overwhelmed when I browse the page.
    - Cards will default to showing just the image, title, and description of each subject. When clicked the card will expand to display available programs for that subject.

3. As a user I want to see a subject's available programs so that I can identify which ones are important to me.
    - Repeated programs are now flattened into unique entries, rather than multiple listings per timeslot.

4. As a user I want to see all available timeslots for a program so that I can decide which one(s) I can attend.
    - Timeslots and locations are listed under each program so it's easier to read.

## As a DEVELOPER

1. As a developer I want to separate out UI components so that code is easier to manage and modify.
    - Separate components have been created so the main.ts file isn't forced to render all the HTML itself.

2. As a developer I want typed objects so that I can identify what data is being passed between components with minimal errors.
    - Each component contains its own relevant typed interfaces