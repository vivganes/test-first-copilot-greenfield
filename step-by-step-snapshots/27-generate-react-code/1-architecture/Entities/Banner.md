# Banner

## Description
Manages promotional banners for display on the homepage or other locations, with scheduling.

## Attributes
| Attribute   | Type      | Description                                 |
|-------------|-----------|---------------------------------------------|
| id          | UUID      | Unique identifier for the banner            |
| title       | String    | Banner title                                |
| imageUrl    | String    | Banner image URL                            |
| linkUrl     | String    | Link URL (optional)                         |
| startDate   | DateTime  | Banner display start date                   |
| endDate     | DateTime  | Banner display end date                     |
| isActive    | Boolean   | Whether the banner is currently active      |
| createdAt   | DateTime  | Banner creation timestamp                   |
| updatedAt   | DateTime  | Last update timestamp                       |

## Business Rules
- Only active banners within the scheduled date range are displayed.

## Relationships
- None
