# Material UI to Salt DS Migration Plan

| Field | Value |
|-------|-------|
| Application | react-admin Simple Example |
| Repository | /home/ubuntu/repos/react-admin |
| Target Directory | examples/simple/ |
| Commit | bd7e28fa55432fe2409c6b8c9cfea6ed4616de4b |
| Generated | 2026-02-08 |
| Before Recording | [migration_before.webm](docs/migration-recordings/migration_before.webm) |

## Migration Progress Tracker

| Phase | Task | Status | Notes | Recording |
|-------|------|--------|-------|----------|
| 0 | Infrastructure Setup | Pending | | |
| 0.5 | Add Salt Imports | Pending | | |
| 1 | Dialog Swap | Pending | 6 files | |
| 1 | Button Swap | Pending | 5 files | |
| 1 | Typography Swap | Pending | 2 files | |
| 1 | Avatar Swap | Pending | 1 file | |
| 1 | Chip to Pill Swap | Pending | 1 file | |
| 1 | Stack to StackLayout Swap | Pending | 2 files | |
| 1 | useMediaQuery to useBreakpoint | Pending | 3 files | |
| 2 | Card Composition Refactor | Pending | 3 files | |
| 2 | Grid to FlowLayout Refactor | Pending | 1 file | |
| 2 | List/Tree Refactor | Pending | 1 file | |
| 2 | TextField to Input Refactor | Pending | 3 files | |
| 2 | Box to FlexLayout Refactor | Pending | 4 files | |
| 2 | styled to CSS Modules | Pending | 1 file | |
| 3 | Icons Cleanup | Pending | 8 files | |
| 3 | sx Props Cleanup | Pending | Multiple files | |
| 3 | Theme Removal | Pending | 3 files | |
| 3 | Imports Cleanup | Pending | All migrated files | |
| 4 | Final Walkthrough Verification | Pending | | |

Status legend: Pending | In Progress | Success | Failed | Partial

---

## Component Mapping Table

### Layout Components

| MUI Component | Salt Equivalent | Package | Notes |
|---------------|-----------------|---------|-------|
| `Box` | `FlexLayout` / `div` with styles | @salt-ds/core | Use FlexLayout for flex containers, plain div for simple boxes |
| `Stack` | `StackLayout` | @salt-ds/core | Direct mapping, use `direction` prop |
| `Grid` | `GridLayout` / `FlowLayout` | @salt-ds/core | GridLayout for grid, FlowLayout for responsive wrapping |

### Dialog Components

| MUI Component | Salt Equivalent | Package | Notes |
|---------------|-----------------|---------|-------|
| `Dialog` | `Dialog` | @salt-ds/core | Direct mapping |
| `DialogTitle` | `DialogHeader` | @salt-ds/core | Use header prop or DialogHeader component |
| `DialogContent` | `DialogContent` | @salt-ds/core | Direct mapping |
| `DialogActions` | `DialogActions` | @salt-ds/core | Direct mapping |

### Card Components

| MUI Component | Salt Equivalent | Package | Notes |
|---------------|-----------------|---------|-------|
| `Card` | `Card` | @salt-ds/core | Direct mapping |
| `CardHeader` | Custom composition | - | No direct equivalent, compose with Text/Avatar |
| `CardContent` | `div` / `StackLayout` | @salt-ds/core | Use layout components inside Card |
| `CardActions` | `FlexLayout` | @salt-ds/core | Use FlexLayout with justify="end" |

### Form/Input Components

| MUI Component | Salt Equivalent | Package | Notes |
|---------------|-----------------|---------|-------|
| `TextField` | `Input` / `FormField` + `Input` | @salt-ds/core | Use FormField wrapper for labels |
| `Button` | `Button` | @salt-ds/core | Direct mapping, different variant names |

### Display Components

| MUI Component | Salt Equivalent | Package | Notes |
|---------------|-----------------|---------|-------|
| `Typography` | `Text` | @salt-ds/core | Use styleAs prop for variants |
| `Avatar` | `Avatar` | @salt-ds/core | Direct mapping |
| `Chip` | `Pill` | @salt-ds/core | Direct mapping |

### List Components

| MUI Component | Salt Equivalent | Package | Notes |
|---------------|-----------------|---------|-------|
| `List` | `List` / `Tree` | @salt-ds/lab | Use Tree for hierarchical data |
| `ListItem` | Tree node | @salt-ds/lab | Different API |
| `ListItemButton` | Tree node | @salt-ds/lab | Built into Tree |
| `ListItemText` | Text inside node | @salt-ds/core | Compose with Text |
| `Collapse` | `Collapsible` | @salt-ds/core | Or use Tree's built-in collapse |

