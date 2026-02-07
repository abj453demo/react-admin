# Material UI to Salt DS Migration Plan

| Field | Value |
|-------|-------|
| Application | react-admin Simple Example |
| Repository | /home/ubuntu/repos/react-admin/examples/simple |
| Commit | bd7e28fa55432fe2409c6b8c9cfea6ed4616de4b |
| Generated | 2026-02-07 |
| Before Recording | [migration_before.webm](docs/migration-recordings/migration_before.webm) |

## Migration Progress Tracker

| Phase | Task | Status | Notes | Recording |
|-------|------|--------|-------|----------|
| 0 | Infrastructure Setup | ✅ Success | Salt DS packages installed, SaltProvider wrapper added, useIsSmall hook created | |
| 1 | Dialog Swap | ✅ Success | DialogTitle → DialogHeader with header prop, onClose → onOpenChange, removed fullWidth prop | [after](docs/migration-recordings/swap_dialog_after.webm) |
| 1 | Typography Swap | ✅ Success | Migrated Typography to H4/Text in Aside.tsx and CommentList.tsx. Also migrated useMediaQuery to useIsSmall in CommentList.tsx | [after](docs/migration-recordings/swap_typography_after.webm) |
| 1 | Button Swap | ✅ Success | Migrated 5 files: variant contained → cta, text → secondary, converted sx to style props | [after](docs/migration-recordings/swap_button_after.webm) |
| 1 | Avatar Swap | ✅ Success | Used fallbackIcon prop for Salt API in CommentList.tsx | [after](docs/migration-recordings/swap_avatar_after.webm) |
| 1 | Chip to Pill Swap | ✅ Success | MUI Chip → Salt Pill in QuickFilter component. ChipField (react-admin) unchanged. | [after](docs/migration-recordings/swap_chip_to_pill_after.webm) |
| 1 | Stack to StackLayout Swap | ✅ Success | Migrated CommentShow.tsx - replaced Stack with StackLayout, converted sx padding to inline style | [after](docs/migration-recordings/swap_stack_to_stacklayout_after.webm) |
| 1 | useMediaQuery Swap | ✅ Success | Replaced useMediaQuery + Theme with useIsSmall in PostList, UserList, CommentList | [after](docs/migration-recordings/swap_use_media_query_after.webm) |
| 2 | Grid to FlowLayout (CommentList) | ✅ Success | Replaced MUI Grid with Salt FlowLayout + CSS module for responsive behavior (900px/1200px breakpoints) | [after](docs/migration-recordings/refactor_grid_to_flowlayout_CommentList_after.webm) |
| 2 | Card Composition (CommentList) | ✅ Success | Replaced MUI Card/CardHeader/CardContent/CardActions with Salt Card + StackLayout + FlowLayout composition | [after](docs/migration-recordings/refactor_card_composition_CommentList_after.webm) |
| 2 | Card Composition (CommentEdit) | ✅ Success | MUI Card → Salt Card with style prop | [after](docs/migration-recordings/refactor_card_composition_CommentEdit_after.mp4) |
| 2 | Card Composition (TagList) | ✅ Success | Replaced MUI Card with Salt Card container with proper padding | [after](docs/migration-recordings/refactor_card_composition_TagList_after.webm) |
| 2 | List to Tree (TagList) | ✅ Success | Replaced MUI List + Collapse with custom accessible tree using Salt FlowLayout, StackLayout, Text, Button, and ChevronDown/ChevronRight icons | [after](docs/migration-recordings/refactor_list_to_tree_TagList_after.webm) |
| 2 | TextField to Input (PostEdit) | ✅ Success | MUI TextField → Salt FormField + FormFieldLabel + Input in CreateCategory dialog | [after](docs/migration-recordings/refactor_textfield_to_input_PostEdit_after.webm) |
| 2 | TextField to Input (CommentEdit) | ✅ Success | MUI TextField → Salt FormField + FormFieldLabel + Input | [after](docs/migration-recordings/refactor_card_composition_CommentEdit_after.mp4) |
| 2 | Styled to CSS Module (Aside) | ✅ Success | MUI styled() → CSS module with Salt spacing token var(--salt-spacing-100) | |
| 3 | Icons Cleanup | ⏳ Pending | | |
| 3 | sx Props Cleanup | ⏳ Pending | | |
| 3 | Imports Cleanup | ⏳ Pending | | |
| 3 | Theme Removal | ⏳ Pending | | |

Status legend: ⏳ Pending | 🔄 In Progress | ✅ Success | ❌ Failed | ⚠️ Partial

---

## Component Mapping Table

