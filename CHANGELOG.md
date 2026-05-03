# Changelog

All notable changes to this project will be documented in this file. The format
is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/).

## [Unreleased]

## [0.9.1] - 2025-10-26

### Changed
- Dependency updates across build and runtime tooling
- CI workflow integration and maintenance updates

## [0.9.0] - 2025-09-01

### Added
- Enhanced background handling and pre-cache improvements
- Photos settings view

### Changed
- Service worker caching strategy refactor
- Background settings selection refined for plus-only options

### Fixed
- Optional chaining fix for backgrounds favorites response

## [0.8.0] - 2025-07-22

### Added
- Favicon URL utility for bookmark icons
- Updated bookmark favicon retrieval logic

### Changed
- HTTP cookie migration and API base URL updates

### Fixed
- Top sites retrieval condition fix

## [0.7.0] - 2023-12-24

### Added
- Upsell and Plus gating across settings and widgets
- Dynamic quote support
- Magic click trigger for plus add-ons

### Changed
- Quote functions and endpoints refined
- Bundle improvements and dependency patching

### Fixed
- User container re-render issue
- Upsell footer styling and subscription state edge cases

## [0.6.0] - 2023-05-27

### Added
- Account and server synchronization flows
- Network queue for offline-aware post/delete requests
- Content script and background service worker

### Changed
- Storage and widget manager updated to use API-backed data
- Post user data wiring across settings, clock, greeting, bookmarks, and todo

### Fixed
- Storage change handler edge cases and deletion issues

## [0.5.0] - 2023-03-21

### Added
- Todo app with lists, colors, drag-and-drop, and archive flows
- Header controls, dropdowns, and list ordering utilities

### Changed
- Todo layout, scrolling, and editing behaviors
- Notes and todo fullscreen interactions

### Fixed
- Todo visibility and click handling issues

## [0.4.0] - 2022-12-14

### Added
- Countdown dashboard app with pinning, sorting, and archive options
- Countdown item editing and popup controls

### Changed
- Countdown hooks and prop drilling cleanup

### Fixed
- Countdown time formatting and interval cleanup

## [0.3.0] - 2022-10-23

### Added
- Notes app with search, restore, and fullscreen styles
- Soundscapes with scenes, tracks, randomization, and custom sound

### Fixed
- Soundscapes blur handling

## [0.2.0] - 2022-09-29

### Added
- Bookmarks widget with folder recursion and overflow handling
- Search provider dropdown with active-provider visibility controls
- Settings app container, content, and views
- Toggle slider component and general settings toggle handlers
- Greeting message settings and search-in-center behavior
- Clock settings app with 12-hour toggle support
- Photo info hover behavior to hide apps overlay
- Lazy loading for containers and greeting mantra
- About and help sections

### Changed
- Context memo usage to reduce unnecessary re-renders
- Search bar placement options (top row + conditional visibility)
- Refactored variables, props, and styles

### Fixed
- Toggle search-in-center behavior regression
- Extension production manifest reference issue

## [0.1.0] - 2022-08-20

Initial release of the Sanchalit Apps new tab experience.

### Added
- Core application scaffold and initial UI
- Auth and user customization contexts
- App transition on background image load
- Service worker caching strategies
- Font icon support
- Mobile support utilities
- Local storage values wiring for preferences