### Utility Components/Hooks

| MUI Component | Salt Equivalent | Package | Notes |
|---------------|-----------------|---------|-------|
| `useMediaQuery` | `useBreakpoint` | @salt-ds/core | Different API, requires BreakpointProvider |
| `styled` | CSS Modules | - | No Salt equivalent, use CSS modules |
| `Theme` type | Salt theme types | @salt-ds/core | Different theming approach |

### Icons Mapping

| MUI Icon | Salt Icon | Package |
|----------|-----------|---------|
| `BookIcon` | `BookmarkIcon` or custom | @salt-ds/icons |
| `ChatBubbleIcon` | `ChatIcon` | @salt-ds/icons |
| `PeopleIcon` | `UserGroupIcon` | @salt-ds/icons |
| `PersonIcon` | `UserIcon` | @salt-ds/icons |
| `ExpandLess` | `ChevronUpIcon` | @salt-ds/icons |
| `ExpandMore` | `ChevronDownIcon` | @salt-ds/icons |
| `Cancel` | `CloseIcon` | @salt-ds/icons |
| `VisibilityOff` | `VisibilityOffIcon` or custom | @salt-ds/icons |

---

## Files Requiring Migration

### Files with MUI Imports (17 total)

| File | MUI Components Used |
|------|---------------------|
| `src/comments/CommentEdit.tsx` | Box, Card, Typography, Dialog, DialogContent, TextField, DialogActions, Button |
| `src/comments/CommentList.tsx` | Avatar, Card, CardActions, CardContent, CardHeader, Grid, Typography, useMediaQuery, Theme, PersonIcon |
| `src/comments/CommentShow.tsx` | Stack |
| `src/comments/index.tsx` | ChatBubbleIcon |
| `src/comments/PostQuickCreate.tsx` | Dialog, DialogTitle, DialogContent, DialogActions |
| `src/comments/PostQuickCreateCancelButton.tsx` | Button, IconCancel |
| `src/comments/PostReferenceInput.tsx` | Button, Dialog, DialogTitle, DialogContent, DialogActions |
| `src/posts/index.tsx` | BookIcon |
| `src/posts/PostCreate.tsx` | Button, Dialog, DialogActions, DialogContent |
| `src/posts/PostEdit.tsx` | Box, Button, Dialog, DialogActions, DialogContent, TextField |
| `src/posts/PostList.tsx` | BookIcon, Chip, useMediaQuery, Theme |
| `src/posts/ResetViewsButton.tsx` | VisibilityOff |
| `src/posts/TagReferenceInput.tsx` | Box, Button, Dialog, DialogContent, DialogActions, TextField |
| `src/tags/TagList.tsx` | Box, List, ListItem, ListItemText, Collapse, Card, Stack, ListItemButton, ExpandLess, ExpandMore |
| `src/users/Aside.tsx` | styled, Typography |
| `src/users/index.tsx` | PeopleIcon |
| `src/users/UserList.tsx` | PeopleIcon, useMediaQuery, Theme |

---

## Migration Phases

### Phase 0: Infrastructure Setup (Sequential)

**Objective**: Set up Salt DS dependencies and providers.

**Tasks**:
1. Add Salt DS packages to `examples/simple/package.json`:
   - `@salt-ds/core`
   - `@salt-ds/lab`
   - `@salt-ds/icons`
   - `@salt-ds/theme`
2. Wrap the application with `SaltProvider` in the entry point
3. Import Salt CSS in the main entry file
4. Create CSS modules directory structure if needed

**Files to modify**:
- `examples/simple/package.json`
- `examples/simple/src/index.tsx` (or App entry point)

---

### Phase 0.5: Add Salt Imports (Sequential)

**Objective**: Add all required Salt imports to every file before any component swaps begin. This prevents merge conflicts when parallel sessions modify the same files.

**Files and Required Salt Imports**:

| File | Salt Imports to Add |
|------|---------------------|
| `src/comments/CommentEdit.tsx` | `FlexLayout, Card, Text, Dialog, DialogContent, DialogActions, Input, Button` from @salt-ds/core |
| `src/comments/CommentList.tsx` | `Avatar, Card, FlowLayout, Text` from @salt-ds/core; `UserIcon` from @salt-ds/icons |
| `src/comments/CommentShow.tsx` | `StackLayout` from @salt-ds/core |
| `src/comments/index.tsx` | `ChatIcon` from @salt-ds/icons |
| `src/comments/PostQuickCreate.tsx` | `Dialog, DialogHeader, DialogContent, DialogActions` from @salt-ds/core |
| `src/comments/PostQuickCreateCancelButton.tsx` | `Button` from @salt-ds/core; `CloseIcon` from @salt-ds/icons |
| `src/comments/PostReferenceInput.tsx` | `Button, Dialog, DialogHeader, DialogContent, DialogActions` from @salt-ds/core |
| `src/posts/index.tsx` | `BookmarkIcon` from @salt-ds/icons |
| `src/posts/PostCreate.tsx` | `Button, Dialog, DialogActions, DialogContent` from @salt-ds/core |
| `src/posts/PostEdit.tsx` | `FlexLayout, Button, Dialog, DialogActions, DialogContent, Input` from @salt-ds/core |
| `src/posts/PostList.tsx` | `Pill, useBreakpoint` from @salt-ds/core; `BookmarkIcon` from @salt-ds/icons |
| `src/posts/ResetViewsButton.tsx` | `VisibilityOffIcon` from @salt-ds/icons (or custom) |
| `src/posts/TagReferenceInput.tsx` | `FlexLayout, Button, Dialog, DialogContent, DialogActions, Input` from @salt-ds/core |
| `src/tags/TagList.tsx` | `Card, StackLayout, Collapsible` from @salt-ds/core; `Tree` from @salt-ds/lab; `ChevronUpIcon, ChevronDownIcon` from @salt-ds/icons |
| `src/users/Aside.tsx` | `Text` from @salt-ds/core |
| `src/users/index.tsx` | `UserGroupIcon` from @salt-ds/icons |
| `src/users/UserList.tsx` | `useBreakpoint` from @salt-ds/core; `UserGroupIcon` from @salt-ds/icons |

---

### Phase 1: Core Component Swaps (Parallel)

These tasks can run in parallel after Phase 0.5 completes.

#### Task 1.1: Dialog Swap
**Files**: 
- `src/comments/PostQuickCreate.tsx`
- `src/comments/PostReferenceInput.tsx`
- `src/comments/CommentEdit.tsx`
- `src/posts/PostCreate.tsx`
- `src/posts/PostEdit.tsx`
- `src/posts/TagReferenceInput.tsx`

**Changes**:
- Replace `Dialog` with Salt `Dialog`
- Replace `DialogTitle` with `DialogHeader`
- Replace `DialogContent` with Salt `DialogContent`
- Replace `DialogActions` with Salt `DialogActions`

#### Task 1.2: Button Swap
**Files**:
- `src/comments/PostQuickCreateCancelButton.tsx`
- `src/comments/PostReferenceInput.tsx`
- `src/comments/CommentEdit.tsx`
- `src/posts/PostCreate.tsx`
- `src/posts/PostEdit.tsx`
- `src/posts/TagReferenceInput.tsx`

**Changes**:
- Replace MUI `Button` with Salt `Button`
- Update variant props (MUI `variant="contained"` → Salt `variant="primary"`)

#### Task 1.3: Typography Swap
**Files**:
- `src/comments/CommentList.tsx`
- `src/users/Aside.tsx`

**Changes**:
- Replace `Typography` with Salt `Text`
- Map `variant` prop to `styleAs` prop

#### Task 1.4: Avatar Swap
**Files**:
- `src/comments/CommentList.tsx`

**Changes**:
- Replace MUI `Avatar` with Salt `Avatar`

#### Task 1.5: Chip to Pill Swap
**Files**:
- `src/posts/PostList.tsx`

**Changes**:
- Replace `Chip` with Salt `Pill`

#### Task 1.6: Stack to StackLayout Swap
**Files**:
- `src/comments/CommentShow.tsx`
- `src/tags/TagList.tsx`

**Changes**:
- Replace `Stack` with Salt `StackLayout`
- Update props (`spacing` → `gap`)

#### Task 1.7: useMediaQuery to useBreakpoint
**Files**:
- `src/comments/CommentList.tsx`
- `src/posts/PostList.tsx`
- `src/users/UserList.tsx`

**Changes**:
- Replace `useMediaQuery` with Salt `useBreakpoint`
- Update breakpoint logic (MUI uses theme.breakpoints, Salt uses named breakpoints)
- Remove `Theme` type imports