| MUI Component | Files Used In | Salt Equivalent | Gap/Notes |
|--------------|---------------|-----------------|-----------|
| **Avatar** | CommentList.tsx | `Avatar` (@salt-ds/core) | Direct mapping |
| **Box** | PostEdit.tsx, CommentEdit.tsx, TagList.tsx | `StackLayout`/`FlowLayout`/`FlexLayout` | Replace with layout primitives |
| **Button** | PostEdit.tsx, PostCreate.tsx, CommentEdit.tsx, PostReferenceInput.tsx, PostQuickCreate.tsx, PostQuickCreateCancelButton.tsx | `Button` (@salt-ds/core) | Direct mapping, variant names differ |
| **Card, CardHeader, CardContent, CardActions** | CommentList.tsx, CommentEdit.tsx, TagList.tsx | `Card` (@salt-ds/core) | **Gap**: Salt Card has no subcomponents - compose with Text + layout |
| **Chip** | PostList.tsx | `Pill` (@salt-ds/core) | Similar but different API |
| **Collapse** | TagList.tsx | `Collapsible` (@salt-ds/core) | Direct mapping |
| **Dialog, DialogTitle, DialogContent, DialogActions** | PostEdit.tsx, PostCreate.tsx, CommentEdit.tsx, PostReferenceInput.tsx, PostQuickCreate.tsx, TagReferenceInput.tsx | `Dialog`, `DialogHeader`, `DialogContent`, `DialogActions` (@salt-ds/core) | DialogTitle → DialogHeader |
| **Grid** | CommentList.tsx | `GridLayout`/`FlowLayout` (@salt-ds/core) | **Gap**: Not a 12-col system - use CSS grid or FlowLayout |
| **List, ListItem, ListItemText, ListItemButton** | TagList.tsx | `List`, `ListItem` (@salt-ds/lab) or `Tree` (@salt-ds/lab) | Consider Tree for hierarchical data |
| **Stack** | CommentShow.tsx | `StackLayout` (@salt-ds/core) | Direct mapping |
| **TextField** (MuiTextField) | PostEdit.tsx, CommentEdit.tsx, TagReferenceInput.tsx | `Input` + `FormField` (@salt-ds/core) | Wrap in FormField for labels |
| **Typography** | Aside.tsx, CommentList.tsx | `Text`, `H1-H6`, `Label` (@salt-ds/core) | Direct mapping |
| **styled** | Aside.tsx | CSS modules + Salt tokens | **Gap**: No styled() utility |
| **useMediaQuery** | PostList.tsx, UserList.tsx, CommentList.tsx | `useBreakpoint` (@salt-ds/core) | **Gap**: Different API - need wrapper |

### Icons Mapping

| MUI Icon | Files | Salt Icon (suggested) | Notes |
|----------|-------|----------------------|-------|
| BookIcon | posts/index.tsx, PostList.tsx | BookIcon | Verify exists |
| PeopleIcon | users/index.tsx, UserList.tsx | UserGroupIcon | Verify exists |
| PersonIcon | CommentList.tsx | UserIcon | Verify exists |
| ChatBubbleIcon | comments/index.tsx | ChatIcon or MessageIcon | Check available names |
| VisibilityOff | ResetViewsButton.tsx | EyeClosedIcon | May not exist |
| ExpandLess | TagList.tsx | ChevronUpIcon | Verify exists |
| ExpandMore | TagList.tsx | ChevronDownIcon | Verify exists |
| Cancel (IconCancel) | PostQuickCreateCancelButton.tsx | CloseIcon | Verify exists |

---

## Phase 0: Infrastructure (Sequential - Must Complete First)

**Files to modify:** `src/index.tsx` or `src/App.tsx`

### Task: Infrastructure Setup

**Playbook:** MUI to Salt - Infrastructure Setup

**Input:**
```json
{
  "app_path": "/home/ubuntu/repos/react-admin/examples/simple",
  "salt_path": "/home/ubuntu/repos/jpmc-salt-ds",
  "entry_point": "src/index.tsx",
  "run_command": "yarn run-simple"
}
```

**Actions:**
1. Install @salt-ds/core, @salt-ds/lab, @salt-ds/icons, @salt-ds/theme
2. Wrap app with SaltProvider and BreakpointProvider
3. Create `src/utils/useResponsive.ts` with useIsSmall() hook
4. Create CSS module scaffolding for Aside.tsx

---

## Phase 1: Core Component Swaps (Parallel)

These tasks can run in parallel as they target different component types. Ensure no file conflicts.

### Task 1.1: Dialog Swap

**Playbook:** MUI to Salt - Core Component Swap

