import { Request, Response, Router } from 'express';
import { 
    createRating, 
    getRatingsByCalendar,  
    updateRating, 
    deleteRating, 
    listRatings 
} from './valoracion.controller';

const router = Router();

/**
 * @swagger
 * /ratings:
 *   post:
 *     summary: Create a new rating
 *     tags: [Ratings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               calendar:
 *                 type: string
 *                 description: The ID of the calendar
 *               score:
 *                 type: integer
 *                 enum: [0, 1]
 *                 description: Rating score (0 = negative, 1 = positive)
 *     responses:
 *       201:
 *         description: Rating created successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Failed to create rating
 */
router.post('/', createRating);

/**
 * @swagger
 * /ratings/calendar/{calendarId}:
 *   get:
 *     summary: Get all ratings for a specific calendar
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: calendarId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the calendar
 *     responses:
 *       200:
 *         description: Successfully retrieved ratings
 *       404:
 *         description: Calendar not found
 *       500:
 *         description: Failed to retrieve ratings
 */
router.get('/calendar/:calendarId', getRatingsByCalendar);

/**
 * @swagger
 * /ratings/{id}:
 *   put:
 *     summary: Update a rating by ID
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the rating to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: integer
 *                 enum: [0, 1]
 *                 description: Updated rating score
 *     responses:
 *       200:
 *         description: Rating successfully updated
 *       404:
 *         description: Rating not found
 *       500:
 *         description: Failed to update rating
 */
router.put('/:id', updateRating);

/**
 * @swagger
 * /ratings/{id}:
 *   delete:
 *     summary: Delete a rating by ID
 *     tags: [Ratings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the rating to delete
 *     responses:
 *       200:
 *         description: Rating successfully deleted
 *       404:
 *         description: Rating not found
 *       500:
 *         description: Failed to delete rating
 */
router.delete('/:id', deleteRating);

/**
 * @swagger
 * /ratings:
 *   get:
 *     summary: List all ratings with pagination
 *     tags: [Ratings]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Number of ratings per page
 *     responses:
 *       200:
 *         description: Successfully retrieved all ratings
 *       500:
 *         description: Failed to list ratings
 */
router.get('/', listRatings);


export default router;