---

### Phase 2: Layout Refactors (Parallel, after Phase 1)

These tasks involve more complex refactoring and can run in parallel.

#### Task 2.1: Card Composition Refactor
**Files**:
- `src/comments/CommentList.tsx`
- `src/comments/CommentEdit.tsx`
- `src/tags/TagList.tsx`

**Changes**:
- Replace `CardHeader`, `CardContent`, `CardActions` with composed Salt components
- Use `StackLayout` or `FlexLayout` inside `Card`
- Compose header with `Avatar` and `Text`

#### Task 2.2: Grid to FlowLayout Refactor
**Files**:
- `src/comments/CommentList.tsx`

**Changes**:
- Replace MUI `Grid` with Salt `FlowLayout` or `GridLayout`
- Update grid item props

#### Task 2.3: List/Tree Refactor
**Files**:
- `src/tags/TagList.tsx`

**Changes**:
- Replace MUI `List`, `ListItem`, `ListItemButton`, `ListItemText`, `Collapse` with Salt `Tree`
- Restructure data for Tree component
- This is a significant refactor due to different component APIs

#### Task 2.4: TextField to Input Refactor
**Files**:
- `src/posts/PostEdit.tsx`
- `src/comments/CommentEdit.tsx`
- `src/posts/TagReferenceInput.tsx`

**Changes**:
- Replace MUI `TextField` (as MuiTextField) with Salt `Input`
- Add `FormField` wrapper if label is needed
- Update props (`onChange` handler signature may differ)

#### Task 2.5: Box to FlexLayout Refactor
**Files**:
- `src/tags/TagList.tsx`
- `src/posts/PostEdit.tsx`
- `src/posts/TagReferenceInput.tsx`
- `src/comments/CommentEdit.tsx`

**Changes**:
- Replace `Box` with `FlexLayout` or plain `div` with CSS
- Convert `sx` props to CSS modules or inline styles

#### Task 2.6: styled to CSS Modules
**Files**:
- `src/users/Aside.tsx`

**Changes**:
- Create `Aside.module.css` file
- Replace `styled` component with CSS module classes
- Update component to use `className` with CSS module

---

### Phase 3: Cleanup (Sequential, after Phase 2)

**IMPORTANT**: Run these tasks sequentially in the order listed to avoid merge conflicts.

#### Task 3.1: Icons Cleanup (First)
**Files**:
- `src/comments/CommentList.tsx` (PersonIcon)
- `src/comments/index.tsx` (ChatBubbleIcon)
- `src/comments/PostQuickCreateCancelButton.tsx` (IconCancel)
- `src/posts/index.tsx` (BookIcon)
- `src/posts/PostList.tsx` (BookIcon)
- `src/posts/ResetViewsButton.tsx` (VisibilityOff)
- `src/tags/TagList.tsx` (ExpandLess, ExpandMore)
- `src/users/index.tsx` (PeopleIcon)
- `src/users/UserList.tsx` (PeopleIcon)

**Changes**:
- Replace all `@mui/icons-material` imports with `@salt-ds/icons`
- Update icon component names

#### Task 3.2: sx Props Cleanup (Second)
**Files**: All files with `sx` props

**Changes**:
- Convert `sx` props to CSS modules or inline styles
- Remove MUI-specific styling patterns

#### Task 3.3: Theme Removal (Third)
**Files**:
- `src/comments/CommentList.tsx`
- `src/posts/PostList.tsx`
- `src/users/UserList.tsx`

**Changes**:
- Remove `Theme` type imports
- Remove any remaining MUI theme dependencies

#### Task 3.4: Imports Cleanup (Last)
**Files**: All migrated files

**Changes**:
- Remove all unused `@mui/material` imports
- Remove all unused `@mui/icons-material` imports
- Verify no MUI dependencies remain

---

### Phase 4: Final Walkthrough Verification (Sequential)

**Objective**: Comprehensive verification of the completed migration.

**Tasks**:
1. Search for any remaining MUI references in the codebase
2. Run type-check and lint to identify any issues
3. Record a complete visual walkthrough of the application
4. Test responsive behavior at multiple viewport sizes
5. Check accessibility basics (tab navigation, focus indicators)
6. Generate a detailed report of any issues found

---

## How to Execute This Migration

### Prerequisites
- All companion playbooks must be available
- Salt DS repository must be accessible for reference at `/home/ubuntu/repos/jpmc-salt-ds`

### Execution Order