**Input:**
```json
{
  "app_path": "/home/ubuntu/repos/react-admin/examples/simple",
  "salt_path": "/home/ubuntu/repos/jpmc-salt-ds",
  "swap_type": "dialog",
  "files": [
    "src/posts/PostEdit.tsx",
    "src/posts/PostCreate.tsx",
    "src/posts/TagReferenceInput.tsx",
    "src/comments/CommentEdit.tsx",
    "src/comments/PostReferenceInput.tsx",
    "src/comments/PostQuickCreate.tsx"
  ],
  "run_command": "yarn run-simple"
}
```

### Task 1.2: Typography Swap

**Playbook:** MUI to Salt - Core Component Swap

**Input:**
```json
{
  "app_path": "/home/ubuntu/repos/react-admin/examples/simple",
  "salt_path": "/home/ubuntu/repos/jpmc-salt-ds",
  "swap_type": "typography",
  "files": [
    "src/users/Aside.tsx",
    "src/comments/CommentList.tsx"
  ],
  "run_command": "yarn run-simple"
}
```

### Task 1.3: Button Swap

**Playbook:** MUI to Salt - Core Component Swap

**Input:**
```json
{
  "app_path": "/home/ubuntu/repos/react-admin/examples/simple",
  "salt_path": "/home/ubuntu/repos/jpmc-salt-ds",
  "swap_type": "button",
  "files": [
    "src/posts/PostEdit.tsx",
    "src/posts/PostCreate.tsx",
    "src/comments/CommentEdit.tsx",
    "src/comments/PostReferenceInput.tsx",
    "src/comments/PostQuickCreate.tsx",
    "src/comments/PostQuickCreateCancelButton.tsx"
  ],
  "run_command": "yarn run-simple"
}
```

### Task 1.4: Avatar Swap

**Playbook:** MUI to Salt - Core Component Swap

**Input:**
```json
{
  "app_path": "/home/ubuntu/repos/react-admin/examples/simple",
  "salt_path": "/home/ubuntu/repos/jpmc-salt-ds",
  "swap_type": "avatar",
  "files": [
    "src/comments/CommentList.tsx"
  ],
  "run_command": "yarn run-simple"
}
```

### Task 1.5: Chip to Pill Swap

**Playbook:** MUI to Salt - Core Component Swap

**Input:**
```json
{
  "app_path": "/home/ubuntu/repos/react-admin/examples/simple",
  "salt_path": "/home/ubuntu/repos/jpmc-salt-ds",
  "swap_type": "chip_to_pill",
  "files": [
    "src/posts/PostList.tsx"
  ],
  "run_command": "yarn run-simple"
}
```

### Task 1.6: Stack to StackLayout Swap

**Playbook:** MUI to Salt - Core Component Swap

**Input:**
```json
{
  "app_path": "/home/ubuntu/repos/react-admin/examples/simple",
  "salt_path": "/home/ubuntu/repos/jpmc-salt-ds",
  "swap_type": "stack_to_stacklayout",
  "files": [
    "src/comments/CommentShow.tsx"
  ],
  "run_command": "yarn run-simple"
}
```

### Task 1.7: useMediaQuery Swap

**Playbook:** MUI to Salt - Core Component Swap

**Input:**
```json
{
  "app_path": "/home/ubuntu/repos/react-admin/examples/simple",
  "salt_path": "/home/ubuntu/repos/jpmc-salt-ds",
  "swap_type": "use_media_query",
  "files": [
    "src/posts/PostList.tsx",
    "src/users/UserList.tsx",
    "src/comments/CommentList.tsx"
  ],
  "run_command": "yarn run-simple"
}
```

---

## Phase 2: Layout Refactors (Parallel - After Phase 1)

These tasks handle complex layout changes. Run after Phase 1 completes.

### Task 2.1: Grid to FlowLayout (CommentList)

**Playbook:** MUI to Salt - Layout Refactor

**Input:**
```json
{
  "app_path": "/home/ubuntu/repos/react-admin/examples/simple",
  "salt_path": "/home/ubuntu/repos/jpmc-salt-ds",
  "refactor_type": "grid_to_flowlayout",
  "file": "src/comments/CommentList.tsx",
  "run_command": "yarn run-simple"
}
```

### Task 2.2: Card Composition (CommentList)

**Playbook:** MUI to Salt - Layout Refactor

**Input:**
```json
{
  "app_path": "/home/ubuntu/repos/react-admin/examples/simple",
  "salt_path": "/home/ubuntu/repos/jpmc-salt-ds",
  "refactor_type": "card_composition",
  "file": "src/comments/CommentList.tsx",
  "run_command": "yarn run-simple"
}
```

