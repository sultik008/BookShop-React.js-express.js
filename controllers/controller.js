import { generateBooks } from '../services/service.js'
 
export async function getBooks(req , res) {
    try {
        const { seed , language , likes , reviews , booksCount } = req.query
        console.log({ seed , language , likes , reviews , booksCount } , Date.now())
        console.log(Date.now())
        const result = await generateBooks({ seed , language , likes , reviews , booksCount })
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}