#### Step 1: Infrastructure (Sequential)
Run the Infrastructure playbook once:
- Playbook: "MUI to Salt: Infrastructure Setup"
- Input: `{ "app_path": "/home/ubuntu/repos/react-admin", "salt_path": "/home/ubuntu/repos/jpmc-salt-ds" }`

#### Step 1.5: Add Salt Imports (Sequential)
Run the Add Salt Imports playbook once to add all required Salt imports to every file:
- Playbook: "MUI to Salt: Add Salt Imports"
- Input: `{ "app_path": "/home/ubuntu/repos/react-admin", "salt_path": "/home/ubuntu/repos/jpmc-salt-ds", "files": ["<all files listed above>"], "imports_map": { "<file>": ["<salt imports needed>"] } }`

This step adds all Salt import statements before any component swaps begin, preventing merge conflicts when parallel sessions modify the same files.

#### Step 2: Core Component Swaps (Parallel)
For each task in Phase 1, run the Core Component Swap playbook in parallel:
- Playbook: "MUI to Salt: Core Component Swap"
- Input: `{ "app_path": "/home/ubuntu/repos/react-admin", "salt_path": "/home/ubuntu/repos/jpmc-salt-ds", "swap_type": "<type>", "files": ["<file1>", "<file2>"] }`

Swap types and their file lists:
- `dialog`: `["src/comments/PostQuickCreate.tsx", "src/comments/PostReferenceInput.tsx", "src/comments/CommentEdit.tsx", "src/posts/PostCreate.tsx", "src/posts/PostEdit.tsx", "src/posts/TagReferenceInput.tsx"]`
- `button`: `["src/comments/PostQuickCreateCancelButton.tsx", "src/comments/PostReferenceInput.tsx", "src/comments/CommentEdit.tsx", "src/posts/PostCreate.tsx", "src/posts/PostEdit.tsx", "src/posts/TagReferenceInput.tsx"]`
- `typography`: `["src/comments/CommentList.tsx", "src/users/Aside.tsx"]`
- `avatar`: `["src/comments/CommentList.tsx"]`
- `chip_to_pill`: `["src/posts/PostList.tsx"]`
- `stack_to_stacklayout`: `["src/comments/CommentShow.tsx", "src/tags/TagList.tsx"]`
- `use_media_query`: `["src/comments/CommentList.tsx", "src/posts/PostList.tsx", "src/users/UserList.tsx"]`

#### Step 3: Layout Refactors (Parallel, after Step 2)
For each task in Phase 2, run the Layout Refactor playbook in parallel:
- Playbook: "MUI to Salt: Layout Refactor"
- Input: `{ "app_path": "/home/ubuntu/repos/react-admin", "salt_path": "/home/ubuntu/repos/jpmc-salt-ds", "refactor_type": "<type>", "files": ["<files>"] }`

Refactor types:
- `card_composition`: `["src/comments/CommentList.tsx", "src/comments/CommentEdit.tsx", "src/tags/TagList.tsx"]`
- `grid_to_flowlayout`: `["src/comments/CommentList.tsx"]`
- `list_to_tree`: `["src/tags/TagList.tsx"]`
- `textfield_to_input`: `["src/posts/PostEdit.tsx", "src/comments/CommentEdit.tsx", "src/posts/TagReferenceInput.tsx"]`
- `box_to_flexlayout`: `["src/tags/TagList.tsx", "src/posts/PostEdit.tsx", "src/posts/TagReferenceInput.tsx", "src/comments/CommentEdit.tsx"]`
- `styled_to_css_modules`: `["src/users/Aside.tsx"]`

#### Step 4: Cleanup (Sequential, after Step 3)
Run Phase 3 cleanup tasks **sequentially** in the following order to avoid merge conflicts:

1. **Icons** (first) - Replace MUI icons with Salt icons
   - Playbook: "MUI to Salt: Cleanup"
   - Input: `{ "app_path": "/home/ubuntu/repos/react-admin", "cleanup_type": "icons", "files": ["src/comments/CommentList.tsx", "src/comments/index.tsx", "src/comments/PostQuickCreateCancelButton.tsx", "src/posts/index.tsx", "src/posts/PostList.tsx", "src/posts/ResetViewsButton.tsx", "src/tags/TagList.tsx", "src/users/index.tsx", "src/users/UserList.tsx"] }`