**Note:** This task targets the same file as Task 2.1. Run sequentially or combine into one session.

### Task 2.3: Card Composition (CommentEdit)

**Playbook:** MUI to Salt - Layout Refactor

**Input:**
```json
{
  "app_path": "/home/ubuntu/repos/react-admin/examples/simple",
  "salt_path": "/home/ubuntu/repos/jpmc-salt-ds",
  "refactor_type": "card_composition",
  "file": "src/comments/CommentEdit.tsx",
  "run_command": "yarn run-simple"
}
```

### Task 2.4: Card Composition (TagList)

**Playbook:** MUI to Salt - Layout Refactor

**Input:**
```json
{
  "app_path": "/home/ubuntu/repos/react-admin/examples/simple",
  "salt_path": "/home/ubuntu/repos/jpmc-salt-ds",
  "refactor_type": "card_composition",
  "file": "src/tags/TagList.tsx",
  "run_command": "yarn run-simple"
}
```

### Task 2.5: List to Tree (TagList)

**Playbook:** MUI to Salt - Layout Refactor

**Input:**
```json
{
  "app_path": "/home/ubuntu/repos/react-admin/examples/simple",
  "salt_path": "/home/ubuntu/repos/jpmc-salt-ds",
  "refactor_type": "list_to_tree",
  "file": "src/tags/TagList.tsx",
  "run_command": "yarn run-simple"
}
```

**Note:** This task targets the same file as Task 2.4. Run sequentially or combine into one session.

### Task 2.6: TextField to Input (PostEdit)

**Playbook:** MUI to Salt - Layout Refactor

**Input:**
```json
{
  "app_path": "/home/ubuntu/repos/react-admin/examples/simple",
  "salt_path": "/home/ubuntu/repos/jpmc-salt-ds",
  "refactor_type": "textfield_to_input",
  "file": "src/posts/PostEdit.tsx",
  "run_command": "yarn run-simple"
}
```

### Task 2.7: TextField to Input (CommentEdit)

**Playbook:** MUI to Salt - Layout Refactor

**Input:**
```json
{
  "app_path": "/home/ubuntu/repos/react-admin/examples/simple",
  "salt_path": "/home/ubuntu/repos/jpmc-salt-ds",
  "refactor_type": "textfield_to_input",
  "file": "src/comments/CommentEdit.tsx",
  "run_command": "yarn run-simple"
}
```

**Note:** This task targets the same file as Task 2.3. Run sequentially or combine into one session.

### Task 2.8: Styled to CSS Module (Aside)

**Playbook:** MUI to Salt - Layout Refactor

**Input:**
```json
{
  "app_path": "/home/ubuntu/repos/react-admin/examples/simple",
  "salt_path": "/home/ubuntu/repos/jpmc-salt-ds",
  "refactor_type": "styled_to_css_module",
  "file": "src/users/Aside.tsx",
  "run_command": "yarn run-simple"
}
```

---

## Phase 3: Cleanup (Parallel - After Phase 2)

Final cleanup tasks to remove all MUI artifacts.

### Task 3.1: Icons Cleanup

**Playbook:** MUI to Salt - Cleanup

**Input:**
```json
{
  "app_path": "/home/ubuntu/repos/react-admin/examples/simple",
  "salt_path": "/home/ubuntu/repos/jpmc-salt-ds",
  "cleanup_type": "icons",
  "files": [
    "src/posts/index.tsx",
    "src/posts/PostList.tsx",
    "src/posts/ResetViewsButton.tsx",
    "src/users/index.tsx",
    "src/users/UserList.tsx",
    "src/comments/index.tsx",
    "src/comments/CommentList.tsx",
    "src/comments/PostQuickCreateCancelButton.tsx",
    "src/tags/TagList.tsx"
  ],
  "run_command": "yarn run-simple"
}
```

### Task 3.2: sx Props Cleanup

**Playbook:** MUI to Salt - Cleanup

**Input:**
```json
{
  "app_path": "/home/ubuntu/repos/react-admin/examples/simple",
  "salt_path": "/home/ubuntu/repos/jpmc-salt-ds",
  "cleanup_type": "sx_props",
  "files": [
    "src/posts/PostList.tsx",
    "src/posts/PostEdit.tsx",
    "src/comments/CommentList.tsx",
    "src/tags/TagList.tsx"
  ],
  "run_command": "yarn run-simple"
}
```

### Task 3.3: Imports Cleanup

**Playbook:** MUI to Salt - Cleanup

