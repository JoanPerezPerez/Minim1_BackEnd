import { Request, Response } from 'express';
import { ValorationService } from './valoracion.services';
import Calendar from '../calendari/calendar.model';
import Rating from './valoracion.model';

const valorationService = new ValorationService();

export const createRating = async (req: Request, res: Response) => {
    try {
        console.log(req.body);

        // Verificar si el calendario existe
        const existingCalendar = await Calendar.findById(req.body.calendar);
        if (!existingCalendar) {
            return res.status(404).json({ message: 'Calendar not found' });
        }

        // Crear la valoración
        const rating = new Rating(req.body);
        await rating.save();

        return res.status(201).json(rating);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to create rating', error });
    }
};

export async function getRatingsByCalendar(req: Request, res: Response): Promise<Response> {
    try {
        const ratings = await valorationService.getRatingsByCalendar(req.params.calendarId);
        return res.status(200).json(ratings);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve ratings' });
    }
}

export async function updateRating(req: Request, res: Response): Promise<Response> {
    try {
        const updatedRating = await valorationService.updateRating(req.params.id, req.body);
        if (!updatedRating) {
            return res.status(404).json({ error: 'Rating not found' });
        }
        return res.status(200).json({ message: 'Rating updated', rating: updatedRating });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update rating' });
    }
}

export async function deleteRating(req: Request, res: Response): Promise<Response> {
    try {
        const deletedRating = await valorationService.deleteRating(req.params.id);
        if (!deletedRating) {
            return res.status(404).json({ error: 'Rating not found' });
        }
        return res.status(200).json({ message: 'Rating deleted' });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete rating' });
    }
}

export async function listRatings(req: Request, res: Response): Promise<Response> {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 5;

        const { ratings, total } = await valorationService.listRatings(page, limit);

        return res.status(200).json({ ratings, total });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to list ratings' });
    }
}
