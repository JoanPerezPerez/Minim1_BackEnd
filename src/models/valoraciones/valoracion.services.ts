import Calendar from '../calendari/calendar.model';
import { IRating } from './valoracion.model';
import Rating from './valoracion.model';

export class ValorationService {
    
    async createRating(rating: Partial<IRating>): Promise<IRating|null> {
        console.log('rating', rating);
        const calendari = await Calendar.findById(rating.calendar);
        if (!calendari) {
            console.log('El calendari no existeix');
            return null; // Usuario no encontrado
        }

        const newRating = new Rating(rating);
        return await newRating.save();
    }

    async getRatingsByCalendar(calendarId: string): Promise<IRating[]> {
        return await Rating.find({ calendar: calendarId });
    }

    async updateRating(ratingId: string, updatedData: Partial<IRating>): Promise<IRating | null> {
        return await Rating.findByIdAndUpdate(ratingId, updatedData, { new: true, runValidators: true });
    }
    
    async deleteRating(ratingId: string): Promise<IRating | null> {
        return await Rating.findByIdAndDelete(ratingId);
    }

    async listRatings(page: number, limit: number): Promise<{ ratings: IRating[], total: number }> {
        const skip = (page - 1) * limit;
        const total = await Rating.countDocuments();
        const ratings = await Rating.find().skip(skip).limit(limit);
        return { ratings, total };
    }
}