import {screen, render} from "@testing-library/react";
import {setupServer} from "msw/node";
import {rest} from "msw";
import {MemoryRouter} from "react-router";
import HomeRoute from "./HomeRoute";
import {createServer} from "../test/sever";

//goal:
createServer([
    {
        path: '/api/repositories',
        method: 'get',
        res: (req, res, ctx) => {
            const language = req.url.searchParams.get('q').split('language:')[1];
            return {
                items: [
                    {id: 1, full_name: `${language}_one`},
                    {id: 2, full_name: `${language}_two`},
                ]
            }
        }
    }
])

test('renders two links for each language', async () => {
    render(
        <MemoryRouter>
            <HomeRoute/>
        </MemoryRouter>
    );

    //   await pause();

    //loop over each language
    const languages = [
        'javascript',
        'java',
        'python',
        'go',
        'rust',
        'typescript',
    ]
    for (let language of languages) {
        //for each language, make sure we see two links
        const links = await screen.findAllByRole('link', {
            name: new RegExp(`${language}_`),
        });
        //assert that the links have the appropriate name
        expect(links).toHaveLength(2);
        expect(links[0]).toHaveTextContent(`${language}_one`);
        expect(links[1]).toHaveTextContent(`${language}_two`);
        expect(links[0]).toHaveAttribute('href', `/repositories/${language}_one`);
        expect(links[1]).toHaveAttribute('href', `/repositories/${language}_two`);
    }

});
//
// const pause = () =>{
//     new Promise((resolve) =>{
//         setTimeout(resolve, 100);
//     })
// }