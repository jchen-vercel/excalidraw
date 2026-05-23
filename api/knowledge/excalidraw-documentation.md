# Excalidraw Complete Reference Guide

> This document serves as a comprehensive knowledge base for an AI assistant specializing in Excalidraw. It covers core concepts, tools, keyboard shortcuts, best practices, styling, collaboration, file formats, integrations, and advanced techniques.

---

## What Is Excalidraw

Excalidraw is a free, open-source virtual whiteboard tool for creating hand-drawn-style diagrams, sketches, and illustrations. It runs entirely in the browser at [excalidraw.com](https://excalidraw.com) and requires no account to use. Its signature aesthetic is the "sketchy" hand-drawn look, powered by the rough.js rendering library. Despite the informal appearance, Excalidraw outputs are SVG-based vector graphics, meaning they remain crisp and sharp at any zoom level.

Excalidraw is used by designers, developers, product managers, educators, and anyone who needs to quickly communicate ideas visually. Common use cases include architecture diagrams, flowcharts, wireframes, mind maps, system design sketches, brainstorming sessions, and collaborative whiteboarding.

There is also a paid tier called **Excalidraw+** that adds cloud storage, workspace teams, extended AI features, presentations, PDF/PPTX export, voice hangouts with screen sharing, comments, and read-only sharing links.

---

## The Canvas and Interface

When you open Excalidraw, you see an infinite canvas with a toolbar at the top. The interface is intentionally minimal to reduce decision paralysis and keep the focus on drawing.

### Top Toolbar

The top toolbar contains numbered tool icons. The numbers (1–0) correspond to keyboard shortcuts for each tool. Hovering over any icon reveals its letter shortcut as well (e.g., "R" for rectangle). To the right of the tools you'll find the library button, and various menu options.

### Contextual Properties Panel

When you select an element, a properties panel appears allowing you to change stroke color, background color, fill style, stroke width, stroke style, sloppiness (sketch roughness), edge rounding, opacity, font size, font family, and text alignment. This panel adapts to your screen size — full on desktop, compact on tablets, tray on mobile.

### Bottom Bar

Contains zoom controls, undo/redo, and additional view options.

### Hamburger Menu

Access to export, save, open, live collaboration, clear canvas, and various settings.

---

## Tools Reference

### Selection and Navigation

| Tool | Shortcut | Description |
|------|----------|-------------|
| Hand (Pan) | `H` | Click and drag to move around the canvas without selecting anything |
| Selection | `V` or `1` | Select, move, and resize elements. Click an element to select it, drag to move it, or use handles to resize |

### Shape Tools

| Tool | Shortcut | Description |
|------|----------|-------------|
| Rectangle | `R` or `2` | Draw rectangles. Hold `Shift` while dragging to constrain to a perfect square |
| Diamond | `D` or `3` | Draw diamond/rhombus shapes. Hold `Shift` to constrain proportions |
| Ellipse | `O` or `4` | Draw ellipses. Hold `Shift` to constrain to a perfect circle |

### Connector Tools

| Tool | Shortcut | Description |
|------|----------|-------------|
| Arrow | `A` or `5` | Draw arrows that can bind to shapes. Click start point, then click end point. Click multiple intermediate points for curved arrows |
| Line | `L` or `6` | Draw straight lines or multi-point polylines. Works similarly to the arrow tool but without arrowheads |

### Freeform and Text Tools

| Tool | Shortcut | Description |
|------|----------|-------------|
| Draw (Freedraw) | `P` or `7` | Freehand drawing tool for sketching |
| Text | `T` or `8` | Click to place a text element, then type. Double-click existing text to edit |

### Utility Tools

| Tool | Shortcut | Description |
|------|----------|-------------|
| Insert Image | `9` | Insert an image file onto the canvas |
| Eraser | `E` or `0` | Erase elements by clicking or dragging over them |
| Frame | `F` | Create frames to group and organize sections of your canvas. Useful for presentations and exports |
| Laser Pointer | `K` | A temporary pointer that fades away, useful during presentations or collaboration |

### Tool Behavior Notes

- After drawing a shape, Excalidraw returns to the selection tool by default. To keep a tool active for multiple consecutive uses, hold `Shift` while selecting the tool, or press the tool's shortcut again.
- Shapes drawn with the Line tool can be closed into custom polygons by clicking on the starting point. Closed shapes can then receive fill colors.
- Arrows and lines support multi-point curves: select the Arrow or Line tool, then click multiple points on the canvas. Each click adds a bend point. Double-click or press `Escape` to finish.
- To create a curved arrow specifically: press `A`, then click three or more times to define curve points.

---

## Keyboard Shortcuts — Complete Reference

> On macOS, substitute `Cmd` for `Ctrl` and `Option` for `Alt`.

### Tools

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Hand (pan) | `H` | `H` |
| Selection | `V` or `1` | `V` or `1` |
| Rectangle | `R` or `2` | `R` or `2` |
| Diamond | `D` or `3` | `D` or `3` |
| Ellipse | `O` or `4` | `O` or `4` |
| Arrow | `A` or `5` | `A` or `5` |
| Line | `L` or `6` | `L` or `6` |
| Freedraw | `P` or `7` | `P` or `7` |
| Text | `T` or `8` | `T` or `8` |
| Insert image | `9` | `9` |
| Eraser | `E` or `0` | `E` or `0` |
| Frame tool | `F` | `F` |
| Laser pointer | `K` | `K` |
| Color picker (eyedropper) | `I` or `Shift+S` or `Shift+G` | `I` or `Shift+S` or `Shift+G` |
| Edit line/arrow points | `Ctrl+Enter` | `Cmd+Enter` |
| Edit text / add label | `Enter` | `Enter` |
| Finish editing text | `Esc` or `Ctrl+Enter` | `Esc` or `Cmd+Enter` |
| Prevent arrow binding | Hold `Ctrl` | Hold `Cmd` |
| Add/update link on shape | `Ctrl+K` | `Cmd+K` |
| Show stroke color picker | `S` | `S` |
| Show background color picker | `G` | `G` |

### View and Navigation

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Zoom in | `Ctrl++` | `Cmd++` |
| Zoom out | `Ctrl+-` | `Cmd+-` |
| Reset zoom to 100% | `Ctrl+0` | `Cmd+0` |
| Zoom to fit all elements | `Shift+1` | `Shift+1` |
| Zoom to selection | `Shift+2` | `Shift+2` |
| Pan canvas | `Space+Drag` or `Middle Mouse+Drag` | `Space+Drag` or `Middle Mouse+Drag` |
| Scroll page up/down | `PgUp` / `PgDn` | `PgUp` / `PgDn` |
| Scroll page left/right | `Shift+PgUp` / `Shift+PgDn` | `Shift+PgUp` / `Shift+PgDn` |
| Zen mode | `Alt+Z` | `Option+Z` |
| View mode (read-only) | `Alt+R` | `Option+R` |
| Toggle dark/light theme | `Alt+Shift+D` | `Option+Shift+D` |
| Show grid | `Ctrl+'` | `Cmd+'` |
| Snap to objects | `Alt+S` | `Option+S` |
| Stats for nerds | `Alt+/` | `Option+/` |

### Editing and Manipulation

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Undo | `Ctrl+Z` | `Cmd+Z` |
| Redo | `Ctrl+Y` or `Ctrl+Shift+Z` | `Cmd+Y` or `Cmd+Shift+Z` |
| Delete selected | `Delete` or `Backspace` | `Delete` or `Backspace` |
| Cut | `Ctrl+X` | `Cmd+X` |
| Copy | `Ctrl+C` | `Cmd+C` |
| Paste | `Ctrl+V` | `Cmd+V` |
| Paste as plaintext | `Ctrl+Shift+V` | `Cmd+Shift+V` |
| Select all | `Ctrl+A` | `Cmd+A` |
| Duplicate | `Ctrl+D` or `Alt+Drag` | `Cmd+D` or `Option+Drag` |
| Group selection | `Ctrl+G` | `Cmd+G` |
| Ungroup selection | `Ctrl+Shift+G` | `Cmd+Shift+G` |
| Lock/unlock selection | `Ctrl+Shift+L` | `Cmd+Shift+L` |
| Copy to clipboard as PNG | `Shift+Alt+C` | `Shift+Option+C` |
| Copy styles | `Ctrl+Alt+C` | `Cmd+Option+C` |
| Paste styles | `Ctrl+Alt+V` | `Cmd+Option+V` |
| Reset the canvas | `Ctrl+Delete` | `Cmd+Delete` |

### Layer Ordering (Z-Index)

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Send to back | `Ctrl+Shift+[` | `Cmd+Shift+[` |
| Bring to front | `Ctrl+Shift+]` | `Cmd+Shift+]` |
| Send backward one layer | `Ctrl+[` | `Cmd+[` |
| Bring forward one layer | `Ctrl+]` | `Cmd+]` |

### Alignment (with elements selected)

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Align top | `Ctrl+Shift+Up` | `Cmd+Shift+Up` |
| Align bottom | `Ctrl+Shift+Down` | `Cmd+Shift+Down` |
| Align left | `Ctrl+Shift+Left` | `Cmd+Shift+Left` |
| Align right | `Ctrl+Shift+Right` | `Cmd+Shift+Right` |

### Text Formatting

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Decrease font size | `Ctrl+Shift+<` | `Cmd+Shift+<` |
| Increase font size | `Ctrl+Shift+>` | `Cmd+Shift+>` |

### Flip/Mirror

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Flip horizontal | `Shift+H` | `Shift+H` |
| Flip vertical | `Shift+V` | `Shift+V` |

### Selection Techniques

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Deep select (into groups) | `Ctrl+Click` | `Cmd+Click` |
| Deep select within box (no drag) | `Shift+Click` | `Shift+Click` |
| Deep select + box select (no drag) | `Ctrl+Drag` | `Cmd+Drag` |

### Flowchart Shortcuts

| Action | Windows/Linux | macOS |
|--------|---------------|-------|
| Create connected node from selection | `Ctrl+Arrow Key` | `Cmd+Arrow Key` |
| Create multiple nodes rapidly | Hold `Ctrl` + press Arrow repeatedly | Hold `Cmd` + press Arrow repeatedly |

### Quick Reference Shortcut

If you ever forget shortcuts, press `Shift+/` (i.e., `?`) to open the built-in keyboard shortcuts help panel.

---

## Element Properties and Styling

Every element in Excalidraw has configurable visual properties. When you select one or more elements, the properties panel appears.

### Stroke Color

The outline/border color of shapes, or the color of text, lines, and arrows. You can choose from preset color swatches or enter a custom hex value. The eyedropper tool (`I`) lets you pick a color from any element on the canvas.

### Background Color

The fill color inside closed shapes (rectangles, diamonds, ellipses, closed polylines). This is separate from stroke color.

### Fill Style

How the background color is rendered inside shapes:

- **Hachure** — Diagonal sketch lines (the default hand-drawn look)
- **Cross-hatch** — Crossed diagonal lines for denser fill
- **Solid** — Flat solid color fill
- **Zigzag** — Zigzag pattern fill

### Stroke Width

Controls the thickness of outlines and lines. Options typically include thin, bold, and extra-bold.

### Stroke Style

- **Solid** — Continuous line
- **Dashed** — Dashed line segments
- **Dotted** — Dotted pattern

### Sloppiness (Roughness)

Controls how "sketchy" or hand-drawn the element looks:

- **Architect** — Clean, precise lines (minimal roughness)
- **Artist** — Moderate hand-drawn effect (default)
- **Cartoonist** — Very rough, exaggerated sketch effect

### Edge/Corner Rounding

For shapes like rectangles and diamonds:

- **Sharp** — Hard 90-degree corners
- **Round** — Smooth rounded corners

### Opacity

A slider from 0 to 100 controlling element transparency. Useful for layering elements or creating watermark effects.

### Font Family

Excalidraw offers several font options:

- **Excalifont** (default) — A custom hand-drawn font that matches the sketchy aesthetic
- **Nunito** — A clean sans-serif font
- **Lilita One** — A bold display font
- **Comic Shanns** — A comic-style font
- Additional fonts may be available depending on the version

### Font Size

Adjustable via the properties panel or with `Ctrl+Shift+<` / `Ctrl+Shift+>`.

### Text Alignment

- **Left**, **Center**, **Right** alignment for text within text elements or shape labels

### Arrowheads

For arrows, you can configure the start and end arrowhead styles independently. Options include no arrowhead, standard arrow, bar, dot, and triangle.

### Arrow Types

- **Regular arrows** — Straight or multi-point curved
- **Elbow arrows** — Route with right-angle bends, useful for technical diagrams and flowcharts

---

## Drawing Techniques and Tips

### Constraining Proportions

- Hold `Shift` while drawing a rectangle to make a perfect square
- Hold `Shift` while drawing an ellipse to make a perfect circle
- Hold `Shift` while drawing a diamond to make an equal-sided rhombus
- Hold `Shift` while drawing a line to snap to 15-degree angle increments

### Adding Text to Shapes

Double-click any shape (rectangle, diamond, ellipse) to add a text label inside it. The text becomes bound to the shape and moves with it. Press `Enter` while a shape is selected to start editing its label.

### Creating Custom Shapes

Use the Line tool (`L`) to draw arbitrary polygons. Place points by clicking, and close the shape by clicking on the first point. Once closed, the shape can receive fill colors and background styles just like built-in shapes.

### Duplicating Elements

- `Ctrl+D` duplicates the selected element(s) and offsets the copy slightly
- `Alt+Drag` duplicates while dragging, placing the copy exactly where you release

### Resizing

- Drag corner handles to resize. Hold `Shift` to maintain aspect ratio.
- Use "Stats for Nerds" (`Alt+/`) to see and manually type exact pixel dimensions for precise sizing.

### Moving Elements

- Arrow keys nudge selected elements by 1 pixel
- `Shift+Arrow` nudges by 10 pixels (useful for fine positioning)

### Grid and Snapping

- Toggle grid visibility with `Ctrl+'`
- Toggle snap-to-objects with `Alt+S`
- The grid step is customizable in canvas properties — you can also hide it completely by setting grid step to 1
- Combine grid mode with "Stats for Nerds" for pixel-perfect sizing

### Copy-Paste from Spreadsheets

Excalidraw has a useful feature: if you copy tabular data from a spreadsheet (e.g., two columns of label-value pairs) and paste it into Excalidraw, it will automatically generate a simple chart.

### Using the Eyedropper

Press `I` (or `Shift+S` for stroke, `Shift+G` for background) to activate the color picker. Click any element on the canvas to sample its color and apply it to your next drawing action.

---

## Working with Arrows and Connectors

### Arrow Binding

When you draw an arrow near the edge of a shape, it will attempt to "bind" to that shape. A bound arrow stays connected even when you move the shape. This is essential for flowcharts and architecture diagrams.

To prevent an arrow from binding to a shape, hold `Ctrl` (or `Cmd` on Mac) while drawing or placing the arrow endpoint.

### Elbow Arrows

Elbow arrows route with right-angle bends, automatically adjusting as you reposition connected shapes. These are ideal for technical diagrams, org charts, and any diagram where clean right-angle routing is preferred.

### Arrow Labels

Select an arrow and press `Enter` or double-click it to add a text label. The label is bound to the arrow and repositions itself as the arrow moves.

### Editing Arrow Points

Select an arrow or line, then press `Ctrl+Enter` to enter point-editing mode. You can drag individual bend points, add new points, or remove existing ones to reshape the connector.

---

## Libraries

Libraries are collections of reusable elements (icons, shapes, diagram components) that you can drag onto the canvas.

### Accessing Libraries

Click the **Library** button (book icon) in the toolbar area to open the library panel.

### Browsing Public Libraries

Click **Browse Libraries** to open the community library catalog. There are hundreds of libraries available, including:

- Software architecture icons (AWS, GCP, Azure, Kubernetes)
- UX wireframing components
- Network diagram symbols
- Flowchart symbols
- Device mockups
- General icons and illustrations
- Microsoft Fabric icons
- System design components

Search by keyword to find what you need, then click **Add to Excalidraw** to install a library.

### Personal Library

You can save your own frequently used elements to a personal library:

1. Select the element(s) you want to save
2. Open the library panel
3. Click the "Add to Library" option
4. Your saved elements appear in the library for reuse across drawings

### Sharing Libraries

- You can download your personal library to share as a file
- You can publish libraries to the public Excalidraw library catalog (via a PR to the excalidraw-libraries GitHub repo)
- Import `.excalidrawlib` files from others to add their libraries to your instance

---

## Collaboration

### Live Collaboration

Excalidraw supports real-time collaborative editing:

1. Click the **Share** button or find **Live Collaboration** in the hamburger menu
2. Start a new session — a unique link is generated
3. Share the link with collaborators — no account needed to join
4. Everyone can draw and edit simultaneously with live cursor visibility
5. Collaboration is end-to-end encrypted

**Important notes:**
- Sessions are temporary unless you manually save your work
- When any member leaves, they take a local copy of the current state
- Always export/save your final work before ending the session
- You can stop the session at any time from the Share menu

### Excalidraw+ Collaboration Features

The paid Excalidraw+ tier adds:
- Persistent cloud-saved drawings
- Workspace team management
- Read-only sharing links
- Comments on drawings
- Voice hangouts with screen sharing
- Live real-time presentations

---

## Exporting and Saving

### Save Formats

| Format | Description |
|--------|-------------|
| `.excalidraw` | Native JSON format. Preserves all element data for future editing. This is the recommended format for saving work-in-progress |
| `.excalidraw.png` | PNG image with embedded scene data. Looks like a normal PNG but can be re-opened in Excalidraw for editing |
| `.excalidraw.svg` | SVG image with embedded scene data. Same concept as above but in vector format |

### Export Formats

| Format | Description |
|--------|-------------|
| PNG | Raster image export. Options include transparent background, dark/light mode, and scale (1x, 2x, 3x) |
| SVG | Vector image export. Stays crisp at any size. Options for transparent background and dark/light mode |
| Clipboard (PNG) | Copy selection as PNG to clipboard with `Shift+Alt+C` |
| JSON (`.excalidraw`) | The native file format for re-importing |

### Export Tips

- You can select specific elements and export only those, rather than the entire canvas
- Choose "transparent background" for images you want to overlay on other content
- Use 2x or 3x scale for higher-resolution PNG exports (important for presentations and print)
- Embed scene data in PNG/SVG exports to create files that are both viewable images AND editable Excalidraw files — great for version control in Git repos
- Excalidraw+ adds PDF and PPTX export capabilities

### Saving Best Practices

- Save to `.excalidraw` format regularly for work in progress
- For documentation in Git repositories, export as `.excalidraw.svg` or `.excalidraw.png` with scene data embedded — the file renders as a normal image in GitHub/GitLab but can be re-opened in Excalidraw for editing
- Don't rely solely on browser local storage for important drawings — always export a file backup

---

## File Format Reference

### The `.excalidraw` JSON Format

Excalidraw files are plain JSON with this top-level structure:

```json
{
  "type": "excalidraw",
  "version": 2,
  "source": "https://excalidraw.com",
  "elements": [],
  "appState": {
    "gridSize": 20,
    "viewBackgroundColor": "#ffffff"
  },
  "files": {}
}
```

**Top-level fields:**

- `type` — Always `"excalidraw"`
- `version` — Schema version (currently `2`)
- `source` — The URL of the Excalidraw instance that created the file
- `elements` — Array of element objects (shapes, text, arrows, etc.)
- `appState` — Canvas configuration like grid size and background color
- `files` — Binary data for embedded images, keyed by file ID

### Element Types

The following element types are supported: `rectangle`, `ellipse`, `diamond`, `arrow`, `line`, `freedraw`, `text`, `image`, `frame`, `magicframe`, `embeddable`, `iframe`.

### Common Element Properties

Every element shares these base properties:

- `id` — Unique string identifier
- `type` — The element type string
- `x`, `y` — Position coordinates (top-left corner)
- `width`, `height` — Dimensions
- `angle` — Rotation in radians
- `strokeColor` — Outline/stroke color (hex string)
- `backgroundColor` — Fill color (hex string)
- `fillStyle` — One of: `"hachure"`, `"cross-hatch"`, `"solid"`, `"zigzag"`
- `strokeWidth` — Numeric stroke thickness
- `strokeStyle` — One of: `"solid"`, `"dashed"`, `"dotted"`
- `roughness` — Sketch roughness: `0` (architect), `1` (artist), `2` (cartoonist)
- `opacity` — 0–100
- `groupIds` — Array of group IDs this element belongs to
- `frameId` — ID of the containing frame, if any
- `roundness` — Corner rounding configuration
- `isDeleted` — Boolean, soft-delete flag
- `locked` — Boolean, whether the element is locked from editing
- `link` — Optional URL link attached to the element

### Clipboard Format

When you copy elements to clipboard, the JSON uses a slightly different wrapper:

```json
{
  "type": "excalidraw/clipboard",
  "elements": [],
  "files": {}
}
```

---

## AI and Text-to-Diagram Features

### Text to Diagram

Excalidraw includes an AI-powered text-to-diagram feature:

1. Click the AI/wand icon in the toolbar (last icon in the top center)
2. Select **Text to diagram**
3. Type a natural language description of what you want (e.g., "A flowchart showing user authentication with login, 2FA verification, and dashboard access")
4. The AI converts your description into Mermaid syntax, then renders it as Excalidraw elements
5. Click **Insert** to add the generated diagram to your canvas

The feature works by: text prompt → AI generates Mermaid code → Mermaid-to-Excalidraw parser → native Excalidraw elements.

### Mermaid to Excalidraw

You can also directly paste Mermaid diagram syntax to convert it into Excalidraw elements. This is accessed from the same dialog. Supported Mermaid diagram types include flowcharts, sequence diagrams, class diagrams, state diagrams, Gantt charts, and more.

**Why convert Mermaid to Excalidraw?**
- Untangle complex connector intersections that Mermaid auto-layout creates
- Allow non-technical collaborators to edit the visual diagram
- Add custom styling, icons, images, and annotations
- Take advantage of Excalidraw's collaboration features

### Wireframe to Code (Excalidraw+)

The paid tier includes a feature to convert hand-drawn wireframes into code, and an extended AI chat interface for generating and editing diagrams.

---

## Frames and Presentations

### Frames

Frames (`F`) are rectangular containers that group and organize sections of your canvas:

- Elements placed inside a frame are logically grouped with it
- Frames can be named for organization
- When exporting, you can export individual frames
- Frames are the foundation of Excalidraw's presentation feature

### Presentations (Excalidraw+)

In Excalidraw+, frames can be used as presentation slides:

- Each frame becomes a slide
- Navigate through slides in sequence
- Present live to remote participants
- Export presentations as PPTX or PDF
- Share slides individually

---

## Integrations and Ecosystem

### Obsidian Plugin

The **Excalidraw Obsidian Plugin** (by Zsolt Viczian) is one of the most popular integrations. It embeds a full Excalidraw editor inside Obsidian notes. The plugin uses a special `.excalidraw.md` format that combines Excalidraw drawing data with standard Markdown, allowing drawings to coexist with text notes.

### VS Code Extension

Excalidraw is available as a VS Code extension, allowing developers to create and edit diagrams without leaving their editor. Files can be saved with embedded scene data for version control.

### Confluence Integration

Available through the Atlassian Marketplace, Excalidraw integrates with Confluence for creating diagrams directly within wiki pages. Type `/excalidraw` to start drawing, with access to 220+ built-in icon libraries.

### npm Package

Excalidraw is available as a React component (`@excalidraw/excalidraw`) for embedding in web applications. The API allows programmatic element creation, scene manipulation, and full editor customization.

### Mermaid Integration

The `@excalidraw/mermaid-to-excalidraw` package converts Mermaid diagram definitions into Excalidraw elements programmatically.

---

## Best Practices

### General Workflow

1. **Start rough, refine later** — Don't aim for perfection on the first pass. Sketch your initial ideas quickly, then reorganize and polish as your understanding solidifies.
2. **Use the hand-drawn aesthetic intentionally** — The sketchy style reduces the pressure to make things pixel-perfect and keeps the focus on ideas rather than visual polish. This is a feature, not a limitation.
3. **Save early and often** — Export to `.excalidraw` format regularly. Don't rely on browser storage alone for important work.
4. **Learn the letter shortcuts** — `R`, `D`, `O`, `A`, `L`, `T` etc. are faster than clicking toolbar icons and become second nature quickly.

### Diagramming Best Practices

1. **Use consistent colors** — Pick a small palette (2–4 colors) and use them consistently to represent categories or meaning (e.g., blue for services, green for databases, red for alerts).
2. **Use copy-paste styles** — `Ctrl+Alt+C` to copy an element's style, `Ctrl+Alt+V` to paste it onto other elements. This ensures visual consistency across your diagram.
3. **Label everything** — Add text labels to shapes (double-click to add), label arrows to describe relationships, and add standalone text elements for titles and annotations.
4. **Use grouping** — `Ctrl+G` to group related elements so they move and scale together. Ungroup with `Ctrl+Shift+G` when you need to edit individual pieces.
5. **Use frames for organization** — On large canvases, use frames to create logical sections. Name frames descriptively.
6. **Leverage arrow binding** — Let arrows bind to shapes so your diagram stays connected when you rearrange. Hold `Ctrl` only when you specifically don't want binding.
7. **Use elbow arrows for technical diagrams** — They create clean right-angle routing that makes complex diagrams more readable.

### Layout and Alignment

1. **Use the grid** — Toggle grid on with `Ctrl+'` for evenly spaced layouts
2. **Snap to objects** — `Alt+S` enables snapping to other elements for quick alignment
3. **Use alignment shortcuts** — Select multiple elements, then use `Ctrl+Shift+Arrow` to align them
4. **Use "Stats for Nerds"** — `Alt+/` shows exact coordinates and dimensions, allowing you to type precise values for pixel-perfect positioning
5. **Use rectangular guide boxes** — For complex layouts, draw light-colored rectangles as guides to establish your layout grid, then draw your actual elements on top. Delete the guides when done.

### Collaboration Best Practices

1. **Assign one person as the "saver"** — During collaborative sessions, designate someone to periodically export the file as backup
2. **Use different colors per person** — When brainstorming, each participant can use a different stroke color for their contributions
3. **Save before ending sessions** — Always export to `.excalidraw` and/or PNG before stopping a live collaboration session, as sessions are temporary
4. **Use frames to divide workspace** — In collaborative sessions, assign different frames to different people or topics

### Performance Tips

1. **Keep canvases focused** — Rather than putting everything on one enormous canvas, break work into separate Excalidraw files
2. **Use SVG export over PNG when possible** — SVG files are smaller and scale infinitely
3. **Limit embedded images** — Large images increase file size significantly. Resize images before importing when possible
4. **Use libraries** — Instead of recreating complex elements, save them to your personal library for reuse

### For Version Control (Git)

1. **Export with embedded scene data** — Use `.excalidraw.svg` or `.excalidraw.png` so the file renders as an image in GitHub/GitLab but remains editable
2. **Store `.excalidraw` source files** — Keep the raw JSON files in your repo alongside the exported images
3. **Consider Mermaid for frequently-updated diagrams** — If a diagram changes often with code, consider maintaining it as Mermaid text (which diffs cleanly in Git) and converting to Excalidraw only when needed for presentations

---

## Troubleshooting Common Issues

### Elements Won't Move

- Check if the element is **locked**. Select it and press `Ctrl+Shift+L` to unlock.
- You might be in **View Mode** (`Alt+R`). Toggle it off.

### Arrows Won't Connect to Shapes

- Make sure you're drawing the arrow endpoint close to the shape's border, not its center
- Make sure you're not holding `Ctrl`/`Cmd`, which prevents binding
- Ensure the target shape isn't locked

### Text Looks Wrong After Export

- Try using a built-in font (Excalifont or Nunito) for best cross-platform compatibility
- When exporting SVG, Excalidraw embeds only the glyphs used, keeping file sizes small

### Can't Find a Shape or Element

- Use `Shift+1` to zoom to fit all elements — this will reveal any elements that have drifted far from the main canvas area
- Check if elements are hidden behind others — use `Ctrl+Shift+]` to bring selected elements to front

### Drawing Feels Laggy

- Reduce the number of elements on the canvas
- Close other browser tabs to free memory
- Try disabling grid and snap if they're on
- Use Chrome or a Chromium-based browser for best performance

### Lost My Work

- Check browser local storage — Excalidraw auto-saves to the browser. Reloading the page often restores the last state.
- If you were in a collaboration session and didn't save, the work is likely lost. Always export before ending sessions.

---

## Glossary

| Term | Definition |
|------|------------|
| **Binding** | The connection between an arrow/line endpoint and a shape. Bound arrows stay connected when shapes move |
| **Elbow arrow** | An arrow type that routes with right-angle bends |
| **Excalifont** | Excalidraw's custom hand-drawn font |
| **Frame** | A rectangular container for grouping and organizing elements on the canvas |
| **Freedraw** | The freehand drawing tool for sketching |
| **Hachure** | A fill style using diagonal parallel lines to create a sketched fill effect |
| **Library** | A collection of reusable elements that can be dragged onto the canvas |
| **Roughness/Sloppiness** | The setting controlling how "hand-drawn" elements appear |
| **Scene** | The complete state of an Excalidraw canvas, including all elements, app state, and files |
| **SVG** | Scalable Vector Graphics — the underlying rendering technology that keeps Excalidraw drawings crisp at any zoom level |
| **Zen mode** | A distraction-free view that hides most UI elements |

---

## Quick Command Reference Card

**Create:** `R` rect, `D` diamond, `O` ellipse, `A` arrow, `L` line, `T` text, `P` draw, `F` frame

**Navigate:** `H` hand/pan, `Space+Drag` pan, `Ctrl++/-` zoom, `Shift+1` fit all, `Shift+2` fit selection

**Edit:** `Ctrl+D` duplicate, `Ctrl+G` group, `Ctrl+Shift+G` ungroup, `Enter` edit text, `Ctrl+K` add link

**Style:** `S` stroke color, `G` background color, `Ctrl+Alt+C/V` copy/paste styles, `I` eyedropper

**Arrange:** `Ctrl+Shift+[/]` send to back/front, `Ctrl+[/]` back/forward one, `Ctrl+Shift+Arrows` align

**Utility:** `Shift+/` show shortcuts, `Alt+/` stats, `Alt+Z` zen mode, `Alt+R` view mode, `K` laser pointer