2. **sx Props** (second) - Remove MUI sx props and convert to CSS modules/inline styles
   - Playbook: "MUI to Salt: Cleanup"
   - Input: `{ "app_path": "/home/ubuntu/repos/react-admin", "cleanup_type": "sx_props", "files": ["<files with sx props>"] }`

3. **Theme Removal** (third) - Remove MUI theme usage
   - Playbook: "MUI to Salt: Cleanup"
   - Input: `{ "app_path": "/home/ubuntu/repos/react-admin", "cleanup_type": "theme_removal", "files": ["src/comments/CommentList.tsx", "src/posts/PostList.tsx", "src/users/UserList.tsx"] }`

4. **Imports Cleanup** (last) - Remove all remaining unused MUI imports
   - Playbook: "MUI to Salt: Cleanup"
   - Input: `{ "app_path": "/home/ubuntu/repos/react-admin", "cleanup_type": "imports", "files": ["<all migrated files>"] }`

**Why sequential?** Phase 3 tasks have significant file overlap. Running them in parallel would cause merge conflicts. The order above ensures imports cleanup runs last, after all other changes are complete.

#### Step 5: Final Walkthrough Verification (Sequential, after Step 4)
After all cleanup tasks are complete and merged, run the Final Walkthrough Verification:
- Playbook: "MUI to Salt - Final Walkthrough Verification"
- Input: `{ "app_path": "/home/ubuntu/repos/react-admin", "run_command": "yarn run-simple" }`

---

## Known Gaps and Considerations

### Components Without Direct Salt Equivalents

1. **MUI `styled()`**: Salt does not have a styled-components equivalent. Use CSS modules instead.

2. **Card Subcomponents**: Salt's `Card` doesn't have `CardHeader`, `CardContent`, `CardActions`. Compose using layout components.

3. **List Components**: Salt's list/tree API is significantly different from MUI. The TagList tree structure will require substantial refactoring.

4. **Theme Type**: Salt uses a different theming approach. Remove MUI Theme type dependencies.

### API Differences to Note

1. **Button variants**: MUI uses `variant="contained"`, Salt uses `variant="primary"`

2. **Typography/Text**: MUI uses `variant="h6"`, Salt uses `styleAs="h6"`

3. **useMediaQuery vs useBreakpoint**: Different API signatures and return values

4. **Dialog**: Salt Dialog requires explicit `open` state management similar to MUI

### Testing Considerations

1. Test responsive behavior after replacing `useMediaQuery`
2. Verify form functionality after Input component swaps
3. Check dialog open/close behavior
4. Validate tree expand/collapse in TagList

---

## Appendix: Full File List

All files in `examples/simple/src/` that require migration:

```
examples/simple/src/
├── comments/
│   ├── CommentEdit.tsx       [MUI: Box, Card, Typography, Dialog, DialogContent, TextField, DialogActions, Button]
│   ├── CommentList.tsx       [MUI: Avatar, Card, CardActions, CardContent, CardHeader, Grid, Typography, useMediaQuery, Theme, PersonIcon]
│   ├── CommentShow.tsx       [MUI: Stack]
│   ├── index.tsx             [MUI: ChatBubbleIcon]
│   ├── PostQuickCreate.tsx   [MUI: Dialog, DialogTitle, DialogContent, DialogActions]
│   ├── PostQuickCreateCancelButton.tsx [MUI: Button, IconCancel]
│   └── PostReferenceInput.tsx [MUI: Button, Dialog, DialogTitle, DialogContent, DialogActions]
├── posts/
│   ├── index.tsx             [MUI: BookIcon]
│   ├── PostCreate.tsx        [MUI: Button, Dialog, DialogActions, DialogContent]
│   ├── PostEdit.tsx          [MUI: Box, Button, Dialog, DialogActions, DialogContent, TextField]
│   ├── PostList.tsx          [MUI: BookIcon, Chip, useMediaQuery, Theme]
│   ├── ResetViewsButton.tsx  [MUI: VisibilityOff]
│   └── TagReferenceInput.tsx [MUI: Box, Button, Dialog, DialogContent, DialogActions, TextField]
├── tags/
│   └── TagList.tsx           [MUI: Box, List, ListItem, ListItemText, Collapse, Card, Stack, ListItemButton, ExpandLess, ExpandMore]
└── users/
    ├── Aside.tsx             [MUI: styled, Typography]
    ├── index.tsx             [MUI: PeopleIcon]
    └── UserList.tsx          [MUI: PeopleIcon, useMediaQuery, Theme]
```

Total: 17 files requiring migration