**Input:**
```json
{
  "app_path": "/home/ubuntu/repos/react-admin/examples/simple",
  "salt_path": "/home/ubuntu/repos/jpmc-salt-ds",
  "cleanup_type": "imports",
  "files": [
    "src/posts/index.tsx",
    "src/posts/PostList.tsx",
    "src/posts/PostEdit.tsx",
    "src/posts/PostCreate.tsx",
    "src/posts/ResetViewsButton.tsx",
    "src/posts/TagReferenceInput.tsx",
    "src/users/index.tsx",
    "src/users/Aside.tsx",
    "src/users/UserList.tsx",
    "src/comments/index.tsx",
    "src/comments/CommentList.tsx",
    "src/comments/CommentEdit.tsx",
    "src/comments/CommentShow.tsx",
    "src/comments/PostReferenceInput.tsx",
    "src/comments/PostQuickCreate.tsx",
    "src/comments/PostQuickCreateCancelButton.tsx",
    "src/tags/TagList.tsx"
  ],
  "run_command": "yarn run-simple"
}
```

### Task 3.4: Theme Removal

**Playbook:** MUI to Salt - Cleanup

**Input:**
```json
{
  "app_path": "/home/ubuntu/repos/react-admin/examples/simple",
  "salt_path": "/home/ubuntu/repos/jpmc-salt-ds",
  "cleanup_type": "theme_removal",
  "files": [
    "src/posts/PostList.tsx",
    "src/users/UserList.tsx",
    "src/users/Aside.tsx"
  ],
  "run_command": "yarn run-simple"
}
```

---

## How to Execute This Migration

### Prerequisites
- All companion playbooks must be available:
  - MUI to Salt - Infrastructure Setup
  - MUI to Salt - Core Component Swap
  - MUI to Salt - Layout Refactor
  - MUI to Salt - Cleanup
- Salt DS repository must be accessible at `/home/ubuntu/repos/jpmc-salt-ds`
- react-admin repository must be accessible at `/home/ubuntu/repos/react-admin`

### Execution Order

#### Step 1: Infrastructure (Sequential)
Run the Infrastructure playbook once. This must complete before any other tasks.

#### Step 2: Core Component Swaps (Parallel)
After infrastructure is complete, run Phase 1 tasks in parallel. The following can run simultaneously:
- Task 1.1 (Dialog) - targets: PostEdit, PostCreate, TagReferenceInput, CommentEdit, PostReferenceInput, PostQuickCreate
- Task 1.2 (Typography) - targets: Aside, CommentList
- Task 1.4 (Avatar) - targets: CommentList
- Task 1.5 (Chip to Pill) - targets: PostList
- Task 1.6 (Stack to StackLayout) - targets: CommentShow
- Task 1.7 (useMediaQuery) - targets: PostList, UserList, CommentList

**Note:** Task 1.3 (Button) overlaps with Task 1.1 (Dialog) on several files. Run Task 1.3 after Task 1.1 completes.

#### Step 3: Layout Refactors (Parallel, after Step 2)
After all Phase 1 tasks complete, run Phase 2 tasks. Group by file to avoid conflicts:

**Parallel Group A:**
- Task 2.6 (TextField to Input - PostEdit)
- Task 2.8 (Styled to CSS Module - Aside)

**Sequential Group B (CommentList):**
- Task 2.1 (Grid to FlowLayout) → Task 2.2 (Card Composition)

**Sequential Group C (CommentEdit):**
- Task 2.3 (Card Composition) → Task 2.7 (TextField to Input)

**Sequential Group D (TagList):**
- Task 2.4 (Card Composition) → Task 2.5 (List to Tree)

#### Step 4: Cleanup (Parallel, after Step 3)
After all Phase 2 tasks complete, run Phase 3 cleanup tasks. These can mostly run in parallel but should be coordinated to avoid file conflicts.

### Updating This Plan

After completing each playbook run, update the Migration Progress Tracker table:
1. Change the Status column to reflect the outcome (✅ Success, ❌ Failed, ⚠️ Partial)
2. Add any relevant notes (issues encountered, workarounds applied, files skipped)
3. Link to the after-recording in the Recording column
4. Commit the updated MIGRATION_PLAN.md to the migration branch

---

## Final Verification Checklist

After all phases complete:
- [ ] No `@mui/material` imports in codebase
- [ ] No `@mui/icons-material` imports in codebase
- [ ] No `@mui/styles` imports in codebase
- [ ] MUI dependencies removed from package.json
- [ ] Application builds successfully (`yarn build`)
- [ ] All tests pass (`yarn test`)
- [ ] Full application walkthrough recorded (`docs/migration-recordings/migration_complete.webm`)
- [ ] CI check passes: `rg "@mui" --type ts --type tsx` returns no results
