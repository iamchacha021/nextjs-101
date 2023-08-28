export default async function getWikiResults( searchTerm: string) {


    // This is related to the wikipedia api
    const searchParams = new URLSearchParams({
        action: 'query',
        generator: 'search',
        gsrsearch: searchTerm,
        gsrlimit: '20',
        prop: 'pageimages|extracts',
        exchars: '100',
        exintro: 'true',
        explaintext: 'true',
        exlimit: 'max',
        format: 'json',
        origin: '*',
    })

    const response = await fetch('https://en.wikipedia.org/w/api.php?' + searchParams)
    if(!response.ok) undefined

    return response.json()
}