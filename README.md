# 📄 React Scroll Mapper – Assignment 1

This project implements a scroll-mapping UI as described in the Hub9 React assignment.

---

## 🧠 Problem Statement

Create a two-column layout:
- Left: A list of highlighted medical phrases
- Right: A full case report text

Clicking on any phrase in the left column should scroll the right column to where that phrase appears in the text.

---

## 💡 Thought Process

### 1. Visual Layout

- Used **React** for components and **Tailwind CSS** for styling
- Two scrollable panels using `flex`, `overflow-y-scroll`, and `gap`

### 2. Data Structure

- `highlightPhrases`: An array of phrases to find
- `fullText`: A long string representing the report content

### 3. Phrase Highlighting and Mapping

- Used `RegExp` to search for each phrase inside `fullText`
- Wrapped each match in a `<span>` with a unique `id`
- On click of a phrase, scrolls to the `id` using `scrollIntoView()`



📄 Thought Process Explanation – Assignment 1 (Scroll Mapping)  
🔍 Understanding the Task  
The goal was to create a user interface with two panels:

One showing a full medical report

One showing a list of key medical phrases

When the user clicks on a phrase in the list, the report should automatically scroll to where that phrase appears.

🧠 How I Approached It  
I broke the task down into three core parts:

1. Visual Layout  
I designed a clean two-column layout:

Left Panel: A scrollable list of important medical terms (phrases).

Right Panel: A scrollable text block with a patient’s full case report.

To keep things efficient and visually appealing, I used React for component structure and Tailwind CSS for styling and layout. This let me quickly build a responsive, clean design.

2. Data Structure  
I separated the content into:

A long string called fullText representing the case report

An array of strings called highlightPhrases containing all key phrases to be matched

This separation made it easy to manipulate each independently — for matching, rendering, and interaction.

3. Phrase Mapping & Interactivity  
To make the scroll behavior work:

I searched for each key phrase in the full text using regular expressions

Each match was wrapped in a <span> tag with a unique ID (phrase-0, phrase-1, etc.)

In the left panel, each phrase is rendered as a clickable list item

When a phrase is clicked, it triggers a scrollIntoView() to the matching ID in the report text

I also added a highlight animation using Tailwind utility classes to visually show which phrase was scrolled to (a blue ring for 2 seconds).

✨ User Experience Enhancements  
To match the expectations shown in the PDF:

The scroll is smooth and centered for visibility

The report is long enough to showcase actual scrolling

Clicking a phrase gives visual feedback so the user doesn’t lose track

The layout mirrors the example image in the assignment

📈 Why This Approach Works  
Scalable: Can handle hundreds of phrases and paragraphs

Reusable: Can be adapted for other domains (e.g., legal, finance, education)

Clear UX: The scroll feedback and structure make it intuitive

✅ Summary  
My approach was to create a clear, scroll-synced two-panel UI using React and Tailwind. By wrapping key phrases with spans and assigning IDs, I enabled interactive scrolling from a summary view to detailed text. This results in a readable, responsive experience that accurately reflects the assignment’s goals.





📄 3D Symptom-to-Organ Mapper – Assignment 2  
This project visualizes medical symptoms by mapping them to a 3D human body model using React and Three.js (via @react-three/fiber).

🧠 Problem Statement  
Create a 3D body model that visually maps patient symptoms, tests, or diseases to specific organs:

Each patient can have multiple symptoms.

Each symptom corresponds to an organ.

Affected organs are highlighted on a 3D human body.

Each patient view is unique based on their condition.

💡 Thought Process  
1. Symptom-to-Organ Mapping Logic  
Created a static symptomToOrganMap[] array to associate common symptoms with organs.

This allows matching symptom strings to target body parts (e.g., “chest pain” → heart).

Used JavaScript .filter() and .some() to efficiently match symptoms case-insensitively.

2. Visualizing a 3D Human Model  
Used @react-three/fiber for a WebGL-based 3D scene.

Created simplified geometry:

Torso → cylinder

Head → sphere

Organs → small spheres at fixed anatomical positions

Limbs → cylinders with rotation and scale for arm/leg placement

3. Highlighting Affected Organs  
Defined organ positions and highlight colors in organDefinitions and bodyPartColors.

When a patient is selected:

Matched their symptoms to organs.

Highlighted these by changing material color and scale (pulsing effect).

Added a soft "glow" mesh around affected organs for better visibility.


🧪 Interactivity Features  
Clicking a patient from the left list updates the 3D model on the right with correct highlights.

Each symptom is color-coded to match the organ’s appearance in the 3D view.

Color legend is shown to help users understand what each highlight represents.

🎨 User Interface Considerations  
Used Tailwind CSS for responsive design and layout.

Layout split into:

Left: Patient list and symptom details.

Right: 3D body viewer.

Scalable to include more symptoms and patients.

📈 Why This Approach Works  
Reusable Mapping: Adding new symptoms or diseases is as easy as extending symptomToOrganMap.

Visual Clarity: Colors and glow help users quickly identify affected areas.

Scalable Design: Can support dynamic patient data from APIs in the future.

Accessible UX: Simple layout, minimal distractions, intuitive interaction.

✅ Summary  
My approach was to create a symptom-aware 3D human model using React and Three Fiber. By mapping each symptom to an organ and visualizing them with color-coded highlights and animations, this system provides a dynamic, intuitive, and visually engaging tool for exploring patient health data.
