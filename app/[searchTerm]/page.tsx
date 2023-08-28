import getWikiResults from "@/lib/getWikiResults"
import { title } from "process"
import Item from "./components/Item"

type Props = {
    params: {
        searchTerm: string
    }
}

export async function generateMetadata({ params: { searchTerm }}: Props){
    const wikiData: Promise<SearchResult> = getWikiResults(searchTerm)

    const data = await wikiData

    // since spaces from the search term are represented by %20, we want to replace all of them with a space
    const displayTerm = searchTerm.replaceAll('%20', ' ')

    // what if there are no data
    if (!data?.query?.pages){
        return {
            title: `${searchTerm} Not Found`
        }
    }

    return {
        title: displayTerm,
        description: `Search results for ${displayTerm}`
    }
}

export default async function SearchResults({ params: { searchTerm }}: Props) {
    const wikiData: Promise<SearchResult> = getWikiResults(searchTerm)

    const data = await wikiData

    // the code below states that we are not sure if we are gonna get the data, and if we do, we are not sure we are gonna get the query, and if we do, we are not sure we are gonna get the pages
    const results: Result[] | undefined = data?.query?.pages

    const content = (
        <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
            {
                results ? Object.values(results).map( result => {
                    return <Item key={result.pageid} result={result} />
                })
                :
                <h2 className="p-2 text-xl">{`${searchTerm} Not Found`}</h2>
            }
        </main>
    )

  return content
}